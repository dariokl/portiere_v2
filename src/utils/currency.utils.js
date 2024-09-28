export const balanceToCurrency = (currency, value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(parseFloat(value))

export const totalBalanceCalculator = (accounts, rates, currency) => {
  if (!accounts || !rates || !currency) return '0.00'


  return accounts.reduce((agr, item) => {
    const amountInEUR = parseFloat(item.balance) / rates[item.currency]
    const convertedAmount = amountInEUR * rates[currency]

    return agr + convertedAmount
  }, 0)
}
