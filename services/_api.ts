
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
  adapter: 'fetch',
  fetchOptions: { cache: 'no-store' } as RequestInit,
  headers: { 'Content-Type': 'application/json', },
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