import { Router } from 'express'

import checkC from '../controllers/checkC'

const router = Router()
router.get('/health', checkC.healthCheck)

export default router