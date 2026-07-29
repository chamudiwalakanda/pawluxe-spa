import { access, readFile } from 'node:fs/promises'
import { products } from '../src/data/products.js'

const ids = new Set()
for (const product of products) {
  if (ids.has(product.id)) throw new Error(`Duplicate product id: ${product.id}`)
  ids.add(product.id)
  if (!product.name || !product.category || !product.image || !product.fallback) {
    throw new Error(`Product ${product.id} is missing required display data.`)
  }
  if (product.offerPrice <= 0 || product.price < product.offerPrice) {
    throw new Error(`Product ${product.id} has invalid pricing.`)
  }
  await access(new URL(`../public${product.fallback}`, import.meta.url))
}

const dummyData = JSON.parse(await readFile(new URL('../public/data/dummy.json', import.meta.url), 'utf8'))
if (!Array.isArray(dummyData.users) || !dummyData.users.some((user) => user.role === 'admin')) {
  throw new Error('dummy.json must include an administrator account.')
}

console.log(`Validated ${products.length} products, local image fallbacks and ${dummyData.users.length} demo users.`)
