<template>
  <main class="p-4">
    <PageLoading v-if="loading" />
    <div v-else>
      <AccountsOverview />
      <GadgetsOverview />
      <ExpensesTable />
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCurrencyRates } from '@/stores/currencyRates'

import AccountsOverview from '@/components/dashboard/accounts/AccountsOverview.vue'
import PageLoading from '@/components/PageLoading.vue'
import GadgetsOverview from '@/components/dashboard/overview/GadgetsOverview.vue'
import ExpensesTable from '@/components/dashboard/expenses/ExpensesTable.vue'

const store = useCurrencyRates()

onMounted(() => store.getCurrencyRates())

const { loading } = store
</script>
