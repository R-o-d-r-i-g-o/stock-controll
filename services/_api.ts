
import axios from 'axios'
import { setupCache, cacheOperations } from './_cache'

const _60_SECS = 1000 * 60;
const _15_MINS = 1000 * 60 * 15;

const { isAxiosError, create } = axios

const api = create({
  timeout: _60_SECS,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  maxRedirects: 1,
});

const cachedApi = setupCache(api, {
  ttl: _15_MINS,
  interpretHeader: false,
  storage: cacheOperations,
})


export {
  isAxiosError,
  cachedApi,
  api,
}

export default api;