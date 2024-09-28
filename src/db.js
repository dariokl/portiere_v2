import Dexie from 'dexie'

export const db = new Dexie('portiere')

db.version(1).stores({
  accounts: '++id, name, number, currency, balance, type',
  income: '++id, amount, currency, account, payDate',
  expenses: '++id, category, type, account, amount, details, date',
  totalBalance: '++id, amount, date'
})
