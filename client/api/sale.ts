import axios from 'axios'

import { API } from '../utils'
import { Sale, AddSalePayload } from './types'

export const getAllSalesAPI = async (url: string): Promise<Sale> =>
  await axios.get(`${API}${url}`).then((res) => res.data)

export const addSaleAPI = async (
  url: string,
  { arg }: { arg: AddSalePayload }
) => await axios.post(`${API}${url}`, arg).then((res) => res.data)

export const updateSaleAPI = async (
  url: string,
  { arg }: { arg: AddSalePayload }
) => await axios.put(`${API}${url}`, arg).then((res) => res.data)
