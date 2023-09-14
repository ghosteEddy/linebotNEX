import { Router, Response } from 'express'
import lineHookC from '../controllers/lineHookC'

const router = Router()
router.post('/lhook', lineHookC.lineHook)
router.post('/checkAndAddUser', lineHookC.checkAndAddUser)

export default router