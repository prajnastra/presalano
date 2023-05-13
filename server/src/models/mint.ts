import { Schema, model } from 'mongoose'
import { IMint } from './types'

const mintSchema = new Schema<IMint>(
  {
    token_name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    total_supply: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const mintModel = model<IMint>('Mint', mintSchema)

export default mintModel
