<template>
  <span class="text-xs block mt-6">Expenses</span>
  <VaDivider />
  <VaDataTable :items="items" class="table bg-white shadow-lg rounded-lg text-xs p-4" />
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    const items = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org'
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        phone: '010-692-6593 x09125',
        website: 'anastasia.net'
      },
      {
        id: 3,
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        phone: '1-463-123-4447',
        website: 'ramiro.info'
      },
      {
        id: 4,
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        phone: '493-170-9623 x156',
        website: 'kale.biz'
      },
      {
        id: 5,
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        phone: '(254)954-1289',
        website: 'demarco.info'
      }
    ]

    return {
      items
    }
  }
})
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
