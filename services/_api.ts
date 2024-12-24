
import axios from 'axios'
import { setupCache, cacheOperations } from './_cache'

const _60_SECS = 1000 * 60;
const _15_MINS = 1000 * 60 * 15;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: _60_SECS,
});

const cachedApi = setupCache(api, {
  ttl: _15_MINS,
  interpretHeader: false,
  storage: cacheOperations,
})

export { cachedApi, api }

export default api;