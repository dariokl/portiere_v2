<template>
  <div
    @click="showModal = !showModal"
    class="flex justify-center items-center hover:bg-gray-200 hover:shadow-lg transition inside-out delay-100 cursor-pointer rounded-md shadow-md"  >
    <div class="flex flex-col items-center">
      <VaIcon name="add_circle_outline" size="48px" color="primary" />
      <span class="text-emerald-600">Add Expense</span>
    </div>

    <ExpensesModalForm v-model="showModal" :accounts="accounts" />
  </div>
</template>

<script setup>
import ExpensesModalForm from './ExpensesModalForm.vue'

const { accounts } = defineProps({ accounts: { type: Array, default: () => [] } })

const showModal = defineModel()
</script>
