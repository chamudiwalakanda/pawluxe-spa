export const provinces = [
  'Western',
  'Southern',
  'Central',
  'North Western',
  'Sabaragamuwa',
  'North Central',
  'Uva',
  'Eastern',
  'Northern',
]

const provinceRates = {
  Western: 350,
  Southern: 450,
  Central: 500,
  'North Western': 500,
  Sabaragamuwa: 500,
  'North Central': 550,
  Uva: 550,
  Eastern: 600,
  Northern: 650,
}

export const FREE_DELIVERY_THRESHOLD = 15000

export function getDeliveryCharge(province, subtotal) {
  if (subtotal >= FREE_DELIVERY_THRESHOLD || subtotal <= 0) return 0
  return provinceRates[province] ?? 600
}

export function getDeliveryEstimate(province) {
  if (['Western', 'Southern'].includes(province)) return '2 to 3 working days'
  if (['Central', 'North Western', 'Sabaragamuwa'].includes(province)) return '3 to 4 working days'
  return '3 to 5 working days'
}
