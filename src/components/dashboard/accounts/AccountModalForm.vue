<template>
  <VaModal v-model="showModal" max-height="600px" hide-default-actions>
    <template #header>
      <div class="flex items-center gap-4">
        <VaIcon name="account_balance_wallet" color="primary" />
        <span> Add new Account </span>
      </div>
    </template>
    <VaDivider />
    <p class="va-text-secondary text-xs">
      Provide your account details to help keep track of your finances. This will allow you to
      manage your transactions easily and stay organized.
    </p>
    <VaForm ref="accountForm" class="flex flex-col gap-4 mt-8 mb-8">
      <div class="flex gap-8">
        <VaInput
          v-model="form.name"
          label="Account Name"
          :rules="[(v) => Boolean(v) || 'Account Name is required']"
          class="w-1/2"
        >
          <template #prependInner>
            <VaIcon name="badge" color="secondary" />
          </template>
        </VaInput>
        <VaInput
          v-model="form.number"
          label="Account Number"
          :rules="[(v) => Boolean(v) || 'Account Number is required']"
          class="w-1/2"
        >
          <template #prependInner>
            <VaIcon name="pin" color="secondary" />
          </template>
        </VaInput>
      </div>
      <VaInput
        v-model="form.balance"
        label="Account Balance"
        :rules="[
          (v) => Boolean(v) || 'Account Balance is required',
          (v) => parseFloat(v) || 'Account Balance must be a numberical value'
        ]"
      >
        <template #prependInner>
          <VaIcon name="account_balance" color="secondary" />
        </template>
      </VaInput>

      <div class="flex gap-8">
        <VaSelect
          v-model="form.currency"
          :options="store.currencies"
          :rules="[(v) => Boolean(v) || 'Account Currency is required']"
          placeholder="Select one..."
          label="Account Currency"
          searchable
          class="w-1/2"
        />
        <VaSelect
          v-model="form.type"
          :options="['Bank', 'Card', 'Cash', 'Savings']"
          :rules="[(v) => Boolean(v) || 'Account Type is required']"
          label="Account Type"
          placeholder="Select one..."
          class="w-1/2"
        />
      </div>
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

const props = defineProps({ account: { type: [Object, undefined] } })
const showModal = defineModel()
const store = useCurrencyRates()
const { validate, reset } = useForm('accountForm')

const form = reactive({
  name: '',
  number: '',
  balance: '',
  currency: '',
  type: ''
})

watchEffect(() => {
  form.name = props?.account?.name
  form.number = props?.account?.number
  form.balance = props?.account?.balance
  form.currency = props?.account?.currency
  form.type = props?.account?.type
})

const submit = () => {
  if (props?.account) {
    db.accounts.update(props.account.id, {
      ...form
    })
  } else {
    db.accounts.add({
      ...form
    })
  }
  reset()
  showModal.value = !showModal.value
}

const handleClose = () => {
  reset()
  showModal.value = !showModal.value
}
</script>
