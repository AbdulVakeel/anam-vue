<template>
  <div class="space-y-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl min-h-screen">
    <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
      Badge
    </h1>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">

      <Badge type="info">
        <template #icon>
          <InformationCircleIcon class="w-4 h-4" />
        </template>
        Info
      </Badge>

      <Badge type="success">
        <template #icon>
          <CheckCircleIcon class="w-4 h-4" />
        </template>
        Active
      </Badge>

      <Badge type="danger">
        <template #icon>
          <XCircleIcon class="w-4 h-4" />
        </template>
        Error
      </Badge>

      <Badge type="warning">
        <template #icon>
          <ExclamationTriangleIcon class="w-4 h-4" />
        </template>
        Pending
      </Badge>

      <Badge type="default">
        <template #icon>
          <TagIcon class="w-4 h-4" />
        </template>
        Default
      </Badge>

      <Badge type="info">
        <template #icon>
          <BellIcon class="w-4 h-4" />
        </template>
        New
      </Badge>

      <Badge type="success">
        <template #icon>
          <ShieldCheckIcon class="w-4 h-4" />
        </template>
        Approved
      </Badge>

      <Badge type="danger">
        <template #icon>
          <NoSymbolIcon class="w-4 h-4" />
        </template>
        Failed
      </Badge>

      <Badge type="warning">
        <template #icon>
          <ExclamationCircleIcon class="w-4 h-4" />
        </template>
        Alert
      </Badge>

      <Badge type="default">
        <template #icon>
          <MinusCircleIcon class="w-4 h-4" />
        </template>
        Neutral
      </Badge>

      <Badge type="info">
        <template #icon>
          <ArrowPathIcon class="w-4 h-4" />
        </template>
        Update
      </Badge>

      <Badge type="success">
        <template #icon>
          <CheckBadgeIcon class="w-4 h-4" />
        </template>
        Verified
      </Badge>

    </div>
  </div>
</template>

<script setup>
import Badge from '../components/Badge.vue'

import {
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  TagIcon,
  BellIcon,
  ShieldCheckIcon,
  NoSymbolIcon,
  ExclamationCircleIcon,
  MinusCircleIcon,
  ArrowPathIcon,
  CheckBadgeIcon
} from '@heroicons/vue/24/outline'
</script>
