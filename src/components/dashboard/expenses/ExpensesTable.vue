<template>
  <span class="text-xs block mt-6">Expenses & Transactions</span>
  <VaDivider />
  <VaDataTable
    hoverable
    :columns="[
      { key: 'id', label: 'ID' },
      { key: 'category', label: 'Category' },
      { key: 'type', label: 'Type' },
      { key: 'amount', label: 'Amount' },
      { key: 'account', label: 'Account' },
      { key: 'date', label: 'Transaction Date' },
      { key: 'detail', label: 'Details', width: '200px' },
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
      <span class="text-red-500 font-bold">
        {{ rowData.account && '-' }}
        {{ balanceToCurrency(rowData.account.currency, value) }}
      </span>
    </template>
    <template #cell(account)="{ source }">
      <span class="flex gap-2 items-center">
        <VaIcon
          :name="accountTypesMap[source.type.toLowerCase()].icon"
          :color="accountTypesMap[source.type.toLowerCase()].color"
        />
        {{ source.name }}
      </span>
    </template>
    <template #cell(detail)="{ value }">
      <div class="truncate cursor-pointer" :title="value.length > 29 ? value : ''">
        {{ value === '' ? 'No details ...' : value }}
      </div>
    </template>
    <template #cell(actions)="{ row }">
      <VaButton
        round
        size="small"
        icon="delete"
        class="ml-2 shadow-md hover:bg-emerald-500 transaition ease-in delay-100"
        color="primary"
        @click="removeExpense(row)"
      />
    </template>
  </VaDataTable>
</template>
<script setup>
import { balanceToCurrency } from '@/utils/currency.utils'
import { expenseCategories } from '@/constants/expenseOptions'
import { db } from '@/db'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { accountTypesMap } from '@/constants/accountTypes'

const expenses = useObservable(liveQuery(() => db.expenses.toArray()))

const removeExpense = async ({ source }) => {
  try {
    const account = await db.accounts.get(source.account.id)
    await db.accounts.update(account.id, {
      ...account,
      balance: parseFloat(source.amount) + parseFloat(account.balance)
    })
    await db.expenses.delete(source.id)
  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
.table ::v-deep(thead) {
  border-bottom: 0.1px dashed gainsboro !important;
}

.table ::v-deep(tbody tr) {
  border-bottom: 0.1px dashed gainsboro;
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
