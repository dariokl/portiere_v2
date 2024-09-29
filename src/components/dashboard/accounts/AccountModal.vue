<template>
  <div
    class="hover:bg-gray-200 hover:shadow-lg transition inside-out delay-100 cursor-pointer rounded-md shadow-md"
  >
    <VaCardContent
      title="Create new Account"
      class="h-48 flex flex-col justify-center items-center"
      @click="showModal = !showModal"
    >
      <VaIcon name="add_circle_outline" size="48px" color="primary" />
      <span class="text-emerald-600">Add new Account</span>
    </VaCardContent>

    <AccountModalForm v-model="showModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import AccountModalForm from './AccountModalForm.vue'

const showModal = ref(false)
</script>
