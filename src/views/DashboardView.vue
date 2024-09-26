<template>
  <main class="p-4">
    <PageLoading v-if="store.isLoading" />
    <div v-else>
      <AccountsOverview />
      <GadgetsOverview />
      <ExpensesTable />

    </div>
  </main>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useCurrencyRates } from '@/stores/currencyRates'
import { db } from '@/db'
import AccountsOverview from '@/components/dashboard/accounts/AccountsOverview.vue'
import PageLoading from '@/components/PageLoading.vue'
import GadgetsOverview from '@/components/dashboard/overview/GadgetsOverview.vue'
import ExpensesTable from '@/components/dashboard/expenses/ExpensesTable.vue'
import { getFirstDayOfNextMonth } from '@/utils/useDates'
const store = useCurrencyRates()

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
