import axios from 'axios'

import { API } from '../utils'
import { AddMintPayload } from './types'

export const addMintAPI = async (
  url: string,
  { arg }: { arg: AddMintPayload }
) => await axios.post(`${API}${url}`, arg).then((res) => res.data)
