import express from 'express'

import {
  getPresaleById,
  getAPresale,
  createPresale,
  updatePresale,
} from '../controllers/presale'

const router = express.Router()

router.param('presaleId', getPresaleById)

router.get('/presale/:presaleId', getAPresale)
router.post('/presale', createPresale)
router.put('/user/:presaleId', updatePresale)

export default router
