import { Response, NextFunction } from 'express'

import { Presale } from '../models'
import { ModRequest } from '../types'

export const getPresaleById = (
  req: ModRequest,
  res: Response,
  next: NextFunction,
  id: string
) => {
  Presale.findById(id).exec((err, presale) => {
    if (err || !presale) {
      return res.status(400).json({
        error: 'No presale was found',
      })
    }
    req.presale = presale
    next()
  })
}

export const createPresale = (req: ModRequest, res: Response) => {
  const presale = new Presale(req.body)

  presale.save((err, presale) => {
    if (err) {
      return res.status(400).json({
        err: 'Not able to save presale',
      })
    }
    res.json(presale)
  })
}

export const getAPresale = (req: ModRequest, res: Response) => {
  if (!req.presale) return
  return res.json(req.presale)
}

export const getAllPresale = (_req: ModRequest, res: Response) => {
  Presale.find({ is_close: false })
    .sort({ createdAt: -1 })
    .limit(30)
    .exec((err, presales) => {
      if (err) {
        return res.status(400).json({
          error: 'No presales found!',
        })
      }
      res.json(presales)
    })
}

export const updatePresale = (req: ModRequest, res: Response) => {
  if (!req.presale) return

  Presale.findByIdAndUpdate(
    { _id: req.presale._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, presale) => {
      if (err || !presale) {
        return res.status(400).json({
          error: 'Not able to update presale',
        })
      }
      res.json(presale)
    }
  )
}
