import { defineStore } from 'pinia'

export const useCurrencyRates = defineStore('currency-rates', {
  state: () => ({
    data: null,
    loading: false,
    error: null
  }),

  actions: {
    async getCurrencyRates() {
      const cacheKey = 'currency-rates'
      const cache = JSON.parse(localStorage.getItem(cacheKey))
      const now = Date.now()
      const oneDay = 24 * 60 * 60 * 1000

      // Check if the cache is valid
      if (cache && now - cache.timestamp < oneDay) {
        this.data = cache.data
        return cache.data
      }

      this.loading = true
      try {
        // Fetch data using the fetch API
        const response = await fetch('https://open.er-api.com/v6/latest/EUR')

        // Make sure to parse the JSON from the response
        const data = await response.json()

        this.data = data

        // Save the data to localStorage with a timestamp
        localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: now }))
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    }
  },
  getters: {
    currencies(state) {
      if (state.data && state.data.rates) {
        return Object.keys(state.data.rates)
      }
      return []
    },
    rates(state) {
      if (state.data && state.data.rates) {
        return state.data.rates
      }
      return []
    }
  }
})
