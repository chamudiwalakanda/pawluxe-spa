import { getRegisteredUsers } from '../store/appStore'

let cachedDummyUsers = null

export async function fetchDummyUsers() {
  if (cachedDummyUsers) return cachedDummyUsers

  const response = await fetch('/data/dummy.json')
  if (!response.ok) {
    throw new Error('Unable to load the demo user database.')
  }

  const data = await response.json()
  cachedDummyUsers = Array.isArray(data.users) ? data.users : []
  return cachedDummyUsers
}

export async function fetchAllUsers() {
  const dummyUsers = await fetchDummyUsers()
  return [...dummyUsers, ...getRegisteredUsers()]
}

export async function findUserByEmail(email) {
  const normalizedEmail = String(email).trim().toLowerCase()
  const users = await fetchAllUsers()
  return users.find((user) => user.email.toLowerCase() === normalizedEmail) || null
}

export async function authenticateUser(email, password) {
  const user = await findUserByEmail(email)
  return user?.password === password ? user : null
}
