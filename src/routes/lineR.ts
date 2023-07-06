import { Router, Response } from 'express'
import lineHookC from '../controllers/lineHookC'

const router = Router()
router.post('/lhook', lineHookC.lineHook)

export default router