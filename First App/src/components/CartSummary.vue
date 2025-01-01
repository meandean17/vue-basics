<template>
    <div class="cart-summary">
        <!-- Header slot -->
        <slot name="header">
            <h3>Cart Summary</h3>
        </slot>

        <!-- Summary Content -->
        <div class="summary-content">
            <p>
                <span>Subtotal:</span>
                <span>${{ formatPrice(subtotal) }}</span>
            </p>
            <p>
                <span>Tax ({{ taxRate }}%):</span>
                <span>${{ formatPrice(tax) }}</span>
            </p>
            <p class="total">
                <span>Total:</span>
                <span>${{ formatPrice(total) }}</span>
            </p>
        </div>

        <!-- Custom footer slot with scope -->
        <slot name="footer" :total="total" :items-count="itemsCount">
            <button @click="$emit('checkout')" :disabled="itemsCount === 0">
                Proceed to Checkout
            </button>
        </slot>
    </div>
</template>
<script setup>
import { computed } from 'vue';

// Props definition with defaults and validation
const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    taxRate: {
        type: Number,
        default: 8,
        validator: (value) => value >= 0 && value <= 100,
    }
});

// Emits declaration
defineEmits(['checkout']);

// Computed properties
const subtotal = computed(() => {
    return props.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
});

const tax = computed(() => {
    return subtotal.value * (props.taxRate / 100);
});

const total = computed(() => {
    return subtotal.value + tax.value;
});

const itemsCount = computed(() => {
    return props.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Helper functions
const formatPrice = (price) => {
    return price.toFixed(2);
};

</script>
<style scoped>
.cart-summary {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
}

.summary-content {
    margin: 15px 0;
}

.summary-content p {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
}

.total {
    font-weight: bold;
    font-size: 1.2em;
    border-top: 2px solid #eee;
    padding-top: 10px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background-color: #999;
    cursor: not-allowed;
}
</style>