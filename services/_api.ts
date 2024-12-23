
import axios from 'axios'
import { setupCache, cacheOperations } from './_cache'

const _15_MINS = 1000 * 60 * 15;

const api = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});

const cachedApi = setupCache(api, {
  ttl: _15_MINS,
  interpretHeader: false,
  storage: cacheOperations,
})

export { cachedApi, api }

export default api;