<template>
  <div class="grid grid-cols-1 sm:grid-cols-6 gap-4 pt-2">
    <TotalBalance :accounts="accounts" />
    <IncomeModal :accounts="accounts" />
    <ExpensesModal :accounts="accounts" />
  </div>
</template>

<script setup>
import { db } from '@/db'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'

import TotalBalance from './TotalBalance.vue'
import IncomeModal from './IncomeModal.vue'
import ExpensesModal from './ExpensesModal.vue'

const accounts = useObservable(liveQuery(() => db.accounts.toArray()))
</script>
