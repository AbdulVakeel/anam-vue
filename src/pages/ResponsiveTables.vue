<template>
  <div class="space-y-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                #
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Balance
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Transaction ID
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(item, index) in paginated" :key="item.id">
              <td class="py-3 px-3 text-center">{{ (page - 1) * perPage + index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    {{ item.user.initials }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ item.user.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white font-medium">
                  {{ item.amount }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ item.balance }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white font-mono">
                  {{ item.transaction_id }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ item.created_at }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <Pagination v-model:page="page" :pages="totalPages" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Pagination from '../components/Pagination.vue';

const page = ref(1);
const perPage = 10;
const filtered = computed(() => items); 
const totalPages = computed(() => Math.ceil(filtered.value.length/perPage));
const paginated = computed(() => filtered.value.slice((page.value-1)*perPage, page.value*perPage));

const items = [
  {
    id: 1,
    user: { name: 'John Doe', email: 'john@example.com', initials: 'JD' },
    amount: '$1,000.00',
    balance: '$1,200.00',
    transaction_id: 'TX12345678',
    created_at: 'May 15, 2023'
  },
  {
    id: 2,
    user: { name: 'Jane Smith', email: 'jane@example.com', initials: 'JS' },
    amount: '$250.50',
    balance: '$1,450.50',
    transaction_id: 'TX87654321',
    created_at: 'May 14, 2023'
  },
  {
    id: 3,
    user: { name: 'Robert Johnson', email: 'robert@example.com', initials: 'RJ' },
    amount: '$100.00',
    balance: '$1,550.50',
    transaction_id: 'TX13579246',
    created_at: 'May 13, 2023'
  },
  {
    id: 4,
    user: { name: 'Emily Davis', email: 'emily@example.com', initials: 'ED' },
    amount: '$75.25',
    balance: '$1,625.75',
    transaction_id: 'TX24681357',
    created_at: 'May 12, 2023'
  },
  {
    id: 5,
    user: { name: 'Michael Wilson', email: 'michael@example.com', initials: 'MW' },
    amount: '$200.00',
    balance: '$1,825.75',
    transaction_id: 'TX35792468',
    created_at: 'May 11, 2023'
  },
  {
    id: 6,
    user: { name: 'Sarah Brown', email: 'sarah@example.com', initials: 'SB' },
    amount: '$500.00',
    balance: '$2,325.75',
    transaction_id: 'TX46813579',
    created_at: 'May 10, 2023'
  },
  {
    id: 7,
    user: { name: 'David Miller', email: 'david@example.com', initials: 'DM' },
    amount: '$-300.00',
    balance: '$2,025.75',
    transaction_id: 'TX57924680',
    created_at: 'May 9, 2023'
  },
  {
    id: 8,
    user: { name: 'Jessica Garcia', email: 'jessica@example.com', initials: 'JG' },
    amount: '$750.00',
    balance: '$2,775.75',
    transaction_id: 'TX68035791',
    created_at: 'May 8, 2023'
  },
  {
    id: 9,
    user: { name: 'Thomas Martinez', email: 'thomas@example.com', initials: 'TM' },
    amount: '$180.30',
    balance: '$2,956.05',
    transaction_id: 'TX79146802',
    created_at: 'May 7, 2023'
  },
  {
    id: 10,
    user: { name: 'Lisa Anderson', email: 'lisa@example.com', initials: 'LA' },
    amount: '$50.00',
    balance: '$3,006.05',
    transaction_id: 'TX80257913',
    created_at: 'May 6, 2023'
  },
  {
    id: 11,
    user: { name: 'Daniel Taylor', email: 'daniel@example.com', initials: 'DT' },
    amount: '$65.75',
    balance: '$3,071.80',
    transaction_id: 'TX91368024',
    created_at: 'May 5, 2023'
  },
  {
    id: 12,
    user: { name: 'Karen Thomas', email: 'karen@example.com', initials: 'KT' },
    amount: '$150.00',
    balance: '$3,221.80',
    transaction_id: 'TX02479135',
    created_at: 'May 4, 2023'
  },
  {
    id: 13,
    user: { name: 'James White', email: 'james@example.com', initials: 'JW' },
    amount: '$400.00',
    balance: '$3,621.80',
    transaction_id: 'TX13580246',
    created_at: 'May 3, 2023'
  },
  {
    id: 14,
    user: { name: 'Nancy Harris', email: 'nancy@example.com', initials: 'NH' },
    amount: '$-200.00',
    balance: '$3,421.80',
    transaction_id: 'TX24691357',
    created_at: 'May 2, 2023'
  },
  {
    id: 15,
    user: { name: 'Paul Clark', email: 'paul@example.com', initials: 'PC' },
    amount: '$500.00',
    balance: '$3,921.80',
    transaction_id: 'TX35702468',
    created_at: 'May 1, 2023'
  },
  {
    id: 16,
    user: { name: 'Amanda Lewis', email: 'amanda@example.com', initials: 'AL' },
    amount: '$120.45',
    balance: '$4,042.25',
    transaction_id: 'TX46813579',
    created_at: 'April 30, 2023'
  },
  {
    id: 17,
    user: { name: 'Kevin Walker', email: 'kevin@example.com', initials: 'KW' },
    amount: '$80.00',
    balance: '$4,122.25',
    transaction_id: 'TX57924680',
    created_at: 'April 29, 2023'
  },
  {
    id: 18,
    user: { name: 'Michelle Hall', email: 'michelle@example.com', initials: 'MH' },
    amount: '$45.50',
    balance: '$4,167.75',
    transaction_id: 'TX68035791',
    created_at: 'April 28, 2023'
  },
  {
    id: 19,
    user: { name: 'Steven Young', email: 'steven@example.com', initials: 'SY' },
    amount: '$175.00',
    balance: '$4,342.75',
    transaction_id: 'TX79146802',
    created_at: 'April 27, 2023'
  },
  {
    id: 20,
    user: { name: 'Laura Allen', email: 'laura@example.com', initials: 'LA' },
    amount: '$300.00',
    balance: '$4,642.75',
    transaction_id: 'TX80257913',
    created_at: 'April 26, 2023'
  }
];
</script>

<style scoped>
/* Add any custom styles here */
</style>