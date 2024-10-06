<template>
  <VaModal v-model="showModal" max-height="600px" hide-default-actions>
    <template #header>
      <div class="flex items-center gap-4">
        <VaIcon name="" color="primary" />
        <span> Add Expense </span>
      </div>
    </template>
    <VaDivider />
    <p class="va-text-secondary text-xs">
      Enter your income details to help monitor your finances. The income amount will be added to
      the selected account on the first day of each month.
    </p>
    <VaForm ref="expenseForm" class="flex flex-col gap-4 mt-8 mb-8">
      <div class="flex gap-4">
        <VaSelect
          v-model="form.category"
          :options="category"
          :highlight-matched-text="false"
          :rules="[(v) => Boolean(v) || 'Expense Category is required']"
          label="Expense Category"
          placeholder="Select one..."
          class="w-1/2"
        />
        <VaSelect
          v-model="form.type"
          :options="types"
          :highlight-matched-text="false"
          :rules="[
            () => Boolean(form.category) || 'Select Expense Category first',
            (v) => Boolean(v) || 'Expense Type is required'
          ]"
          track-by="id"
          label="Expense Type"
          placeholder="Select one..."
          class="w-1/2"
        />
      </div>
      <div class="flex gap-4">
        <VaSelect
          v-model="form.account"
          :options="accounts"
          :rules="[(v) => Boolean(v) || 'Expense Account is required']"
          placeholder="Select one..."
          track-by="id"
          text-by="name"
          label="Expense Account"
          class="w-1/2"
        />
        <VaInput
          v-model="form.amount"
          label="Expense Amount"
          class="w-1/2"
          :rules="[(v) => parseFloat(v) || 'Expense Amount must be a numberical value']"
        >
          <template #prependInner>
            <VaIcon name="attach_money" color="secondary" />
          </template>
        </VaInput>
      </div>
      <VaTextarea
        v-model="form.detail"
        label="Details"
        placeholder="More details about expense..."
        optional
      />
    </VaForm>
    <VaDivider />
    <template #footer>
      <div class="flex items-center gap-2">
        <VaButton preset="secondary" color="danger" round @click="handleClose"> Cancel </VaButton>
        <VaButton
          preset="primary"
          icon="check"
          border-color="primary"
          @click="validate() && submit()"
          round
        >
          Save
        </VaButton>
      </div>
    </template>
  </VaModal>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useForm } from 'vuestic-ui'
import { useCurrencyRates } from '@/stores/currencyRates'
import { expenseCategories } from '@/constants/expenseOptions'
import { totalBalanceCalculator } from '@/utils/currency.utils'
import { db } from '@/db'

const store = useCurrencyRates()
const showModal = defineModel()
const { accounts } = defineProps({ accounts: { type: Array, default: () => [] } })

const { validate, reset } = useForm('expenseForm')

const category = expenseCategories.map(({ category }) => category)

const types = computed(() => {
  const selectedCategory = expenseCategories.find(({ category }) => category === form.category)
  return selectedCategory ? selectedCategory.expenses : []
})

const form = reactive({
  category: '',
  type: '',
  account: '',
  amount: '',
  detail: ''
})

const submit = async () => {
  await db.expenses.add({
    ...form,
    type: { ...form.type },
    account: { ...form.account },
    date: new Date().toDateString()
  })

  await db.accounts.update(form.account.id, {
    ...form.account,
    balance: parseFloat(form.account.balance) - parseFloat(form.amount)
  })

  checkAndUpdateBalance()
  reset()
  showModal.value = !showModal.value
}

const handleClose = () => {
  showModal.value = !showModal.value
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
</script>
