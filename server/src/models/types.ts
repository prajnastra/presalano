import { Document } from 'mongoose'

export interface IPresale extends Document {
  token_name: string
  description: string
  total_supply: number
  price_in_ada: number
  website: string
  twitter: string
  discord: string
  telegram: string
  logo_url: string
  start_time: string
  end_time: string
}
