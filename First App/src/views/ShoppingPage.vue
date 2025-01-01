<template>
    <div class="shopping-cart">
        <!-- Notifications -->
        <div class="notifications">
            <div v-for="notification in notifications" :key="notification.id"
                :class="['notification', notification.type]">
                {{ notification.message }}
            </div>
        </div>
        <h2>Shopping Cart</h2>

        <!-- Products List -->
        <div class="products">
            <h3>Available Products</h3>
            <div class="product-grid">
                <ProductCard v-for="product in products" :key="product.id" :product="product"
                    :is-available="checkAvailability(product)" @add-to-cart="addToCart">
                    <template #details>
                        <p>{{ product.description }}</p>
                    </template>
                </ProductCard>
            </div>
        </div>
        <!-- Cart Section -->
        <div class="cart-section">
            <h3>Your Cart</h3>
            <!-- Using v-if/v-else for conditional rendering -->
            <div v-if="cartItems.length > 0">
                <div v-for="item in cartItems" :key="item.id" class="cart-item">
                    <span>{{ item.name }}</span>
                    <div class="quantity-controls">
                        <button @click="decreaseQuantity(item)">-</button>
                        <span>{{ item.quantity }}</span>
                        <button @click="increaseQuantity(item)">+</button>
                    </div>
                    <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
                <!-- Cart Summary using computed properties -->
                <CartSummary :items="cartItems" :tax-rate="taxRate * 100" @checkout="checkout">
                    <template #header>
                        <h3>Order Summary</h3>
                    </template>
                    <template #footer="{ total, itemsCount }">
                        <div class="checkout-footer">
                            <p>{{ itemsCount }} items total</p>
                            <button @click="checkout" :disabled="isCheckingOut">
                                {{ isCheckingOut ? 'Processing...' : `Checkout (${total.toFixed(2)})` }}
                            </button>
                        </div>
                    </template>
                </CartSummary>
            </div>
            <p v-else>Your cart is empty</p>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import CartSummary from '../components/CartSummary.vue';
import { provideNotification, useNotification } from '../composables/useNotification';

const { notifications, addNotification } = provideNotification();

// Using ref for primite values and arrays
const isCheckingOut = ref(false);
const taxRate = ref(0.08); // 8% tax rate

// Using reactive for complex object
const cartState = reactive({
    lastUpdated: null,
});

// Product data
const products = ref([
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Headphones', price: 49.99 },
    { id: 3, name: 'Mouse', price: 19.99 },
    { id: 4, name: 'Keyboard', price: 49.99 },
    { id: 5, name: 'Monitor', price: 199.99 },
]);

// Cart items using ref for arrays
const cartItems = ref([]);

const checkAvailability = (product) => {
    if (product.price > 500) {
        const inCart = cartItems.value.find(item => item.id - product.id);
        return !inCart || inCart.quantity < 2;
    }
    return true;
}

// Computed properties for cart calculations
const subtotal = computed(() => {
    return cartItems.value.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
});

const tax = computed(() => {
    return subtotal.value * taxRate.value;
});


// Methods for cart manipulation
const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.value.push({ ...product, quantity: 1 });
    }
    cartState.lastUpdated = new Date();
};

const increaseQuantity = (item) => {
    item.quantity++;
};

const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cartItems.value = cartItems.value.filter(cartItem => cartItem.id !== item.id);
    }
};

// Simulated checkout process
const checkout = async () => {
    isCheckingOut.value = true;

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        cartItems.value = [];
        addNotification('Checkout successful!', 'success');  // Updated this line
    } catch (error) {
        addNotification('An error occurred during checkout', 'error');  // Updated this line
    } finally {
        isCheckingOut.value = false;
    }
};
// Watch for cart changes
watch(cartItems, (newItems) => {
    console.log('Cart updated:', newItems);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
}, { deep: true });

// Lifecycle hook - load cart items from local storage
onMounted(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartItems.value = JSON.parse(savedCart);
    }
});
</script>

<style scoped>
.shopping-cart {
  padding: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button {
  padding: 2px 8px;
}

.cart-summary {
  margin-top: 20px;
  padding: 20px;
  border-top: 2px solid #eee;
}

.total {
  font-weight: bold;
  font-size: 1.2em;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}
</style>