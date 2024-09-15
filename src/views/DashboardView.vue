<template>
  <main class="p-4">
    <PageLoading v-if="loading" />
    <div v-else>
      <GadgetsOverview />
      <AccountsOverview />
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCurrencyRates } from '@/stores/currencyRates'

import AccountsOverview from '../components/dashboard/accounts/AccountsOverview.vue'
import PageLoading from '../components/PageLoading.vue'
import GadgetsOverview from '../components/dashboard/overview/GadgetsOverview.vue'

const store = useCurrencyRates()

onMounted(() => store.getCurrencyRates())

const { loading } = store
</script>
