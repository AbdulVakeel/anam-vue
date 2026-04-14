<script setup>
import Button from '../components/Button.vue'
</script>

<template>
  <div class="p-6 space-y-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
	 <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
      Button
    </h1>
   <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Button intent="primary">Primary</Button>
      <Button intent="outline">Outline</Button>
      <Button intent="success">Success</Button>
      <Button intent="warning">Warning</Button>
      <Button intent="danger">Danger</Button>
      <Button intent="info">Info</Button>
      <Button intent="dark">Dark</Button>
      <Button intent="light">Light</Button>
      <Button intent="text">Text</Button>
      <Button intent="link" as="a" href="#">Link</Button>
      <Button intent="gradient">Gradient</Button>
      <Button intent="disabled" disabled>Disabled</Button>
    </section>

  </div>
</template>