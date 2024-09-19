<template>
  <div class="mt-6 mb-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
      <AccountItem
        v-for="account in accounts"
        :key="account.id"
        :id="account.id"
        :name="account.name"
        :number="account.number"
        :currency="account.currency"
        :balance="account.balance"
        :type="account.type"
      />
      <AccountModal />
    </div>
  </div>
</template>

<script setup>
import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import { db } from '@/db'

import AccountModal from './AccountModal.vue'
import AccountItem from './AccountItem.vue'

const accounts = useObservable(liveQuery(() => db.accounts.toArray()))
</script>
