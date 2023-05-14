import { Document } from 'mongoose'

export interface IPresale extends Document {
  token_name: string
  description: string
  policy_id: string
  owner: string
  total_supply: number
  token_per_ada: number
  min_buy: number
  max_buy: number
  website: string
  twitter: string
  discord: string
  telegram: string
  logo_url: string
  start_time: string
  end_time: string
  is_close: boolean
}

export interface IMint extends Document {
  token_name: string
  total_supply: number
}
