<template>
  <div
    @click="showModal = !showModal"
    class="flex justify-center items-center rounded-lg nhover:bg-gray-200 hover:shadow-md transition ease-in delay-100 cursor-pointer"
  >
    <div class="flex flex-col items-center">
      <VaIcon name="add_circle" color="primary" size="40px" />
      <span>Add Expense</span>
    </div>

    <ExpensesModalForm v-model="showModal" :accounts="accounts" />
  </div>
</template>

<script setup>
import ExpensesModalForm from './ExpensesModalForm.vue'

const { accounts } = defineProps({ accounts: { type: Array, default: () => [] } })

const showModal = defineModel()
</script>
