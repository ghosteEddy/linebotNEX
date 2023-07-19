import { Router } from 'express'

import universalC from '../controllers/universalC'

const router = Router()
router.get('/health', universalC.healthCheck)
router.post('/ulogger', universalC.ulog)

export default router