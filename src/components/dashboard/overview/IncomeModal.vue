<template>
  <VaCard>
    <VaCardTitle class="rounded-md bg-teal-600">
      <div class="flex justify-between w-full">
        <div class="flex flex-col w-full">
          <HoverableIcon icon-name="attach_money" cursor="default" icon-color="#ffff" />
          <span class="block mt-2 text-white">Montly Income</span>
        </div>

        <div v-if="income" class="flex justify-center items-start">
          <HoverableIcon
            icon-name="edit"
            hover-bg-color="#14b8a6"
            icon-color="#ffff"
            @click="showModal = !showModal"
          />
        </div>
      </div>
    </VaCardTitle>
    <VaCardContent>
      <div class="mt-2">
        <div
          v-if="!income"
          class="flex flex-col items-center rounded-lg hover:shadow-sm p-2 cursor-pointer transition ease-in delay-100"
        >
          <VaIcon name="add_circle" color="#0d9488" size="28px" @click="showModal = !showModal" />
        </div>
        <div v-else class="flex flex-col items-start">
          <span class="block">{{ balanceToCurrency(income.currency, income.amount) }}</span>
          <span class="text-xs text-gray-500"> Account : {{ income.account.name }}</span>
        </div>
      </div>
    </VaCardContent>
    <IncomeModalForm v-model="showModal" :accounts="accounts" :income="income" />
  </VaCard>
</template>

<script setup>
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { db } from '@/db'
import { ref } from 'vue'
import HoverableIcon from '../../HoverableIcon.vue'
import IncomeModalForm from './IncomeModalForm.vue'
import { balanceToCurrency } from '@/utils/currency.utils'

const showModal = ref(false)

const { accounts } = defineProps({ accounts: { type: Array, default: () => [] } })

const income = useObservable(liveQuery(() => db.income.orderBy('id').first()))
</script>
