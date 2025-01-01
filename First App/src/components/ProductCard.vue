<template>
    <div class="product-card">
        <!-- Using props -->
        <h4>{{ product.name }}</h4>
        <p>${{ formattedPrice }}</p>

        <!-- Custom events -->
        <button @click="$emit('addToCart', product)" :disabled="!isAvailable">
            {{ isAvailable ? 'Add to Cart' : 'Out of Stock' }}
        </button>

        <!-- Slot for custom content -->
        <div class="product-details">
            <slot name="details"></slot>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';

// Props with validation
const props = defineProps({
    product: {
        type: Object,
        required: true,
        validator(value) {
            return ['id', 'name', 'price'].every(prop => prop in value);
        }
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
});

// Events declaration (optional but recoommended for documentation)
defineEmits(['addToCart']);

// Computed property using props
const formattedPrice = computed(() => {
    return props.product.price.toFixed(2);
});
</script>
<style scoped>
.product-card {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
}

.product-details {
    margin-top: 10px;
    font-size: 0.9em;
    color: #666;
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