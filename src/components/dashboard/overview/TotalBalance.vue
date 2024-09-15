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
      <span class="block flex gap-1 text-xs"
        >+12% <VaIcon name="trending_up" color="primary"
      /></span>
    </VaCardContent>
  </VaCard>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useObservable } from '@vueuse/rxjs'
import { useTotalBalanceCalculation, useBalanceToCurrency } from '@/composables/useCurrency'
import { db } from '@/db'
import { liveQuery } from 'dexie'

import { useCurrencyRates } from '@/stores/currencyRates'

import HoverableIcon from '../../HoverableIcon.vue'

const currency = ref(null)

const store = useCurrencyRates()

const accounts = useObservable(liveQuery(() => db.accounts.toArray()))

const currencies = computed(() => accounts?.value?.map((account) => account.currency) || [])

const totalBalance = computed(() =>
  useBalanceToCurrency(
    currency.value ?? 'EUR',
    useTotalBalanceCalculation(accounts, store.rates, currency.value)
  )
)

watchEffect(() => {
  if (currencies.value.length) {
    currency.value = currencies.value[0]
  }
})
</script>
<style>
.va-input-wrapper__append-inner i {
  color: white !important;
}
</style>
