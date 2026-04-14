<template> 
  <div class="space-y-6 p-6 min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 rounded-2xl">
    
    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-4 rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center shadow-lg hover:scale-105 transform transition">
        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ tickets.length }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-300">Total Tickets</div>
      </div>
      <div class="p-4 rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center shadow-lg hover:scale-105 transform transition">
        <div class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{{ pendingTickets }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-300">Pending Tickets</div>
      </div>
      <div class="p-4 rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center shadow-lg hover:scale-105 transform transition">
        <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ openTickets }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-300">Open Tickets</div>
      </div>
      <div class="p-4 rounded-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center shadow-lg hover:scale-105 transform transition">
        <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ closedTickets }}</div>
        <div class="text-sm text-gray-600 dark:text-gray-300">Closed Tickets</div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-wrap justify-between items-center gap-3">
      <AppButton @click="openAdd = true" class="bg-blue-500 hover:bg-blue-600">Create Ticket</AppButton>
      <input
        v-model="q"
        placeholder="Search Ticket..."
        class="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <!-- Tickets Table -->
    <Table class="rounded-2xl overflow-hidden shadow-lg mt-4">
      <template #head>
        <th class="py-2 px-3">Id</th>
        <th class="py-2 px-3">Ticket</th>
        <th class="py-2 px-3">Assigned To</th>
        <th class="py-2 px-3">Status</th>
        <th class="py-2 px-3">Date</th>
        <th class="py-2 px-3">Action</th>
      </template>

      <tr v-for="(t, idx) in paginated" :key="t.id" class="hover:bg-gray-100 dark:hover:bg-gray-800/50 transition">
        <td class="py-3 px-3">{{ t.id }}</td>
        <td class="py-3 px-3">
          <div class="font-medium">{{ t.title }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{{ t.description }}</div>
        </td>
        <td class="py-3 px-3 flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-800 dark:text-white font-bold text-sm">
            {{ initials(t.assigned.firstName + ' ' + t.assigned.lastName) }}
          </div>
          {{ t.assigned.firstName }} {{ t.assigned.lastName }}
        </td>
        <td class="py-3 px-3">
          <span class="px-2 py-1 rounded-full text-xs font-semibold" :class="statusClasses[t.status]">
            {{ t.status }}
          </span>
        </td>
        <td class="py-3 px-3">{{ t.date }}</td>
        <td class="py-3 px-3">
          <div class="flex gap-2">
            <button class="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-blue-500 transition" @click="editTicket(idx)">✏</button>
            <button class="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-red-500 transition" @click="confirmDelete((page - 1) * perPage + idx)">🗑</button>
          </div>
        </td>
      </tr>

      <tr v-if="paginated.length === 0">
        <td colspan="6" class="py-6 text-center text-gray-500 dark:text-gray-400">No tickets found.</td>
      </tr>
    </Table>

    <Pagination v-model:page="page" :pages="totalPages" class="mt-4" />

    <!-- Create Ticket Modal -->
    <Modal v-model="openAdd" title="Create Ticket">
      <div class="grid gap-3">
        <FormInput v-model="form.title" label="Title" required />
        <FormInput v-model="form.description" label="Description" required />
        <FormInput v-model="form.assigned.firstName" label="Assigned First Name" required />
        <FormInput v-model="form.assigned.lastName" label="Assigned Last Name" required />
        <select v-model="form.status" class="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100">
          <option>Open</option>
          <option>Pending</option>
          <option>Closed</option>
        </select>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <AppButton variant="secondary" @click="openAdd = false">Cancel</AppButton>
          <AppButton @click="saveTicket">Save</AppButton>
        </div>
      </template>
    </Modal>

    <!-- Edit Ticket Modal -->
    <Modal v-model="openEdit" title="Edit Ticket">
      <div class="grid gap-3">
        <FormInput v-model="editForm.title" label="Title" required />
        <FormInput v-model="editForm.description" label="Description" required />
        <FormInput v-model="editForm.assigned.firstName" label="Assigned First Name" required />
        <FormInput v-model="editForm.assigned.lastName" label="Assigned Last Name" required />
        <select v-model="editForm.status" class="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100">
          <option>Open</option>
          <option>Pending</option>
          <option>Closed</option>
        </select>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <AppButton variant="secondary" @click="openEdit = false">Cancel</AppButton>
          <AppButton @click="updateTicket">Update</AppButton>
        </div>
      </template>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal v-model="openDelete" title="Confirm Delete" size="sm">
      <div class="text-center py-4">
        <div class="text-lg">Are you sure you want to delete?</div>
      </div>
      <template #footer>
        <div class="flex justify-center gap-3">
          <AppButton variant="secondary" @click="openDelete = false">Cancel</AppButton>
          <AppButton variant="danger" @click="deleteTicket">Delete</AppButton>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import AppButton from "../components/AppButton.vue";
import Table from "../components/Table.vue";
import Pagination from "../components/Pagination.vue";
import Modal from "../components/Modal.vue";
import FormInput from "../components/FormInput.vue";

// Tickets data
const tickets = ref([
  { id: 1, title: "Sed ut perspiciatis unde omnis iste", description: "ab illo inventore veritatis et quasi architecto...", assigned: { firstName: "Liam", lastName: "Smith" }, status: "Closed", date: "Mon, Jun 13" },
  { id: 2, title: "Consequuntur magni dolores eos qui ratione", description: "ab illo inventore veritatis et quasi architecto...", assigned: { firstName: "Steve", lastName: "Johnson" }, status: "Pending", date: "Wed, Apr 20" },
  { id: 3, title: "Exercitationem ullam corporis", description: "ab illo inventore veritatis et quasi architecto...", assigned: { firstName: "Jack", lastName: "Brown" }, status: "Open", date: "Fri, Jun 24" },
  { id: 4, title: "Dolor sit amet consectetur adipiscing", description: "Sed do eiusmod tempor incididunt ut labore...", assigned: { firstName: "Olivia", lastName: "Davis" }, status: "Pending", date: "Tue, May 10" },
  { id: 5, title: "At vero eos et accusamus", description: "Et harum quidem rerum facilis est et expedita...", assigned: { firstName: "Noah", lastName: "Wilson" }, status: "Open", date: "Sat, Jul 02" },
  { id: 6, title: "Neque porro quisquam est", description: "Qui dolorem ipsum quia dolor sit amet...", assigned: { firstName: "Emma", lastName: "Taylor" }, status: "Closed", date: "Thu, Aug 18" },
  { id: 7, title: "Nemo enim ipsam voluptatem", description: "Ut enim ad minima veniam, quis nostrum...", assigned: { firstName: "James", lastName: "Anderson" }, status: "Open", date: "Sun, Sep 11" },
  { id: 8, title: "Quis autem vel eum iure reprehenderit", description: "Qui in ea voluptate velit esse quam nihil...", assigned: { firstName: "Sophia", lastName: "Thomas" }, status: "Pending", date: "Fri, Mar 04" },
  { id: 9, title: "Ut enim ad minima veniam", description: "Quis nostrum exercitationem ullam corporis...", assigned: { firstName: "Ethan", lastName: "Moore" }, status: "Closed", date: "Tue, Oct 25" },
  { id: 10, title: "Vel illum qui dolorem eum fugiat", description: "Quis autem vel eum iure reprehenderit...", assigned: { firstName: "Mia", lastName: "Martin" }, status: "Open", date: "Wed, Dec 07" },
  { id: 11, title: "Itaque earum rerum hic tenetur", description: "Excepteur sint occaecat cupidatat non proident...", assigned: { firstName: "Lucas", lastName: "Jackson" }, status: "Pending", date: "Mon, Feb 14" },
  { id: 12, title: "Nam libero tempore cum soluta", description: "Natus error sit voluptatem accusantium doloremque...", assigned: { firstName: "Isabella", lastName: "White" }, status: "Closed", date: "Sat, Apr 23" },
  { id: 13, title: "Temporibus autem quibusdam", description: "Ut labore et dolore magna aliqua...", assigned: { firstName: "Benjamin", lastName: "Harris" }, status: "Open", date: "Fri, May 20" },
  { id: 14, title: "Officiis debitis aut rerum", description: "Sed quia consequuntur magni dolores eos...", assigned: { firstName: "Ava", lastName: "Martin" }, status: "Pending", date: "Thu, Jan 06" },
  { id: 15, title: "Autem quibusdam et aut officiis", description: "Qui blanditiis praesentium voluptatum deleniti...", assigned: { firstName: "Henry", lastName: "Garcia" }, status: "Closed", date: "Mon, Nov 14" },
  { id: 16, title: "Accusamus et iusto odio dignissimos", description: "Atque corrupti quos dolores et quas molestias...", assigned: { firstName: "Charlotte", lastName: "Martinez" }, status: "Open", date: "Tue, Jun 28" },
  { id: 17, title: "Praesentium voluptatum deleniti atque", description: "Sed ut perspiciatis unde omnis iste natus...", assigned: { firstName: "William", lastName: "Robinson" }, status: "Pending", date: "Wed, Aug 31" },
  { id: 18, title: "Ut enim ad minima veniam quis", description: "Vel illum qui dolorem eum fugiat quo voluptas...", assigned: { firstName: "Amelia", lastName: "Clark" }, status: "Closed", date: "Sun, Sep 18" },
]);



// Status classes for light/dark mode
const statusClasses = {
  Open: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  Pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  Closed: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

// Stats
const pendingTickets = computed(() => tickets.value.filter(t => t.status === "Pending").length);
const openTickets = computed(() => tickets.value.filter(t => t.status === "Open").length);
const closedTickets = computed(() => tickets.value.filter(t => t.status === "Closed").length);

// Initials function
const initials = (name) => {
  if (!name) return '';
  return name.split(' ').map(n => n[0]?.toUpperCase()).join('');
};

// Search + Pagination
const q = ref("");
const page = ref(1);
const perPage = 10;

const filtered = computed(() =>
  tickets.value.filter(t =>
    t.title.toLowerCase().includes(q.value.toLowerCase()) ||
    t.description.toLowerCase().includes(q.value.toLowerCase()) ||
    `${t.assigned.firstName} ${t.assigned.lastName}`.toLowerCase().includes(q.value.toLowerCase())
  )
);

const totalPages = computed(() => Math.ceil(filtered.value.length / perPage));
const paginated = computed(() => {
  const start = (page.value - 1) * perPage;
  return filtered.value.slice(start, start + perPage);
});

// Create Ticket
const openAdd = ref(false);
const form = reactive({ title: "", description: "", assigned: { firstName: "", lastName: "" }, status: "Open", date: new Date().toDateString() });
const saveTicket = () => {
  tickets.value.push({ id: Date.now(), ...form });
  Object.assign(form, { title: "", description: "", assigned: { firstName: "", lastName: "" }, status: "Open", date: new Date().toDateString() });
  openAdd.value = false;
};

// Edit Ticket
const openEdit = ref(false);
const editIndex = ref(null);
const editForm = reactive({ title: "", description: "", assigned: { firstName: "", lastName: "" }, status: "Open", date: "" });
const editTicket = (index) => {
  editIndex.value = (page.value - 1) * perPage + index;
  Object.assign(editForm, tickets.value[editIndex.value]);
  openEdit.value = true;
};
const updateTicket = () => {
  if (editIndex.value !== null) tickets.value[editIndex.value] = { ...editForm };
  openEdit.value = false;
};

// Delete Ticket
const openDelete = ref(false);
const deleteIndex = ref(null);
const confirmDelete = (index) => { deleteIndex.value = index; openDelete.value = true; };
const deleteTicket = () => {
  if (deleteIndex.value !== null) {
    tickets.value.splice(deleteIndex.value, 1);
    if (paginated.value.length === 0 && page.value > 1) page.value -= 1;
  }
  openDelete.value = false;
};
</script>
