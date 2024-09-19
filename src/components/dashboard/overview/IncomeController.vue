<template>
  <VaCard>
    <VaCardTitle class="rounded-md bg-teal-600">
      <div class="flex justify-between w-full">
        <div class="flex flex-col w-14">
          <HoverableIcon icon-name="attach_money" cursor="default" icon-color="#ffff" />
          <span class="block mt-2 break-words text-white">Montly Income</span>
        </div>

        <div v-if="income" class="flex justify-center items-start">
          <HoverableIcon
            icon-name="edit"
            hover-bg-color="#10b981"
            icon-color="#ffff"
            @click="showModal = !showModal"
          />
        </div>
      </div>
    </VaCardTitle>
    <VaCardContent>
      <div
        class="mt-2 flex flex-col justify-center items-center"
        @click="!income && (showModal = !showModal)"
      >
        <div
          v-if="income"
          class="flex flex-col items-center rounded-lg hover:shadow-sm p-2 cursor-pointer transition ease-in delay-100"
        >
          <VaIcon name="add_circle" color="primary" size="22px"></VaIcon>
          <span class="text-xs mt-1">Add Income</span>
        </div>
        <div v-else>
          <span class="">{{ useBalanceToCurrency(account.currency, income.amount) }}</span>
        </div>
      </div>
    </VaCardContent>
    <IncomeModalForm v-model="showModal" :accounts="options" :income="income" />
  </VaCard>
</template>

<script setup>
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { db } from '@/db'
import { ref, computed } from 'vue'
import HoverableIcon from '../../HoverableIcon.vue'
import IncomeModalForm from './IncomeModalForm.vue'
import { useBalanceToCurrency } from '@/composables/useCurrency'

const accounts = useObservable(liveQuery(() => db.accounts.toArray()))

const income = useObservable(liveQuery(() => db.income.orderBy('id').first()))

const account = computed(() => {
  if (accounts.value && income.value) {
    return accounts.value.find(({ id }) => id === income.value.accountId)
  }
  return null
})

const options = computed(
  () => accounts?.value?.map((account) => ({ text: account.name, id: account.id })) || []
)

const showModal = ref(false)
</script>
