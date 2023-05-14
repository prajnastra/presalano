import express from 'express'

import {
  getPresaleById,
  getAPresale,
  createPresale,
  updatePresale,
  getAllPresale,
} from '../controllers/presale'

const router = express.Router()

router.param('saleId', getPresaleById)

router.get('/sale/:saleId', getAPresale)
router.get('/sales', getAllPresale)
router.post('/sale', createPresale)
router.put('/sale/:saleId', updatePresale)

export default router
