export interface Sale {
  _id: string
  token_name: string
  description: string
  total_supply: number
  owner: string
  policy_id: string
  token_per_ada: number
  min_buy: number
  max_buy: number
  logo_url: string
  website: string
  twitter: string
  discord: string
  telegram: string
  start_time: string
  end_time: string
  is_close: string
  createdAt: string
  updatedAt: string
}
export interface Stats {}

export interface UpdateSalePayload {
  is_close: boolean
}

export interface AddSalePayload {
  token_name: string
  description: string
  total_supply: number
  policy_id: string
  token_per_ada: number
  min_buy: number
  max_buy: number
  logo_url: string
  website: string
  twitter: string
  discord: string
  telegram: string
  start_time: string
  end_time: string
}

export interface AddMintPayload {}
