export interface LauncpadInputs {
  token_name: string
  description: string
  total_supply: number
  policy_id: string
  owner: string
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

export enum Network {
  Mainnet = 'Mainnet',
  Preprod = 'Preprod',
  Preview = 'Preview',
}
