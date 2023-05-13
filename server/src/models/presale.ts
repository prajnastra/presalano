import { Schema, model } from 'mongoose'
import { IPresale } from './types'

const presaleSchema = new Schema<IPresale>(
  {
    token_name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 100,
    },
    policy_id: {
      type: String,
    },
    owner: {
      type: String,
    },
    total_supply: {
      type: Number,
      default: 0,
    },
    token_per_ada: {
      type: Number,
      default: 0,
    },
    min_buy: {
      type: Number,
      default: 0,
    },
    max_buy: {
      type: Number,
      default: 0,
    },
    website: {
      type: String,
      default: '',
    },
    logo_url: {
      type: String,
      default: '',
    },
    twitter: {
      type: String,
      default: '',
    },
    discord: {
      type: String,
      default: '',
    },
    telegram: {
      type: String,
      default: '',
    },
    start_time: {
      type: String,
      default: '',
    },
    end_time: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

const presaleModel = model<IPresale>('Presale', presaleSchema)

export default presaleModel
