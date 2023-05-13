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
    },
    total_supply: {
      type: Number,
      default: 0,
    },
    price_in_ada: {
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
