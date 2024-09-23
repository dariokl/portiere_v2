<template>
  <span class="text-xs block mt-6">Expenses</span>
  <VaDivider />
  <VaDataTable
    :columns="[
      { key: 'id', label: 'ID' },
      { key: 'category', label: 'Category' },
      { key: 'type', label: 'Type' },
      { key: 'amount', label: 'Amount' },
      { key: 'account', label: 'Account Name' },
      { key: 'date', label: 'Transaction Date' },
      { key: 'detail', label: 'Details' },
      { key: 'actions', label: 'Actions' }
    ]"
    :items="expenses"
    class="table bg-white shadow-lg rounded-lg text-xs p-4"
  >
    <template #cell(id)="{ rowIndex }">
      {{ rowIndex + 1 }}
    </template>
    <template #cell(category)="{ value }">
      <div class="flex gap-4 items-center">
        <VaBadge
          dot
          :color="expenseCategories?.find(({ category }) => category === value)?.color || `primary`"
          class="mt-2"
        ></VaBadge>
        {{ value }}
      </div>
    </template>
    <template #cell(type)="{ source }">
      {{ source.text }}
    </template>
    <template #cell(amount)="{ rowData, value }">
      {{ useBalanceToCurrency(rowData.account.currency, value) }}
    </template>
    <template #cell(account)="{ source }">
      {{ source.name }}
    </template>
    <template #cell(actions)="{ rowIndex }">
      <VaButton preset="plain" icon="delete" class="ml-3" color="danger" />
    </template>
  </VaDataTable>
</template>
<script setup>
import { useBalanceToCurrency } from '@/composables/useCurrency'
import { expenseCategories } from '@/constants/expenseOptions'
import { db } from '@/db'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'

const expenses = useObservable(liveQuery(() => db.expenses.toArray()))
</script>

<style scoped>
.table ::v-deep(thead) {
  border-bottom: 0.1px dashed var(--va-secondary) !important;
}

.table ::v-deep(tbody tr) {
  border-bottom: 0.1px dashed var(--va-secondary);
}

.table ::v-deep(tbody td) {
  color: var(--va-on-text-inverted);
}

.table ::v-deep(th span) {
  font-weight: bold;
  color: var(--text-primary);
}

.table ::v-deep(tr) {
  color: var(--va-secondary);
}
</style>
