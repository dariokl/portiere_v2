<template>
  <main class="p-4">
    <PageLoading v-if="store.isLoading" />
    <div v-else>
      <AccountsOverview />
      <GadgetsOverview />
      <VaTabs v-model="tabVal" class="mt-4 mb-2">
        <template #tabs>
          <VaTab
            class="text-xs"
            v-for="tab in ['Expenses & Transactions', 'Total Balance Chart', 'Expenses Chart']"
            :key="tab"
          >
            {{ tab }}
          </VaTab>
        </template>
      </VaTabs>
      <ExpensesTable v-if="tabVal === 0"/>
      <TotalBalanceChart v-if='tabVal === 1' />

    </div>
  </main>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useCurrencyRates } from '@/stores/currencyRates'
import { db } from '@/db'
import { getFirstDayOfNextMonth } from '@/utils/useDates'

import AccountsOverview from '@/components/dashboard/accounts/AccountsOverview.vue'
import PageLoading from '@/components/PageLoading.vue'
import GadgetsOverview from '@/components/dashboard/overview/GadgetsOverview.vue'
import ExpensesTable from '@/components/dashboard/tables/ExpensesTable.vue'
import TotalBalanceChart from '@/components/dashboard/charts/TotalBalanceChart.vue'

const store = useCurrencyRates()
const tabVal = ref(0)

const updateIncomeBalance = async (income, rates) => {
  const now = new Date()

  if (now > new Date(income.payDate)) {
    const incomeCurrency = income.currency
    const accountCurrency = income.account.currency

    if (!rates[incomeCurrency] || !rates[accountCurrency]) {
      throw new Error('Missing or invalid currency rates')
    }

    const incomeToEurRate = parseFloat(rates[incomeCurrency])
    const accountToEurRate = parseFloat(rates[accountCurrency])
    const incomeInEur = parseFloat(income.amount) / incomeToEurRate
    const convertedAmount = incomeInEur * accountToEurRate

    const newBalance = parseFloat(income.account.balance) + convertedAmount

    await Promise.all([
      db.accounts.update(income.account.id, { ...income.account, balance: newBalance }),
      db.income.update(income.id, {
        ...income,
        account: { ...income.account, balance: newBalance },
        payDate: getFirstDayOfNextMonth()
      })
    ])
  }
}

onMounted(async () => {
  await store.getCurrencyRates()
})

watch(
  () => store.rates,
  async (newRates) => {
    if (!Object.keys(newRates).length) return

    try {
      const income = await db.income.orderBy('id').first()
      if (!income) {
        return
      }
      await updateIncomeBalance(income, newRates)
    } catch (error) {
      console.error('Error updating balance:', error)
    }
  },
  { immediate: true }
)
</script>
