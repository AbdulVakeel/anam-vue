<template>
  <div class="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
      Grid Column Variations
    </h1>

    <!-- 2 Columns -->
    <GridContainer :cols="2">
      <CardBox v-for="n in 2" :key="'c2-' + n" :title="'Box ' + n" />
    </GridContainer>

    <!-- 3 Columns -->
    <GridContainer :cols="3">
      <CardBox v-for="n in 3" :key="'c3-' + n" :title="'Box ' + n" />
    </GridContainer>

    <!-- 4 Columns -->
    <GridContainer :cols="4">
      <CardBox v-for="n in 4" :key="'c4-' + n" :title="'Box ' + n" />
    </GridContainer>


  </div>
</template>

<script setup>
import GridContainer from '../components/GridContainer.vue'
import CardBox from '../components/CardBox.vue'
</script>
