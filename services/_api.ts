
import axios from 'axios'
import { setupCache, cacheOperations, CacheCustomKeys } from './_cache'

enum Timeout {
  _60sec = 1000 * 60,
  _15min = 1000 * 60 * 15
}

const { isAxiosError, create } = axios

const api = create({
  timeout: Timeout._60sec,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  maxRedirects: 1,
  fetchOptions: {
    cache: 'no-store',
    next: { revalidate: 0 }
  },
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  },
});

const cachedApi = setupCache(api, {
  ttl: Timeout._15min,
  interpretHeader: false,
  storage: cacheOperations,
})

export {
  CacheCustomKeys,
  isAxiosError,
  cachedApi,
  api,
}

export default api;