import axios from 'axios'

import { API } from '../utils'
import { Stats } from './types'

export const getStatsAPI = async (url: string): Promise<Stats> =>
  await axios.get(`${API}${url}`).then((res) => res.data)
