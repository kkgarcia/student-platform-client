import Axios from 'axios'

import { API_BASE_URL } from '@/config'
// import storage from '@/utils/storage'

export const axios = Axios.create({
  baseURL: API_BASE_URL,
})
