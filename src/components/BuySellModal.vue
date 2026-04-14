<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 dark:text-white"
              >
                {{ type === 'buy' ? 'Buy' : 'Sell' }} {{ coin.name }}
              </DialogTitle>

              <div class="mt-4 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount ({{ coin.symbol.toUpperCase() }})
                  </label>
                  <input
                    v-model="amount"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  >
                </div>

                <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Price: {{ formatCurrency(coin.current_price) }}</span>
                  <span>Available: {{ type === 'buy' ? formatCurrency(10000) : '0.5 ' + coin.symbol.toUpperCase() }}</span>
                </div>

                <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total: {{ formatCurrency(amount * coin.current_price) }}
                  </p>
                </div>
              </div>

              <div class="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                  @click="closeModal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                  @click="confirmTrade"
                >
                  {{ type === 'buy' ? 'Buy' : 'Sell' }} {{ coin.symbol.toUpperCase() }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const props = defineProps({
  show: Boolean,
  type: {
    type: String,
    default: 'buy'
  },
  coin: {
    type: Object,
    default: () => ({
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      current_price: 42563.42
    })
  }
})

const emit = defineEmits(['close', 'confirm'])

const amount = ref('')

const closeModal = () => {
  emit('close')
  amount.value = ''
}

const confirmTrade = () => {
  emit('confirm', {
    type: props.type,
    coin: props.coin,
    amount: parseFloat(amount.value) || 0,
    price: props.coin.current_price,
    total: (parseFloat(amount.value) || 0) * props.coin.current_price
  })
  closeModal()
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}
</script>