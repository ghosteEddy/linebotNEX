import { Request, Response, NextFunction } from 'express'
import validator from '../utils/validator'


const lineHook = async (req: Request, res: Response, next: NextFunction) => {
    if (await validator.verifyLineWebhookSignature(req) == true) {
        res.status(200).send('HookReceive')
    } else {
        res.status(400).send('H@@krec3ive')
    }
    next()
}

export default {
    lineHook
}