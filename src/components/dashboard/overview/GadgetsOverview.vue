<template>
  <div class="grid grid-cols-1 sm:grid-cols-6 gap-4 pt-2">
    <TotalBalance />
    <IncomeController />
    <div
      class="bg-emerald-600 flex justify-center items-center rounded-lg hover:shadow-lg hover:bg-emerald-600/90 transition ease-in delay-100 cursor-pointer"
    >
      <div class="flex flex-col items-center">
        <VaIcon name="add_circle" color="#ffff" size="40px" />
        <span class="text-white">Add Expense</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import TotalBalance from './TotalBalance.vue'
import IncomeController from './IncomeController.vue'
import HoverableIcon from '@/components/HoverableIcon.vue'
</script>
