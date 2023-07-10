import { Request, Response, NextFunction } from 'express'
import validator from '../utils/validator'
import lineHookS from '../services/lineHookS'
import { LineWebhook } from '../models/linehookT'
import lMessage from '../services/lineMessageS'


const lineHook = async (req: Request, res: Response, next: NextFunction) => {
    if (await validator.verifyLineWebhookSignature(req) == true) {
        const data: LineWebhook = req.body
        const lineUser: string = data.events[0].source.userId
        const bid: Buffer = await lineHookS.userHandler(lineUser)

        const event: string = data.events[0].type
        switch (event) {
            case "message":
                lineHookS.logActivity(bid, "message")
                break;
            case "follow":
                lineHookS.logActivity(bid, "follow")
                // do some follow such as send flex message
                break
            case "unfollow":
                lineHookS.logActivity(bid, "unfollow")
                // do some unfollow
                break
            case "postback":
                lineHookS.logActivity(bid, "postback")


                // TODO: seperate this later
                switch (data.events[0].postback?.data) {
                    case "pre-register":
                        lMessage.replyPreRegisterForm(String(data.events[0].replyToken), lineUser)
                }

                // assign approrpriately
                break
            default:
                console.info(`web hook event type not supported: ${event}`)
                break;
        }
        res.status(200).send('HookReceive')
    } else {
        res.status(400).send('H@@krec3ive')
    }
    next()
}
export default {
    lineHook
}