<template>
  <VaCard>
    <VaCardTitle>
      <div class="flex w-full justify-between gap-4">
        <div class="flex items-center gap-4">
          <HoverableIcon
            :icon-name="accountTypesMap[type.toLowerCase()].icon"
            cursor="default"
            :icon-color="accountTypesMap[type.toLowerCase()].color"
          />
          <span>{{ name }}</span>
        </div>
        <div class="flex items-center gap-2">
          <HoverableIcon
            icon-name="edit"
            hover-bg-color="#10b981"
            @click="showModal = !showModal"
          />
          <HoverableIcon icon-name="delete" hover-bg-color="#ef4444" @click="handleDelete" />
        </div>
      </div>
    </VaCardTitle>
    <VaCardContent>
      <span class="text-xs mb-2 block">{{ `${type} - ${number}` }}</span>
      <div
        className="bg-gray-200/70 shadow-lg h-20 w-full rounded-lg flex flex-col justify-center items-start"
      >
        <p className="text-xs font-extrabold pl-4 mb-2">Balance amount</p>
        <p className="font-extrabold pl-4">{{ balanceToCurrency(currency, balance) }}</p>
      </div>
    </VaCardContent>
    <AccountModalForm
      v-model="showModal"
      :account="{ id, name, number, balance, currency, type }"
    />
  </VaCard>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '@/db'
import { balanceToCurrency } from '@/utils/currency.utils'
import { useModal } from 'vuestic-ui'

import HoverableIcon from '../../HoverableIcon.vue'
import AccountModalForm from './AccountModalForm.vue'

const showModal = ref(false)
const { confirm } = useModal()

const accountTypesMap = {
  bank: {
    icon: 'account_balance',
    color: '#10b981'
  },
  card: {
    icon: 'credit_card',
    color: '#60a5fa'
  },
  cash: {
    icon: 'attach_money',
    color: '#fb923c'
  },
  savings: {
    icon: 'savings',
    color: '#fb7185'
  }
}

const { id, name, number, currency, balance, type } = defineProps([
  'id',
  'name',
  'number',
  'currency',
  'balance',
  'type'
])

const handleDelete = () => {
  confirm({
    title: 'Are you sure ?',
    message: 'By clicking OK selected Account data will be Deleted.'
  }).then((ok) => {
    ok && db.accounts.delete(id)
  })
}
</script>
