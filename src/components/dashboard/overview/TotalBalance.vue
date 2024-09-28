<template>
  <VaCard>
    <VaCardTitle class="rounded-md bg-emerald-600 text-white">
      <div class="flex justify-between w-full">
        <div class="flex flex-col">
          <HoverableIcon icon-name="wallet" cursor="default" />
          <span class="block mt-2">Total Balance</span>
        </div>
        <div class="flex w-[68px] text-xs overflow-hidden">
          <VaSelect v-model="currency" :options="currencies" class="currency-select" />
        </div>
      </div>
    </VaCardTitle>
    <VaCardContent>
      <span class="block mt-2 font-bold">{{ totalBalance }}</span>
      <span class="block flex items-center gap-1 text-xs"
        >{{ percentage.value + '%' }}
        <VaIcon :name="percentage.icon" :color="percentage.color" />
      </span>
    </VaCardContent>
  </VaCard>
</template>

<script setup>
import { computed, ref, watchEffect, onMounted, reactive } from 'vue'
import { useCurrencyRates } from '@/stores/currencyRates'
import { balanceToCurrency, totalBalanceCalculator } from '@/utils/currency.utils'
import { db } from '@/db'

import HoverableIcon from '@/components/HoverableIcon.vue'

const { accounts } = defineProps({
  accounts: {
    type: Array,
    default: () => []
  }
})
console.log('render')
const currency = ref('EUR')
const percentage = reactive({ value: '0', icon: 'trending_flat', color: 'secondary' })
const currencies = computed(() => [...new Set(accounts.map((account) => account.currency))])
const totalBalance = computed(() => {
  const balance = totalBalanceCalculator(accounts, store.rates, currency.value)
  return balanceToCurrency(currency.value, balance)
})

const store = useCurrencyRates()

const percentageChange = async () => {
  const records = await db.totalBalance.orderBy('date').toArray()

  if (records.length > 1) {
    const firstRecord = records.find(({amount}) => parseFloat(amount) > 0)
    const lastRecord = records[records.length - 1]

    const change = ((lastRecord.amount - firstRecord.amount) / firstRecord.amount) * 100

    const iconName = change > 0 ? 'trending_up' : change < 0 ? 'trending_down' : 'trending_flat'
    const color = change > 0 ? 'primary' : change < 0 ? 'danger' : 'secondary'

    percentage.value = change.toFixed(2)
    percentage.icon = iconName
    percentage.color = color
  }
}

const checkAndUpdateBalance = async () => {
  const lastRecord = await db.totalBalance.orderBy('date').last()

  const oneDayAgo = new Date()
  oneDayAgo.setDate(oneDayAgo.getDate() - 1)

  if (!lastRecord || new Date(lastRecord.date) < oneDayAgo) {
    await db.totalBalance.add({
      date: new Date(),
      amount: totalBalanceCalculator(accounts, store.rates, 'EUR')
    })
  }
}

onMounted(() => {
  percentageChange()
})

watchEffect(() => {
  if (accounts.length && currencies.value.length && !currencies.value.includes(currency.value)) {
    currency.value = currencies.value[0] || 'EUR'
  }
  checkAndUpdateBalance()
})
</script>

<style scoped>
:deep(.va-select__toggle-icon) {
  color: white !important;
}
</style>
