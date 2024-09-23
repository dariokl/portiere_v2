<template>
  <VaModal v-model="showModal" max-height="600px" hide-default-actions>
    <template #header>
      <div class="flex items-center gap-4">
        <VaIcon name="payments" color="primary" />
        <span> {{ income ? 'Edit' : 'Add' }} Income </span>
      </div>
    </template>
    <VaDivider />
    <p class="va-text-secondary text-xs">
      Enter your income details to help monitor your finances. The income amount will be added to
      the selected account on the first day of each month.
    </p>
    <VaForm ref="incomeForm" class="flex flex-col gap-4 mt-8 mb-8">
      <div class="flex gap-8">
        <VaInput
          v-model="form.amount"
          label="Income Amount"
          :rules="[
            (v) => Boolean(v) || 'Income Amount is required',
            (v) => parseFloat(v) || 'Income Amount must be a numberical value'
          ]"
          class="w-1/2"
        >
          <template #prependInner>
            <VaIcon name="attach_money" color="secondary" />
          </template>
        </VaInput>
        <VaSelect
          v-model="form.currency"
          :options="store.currencies"
          :rules="[(v) => Boolean(v) || 'Income Currency is required']"
          :highlight-matched-text="false"
          label="Income Currency"
          placeholder="Select one..."
          class="w-1/2"
          searchable
        />
      </div>
      <VaSelect
        v-model="form.account"
        :options="accounts"
        :highlight-matched-text="false"
        track-by="id"
        text-by="name"
        label="Income Account"
        placeholder="Select one..."
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
import { reactive, watchEffect } from 'vue'
import { useForm } from 'vuestic-ui'
import { useCurrencyRates } from '@/stores/currencyRates'
import { db } from '@/db'

const { accounts, income } = defineProps({
  accounts: { type: Array, default: () => [] },
  income: Object
})

const showModal = defineModel()

const store = useCurrencyRates()
const { validate, reset } = useForm('incomeForm')

const form = reactive({
  amount: '',
  currency: '',
  account: '',
  id: ''
})

watchEffect(() => {
  form.amount = income?.amount
  form.currency = income?.currency
  form.account = income?.account
  form.id = income?.id
})

const submit = () => {
  console.log(form)

  if (!income) {
    db.income.add({
      amount: form.amount,
      currency: form.currency,
      account: { ...form.account }
    })
  } else {
    db.income.update(income.id, {
      amount: form.amount,
      currency: form.currency,
      account: { ...form.account }
    })
  }
  reset()
  showModal.value = !showModal.value
}

const handleClose = () => {
  showModal.value = !showModal.value
}
</script>
