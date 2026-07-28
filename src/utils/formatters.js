export function formatLKR(value) {
  const amount = Number(value) || 0
  return `Rs. ${new Intl.NumberFormat('en-LK', {
    maximumFractionDigits: 0,
  }).format(amount)}`
}

export function formatDate(value) {
  if (!value) return 'Not available'
  return new Intl.DateTimeFormat('en-LK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

export function calculateDiscount(price, offerPrice) {
  if (!price || offerPrice >= price) return 0
  return Math.round(((price - offerPrice) / price) * 100)
}
