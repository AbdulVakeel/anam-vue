<script setup>
import { ref } from 'vue';
import Alert from '../components/Alert.vue';

const showAlerts = ref({
  info: true,
  success: true,
  warning: true,
  danger: true,
  default: true,
});

function dismiss(type) {
  showAlerts.value[type] = false;
}
</script>

<template>
  <div class="p-6 space-y-4 bg-white dark:bg-gray-900 min-h-screen rounded-2xl border border-gray-200 dark:border-gray-800">
     <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
      Alerts
    </h1>

    <Alert v-if="showAlerts.info" intent="info" title="Information" :onDismiss="() => dismiss('info')">
      This is an informational message.
    </Alert>

    <Alert v-if="showAlerts.success" intent="success" title="Success!" :onDismiss="() => dismiss('success')">
      Your action was completed successfully.
    </Alert>

    <Alert v-if="showAlerts.warning" intent="warning" title="Warning" :onDismiss="() => dismiss('warning')">
      Be careful! This action has potential risks.
    </Alert>

    <Alert v-if="showAlerts.danger" intent="danger" title="Error" :onDismiss="() => dismiss('danger')">
      Something went wrong. Please try again.
    </Alert>

    <Alert v-if="showAlerts.default" intent="default" title="Default Notice" :onDismiss="() => dismiss('default')">
      This is a neutral message.
    </Alert>
  </div>
</template>
