import Axios from 'axios'

import { API_BASE_URL } from '@/config'
import storage from '@/utils/storage'

export const axios = Axios.create({
  baseURL: API_BASE_URL,
})

axios.interceptors.request.use((config) => {
  const token = storage.getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers.Accept = 'application/json'

  return config
})
