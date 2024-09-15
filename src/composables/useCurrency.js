export const useBalanceToCurrency = (currency, value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(parseFloat(value))

export const useTotalBalanceCalculation = (accounts, rates, currency) => {
  if (!accounts?.value || !rates || !currency) return '0.00'

  return accounts.value.reduce((agr, item) => {
    const amountInEUR = parseFloat(item.balance) / rates[item.currency]
    const convertedAmount = amountInEUR * rates[currency]

    return agr + convertedAmount
  }, 0)
}
