<template>
  <VaCard>
    <VaCardTitle class="rounded-md bg-emerald-600 text-white">
      <div class="flex justify-between w-full">
        <div class="flex flex-col">
          <HoverableIcon icon-name="wallet" cursor="default" />
          <span class="block mt-2">Total Balance</span>
        </div>

        <div class="flex w-[72px]">
          <VaSelect v-model="currency" :options="currencies" />
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
import HoverableIcon from '../../HoverableIcon.vue'
import { balanceToCurrency, totalBalanceCalculator } from '@/utils/currency.utils'

const { accounts } = defineProps({
  accounts: {
    type: Array,
    default: () => []
  }
})

const currency = ref('EUR')

const store = useCurrencyRates()

const currencies = computed(() => accounts.map((account) => account.currency) || [])

const totalBalance = computed(() => {
  const balance = totalBalanceCalculator(accounts, store.rates, currency.value)
  return balanceToCurrency(currency.value, balance)
})

watchEffect(() => {
  if (currencies.value.length && !currencies.value.includes(currency.value)) {
    currency.value = currencies.value[0]
  }
})
</script>
