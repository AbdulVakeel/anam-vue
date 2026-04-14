import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([
    { id: 1, name: 'Wireless Mouse', price: 25.99, qty: 1, image: '/products/product-1.jpg', color: 'Black', size: 'M' },
    { id: 2, name: 'USB-C Charger', price: 19.99, qty: 2, image: '/products/product-2.jpg', color: 'White', size: 'One Size' }
  ])

  const totalItems = computed(() => cartItems.value.reduce((sum, i) => sum + i.qty, 0))
  const subtotal = computed(() => cartItems.value.reduce((sum, i) => sum + i.qty * i.price, 0))
  const discount = computed(() => (subtotal.value * 0.05).toFixed(2))
  const total = computed(() => (subtotal.value - discount.value).toFixed(2))

  function addItem(item) {
    const exist = cartItems.value.find(i => i.id === item.id)
    if (exist) {
      exist.qty += item.qty
    } else {
      cartItems.value.push(item)
    }
  }

  function removeItem(id) {
    cartItems.value = cartItems.value.filter(i => i.id !== id)
  }

  function updateQty(id, qty) {
    const item = cartItems.value.find(i => i.id === id)
    if (item) item.qty = Math.max(1, qty)
  }

  return { cartItems, totalItems, subtotal, discount, total, addItem, removeItem, updateQty }
})
