export function formatINR(amount: number) {
  if (Number.isNaN(amount)) return '₹0.00'
  return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })
}
