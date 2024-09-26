<template>
  <VaCard>
    <VaCardTitle class="rounded-md bg-emerald-600 text-white">
      <div class="flex justify-between w-full">
        <div class="flex flex-col">
          <HoverableIcon icon-name="wallet" cursor="default" />
          <span class="block mt-2">Total Balance</span>
        </div>

        <div class="flex w-[68px] text-xs overflow-hidden">
          <VaSelect v-model="currency" :options="currencies" class="currency-select"/>
        </div>
      </div>
    </VaCardTitle>
    <VaCardContent>
      <span class="block mt-2 font-bold">{{ totalBalance }}</span>
      <span class="block flex items-center gap-1 text-xs text-emerald-600"
        >+12%

        <VaIcon name="trending_up" color="primary" />
      </span>
    </VaCardContent>
  </VaCard>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useCurrencyRates } from '@/stores/currencyRates'
import { balanceToCurrency, totalBalanceCalculator } from '@/utils/currency.utils'

import HoverableIcon from '@/components/HoverableIcon.vue';


const { accounts } = defineProps({
  accounts: {
    type: Array,
    default: () => []
  }
})

const currency = ref('EUR')
const store = useCurrencyRates()

const currencies = computed(() => [...new Set(accounts.map(account => account.currency))])

const totalBalance = computed(() => {
  const balance = totalBalanceCalculator(accounts, store.rates, currency.value)
  return balanceToCurrency(currency.value, balance)
})

watchEffect(() => {
  if (accounts.length && currencies.value.length && !currencies.value.includes(currency.value)) {
    currency.value = currencies.value[0] || 'EUR'  // Fallback to 'EUR' if no valid currency
  }
})
</script>


<style scoped>
:deep(.va-select__toggle-icon) {
  color: white !important;
}
</style>
