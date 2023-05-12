import { Request } from 'express'
import { IPresale } from '../models'

export interface ModRequest extends Request {
  user?: {
    _id?: string
  }
  presale?: IPresale
}
