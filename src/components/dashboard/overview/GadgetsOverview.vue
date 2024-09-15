<template>
  <span class="text-xs mb-4 block">Overview</span>
  <div class="grid grid-cols-1 sm:grid-cols-6 gap-4 pt-2">
    <TotalBalance />
    <IncomeControler />
    <IncomeControler />
  </div>
</template>

<script setup>
import TotalBalance from './TotalBalance.vue'
import IncomeControler from './IncomeControler.vue'
</script>
