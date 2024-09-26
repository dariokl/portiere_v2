<template>
  <div class="grid grid-cols-1 sm:grid-cols-6 gap-4 pt-2">
    <TotalBalance :accounts="accounts" />
    <IncomeModal :accounts="accounts" />
    <BalanceChart class="col-span-2"/>
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
import BalanceChart from '../BalanceChart.vue'

const accounts = useObservable(liveQuery(() => db.accounts.toArray()))
</script>
