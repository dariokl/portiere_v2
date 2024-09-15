<template>
  <div
    class="hover:bg-gray-200 hover:shadow-md transition inside-out delay-100 cursor-pointer rounded-md"
  >
    <VaCardContent
      title="Create new Account"
      class="h-48 flex justify-center items-center"
      @click="showModal = !showModal"
    >
      <VaIcon name="add_circle" size="68px" color="primary" />
    </VaCardContent>

    <AccountModalForm v-model="showModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import AccountModalForm from './AccountModalForm.vue'

const showModal = ref(false)
</script>
