import { Request, Response, NextFunction } from 'express'
import validator from '../utils/validator'
import lineHookS from '../services/lineHookS'
import { LineWebhook } from '../models/linehookT'


const lineHook = async (req: Request, res: Response, next: NextFunction) => {
    const data: LineWebhook = req.body
    let oaBid: Buffer
    let oaSecret: string
    let oaToken: string
    // validate that OA is in our care
    try {
        const destination = data.destination
        const oaResult = await lineHookS.checkOAClient(destination)

        if (oaResult[0] === true) {
            oaBid = oaResult[1]["line_oa_id_bin"]
            oaSecret = oaResult[1]["line_message_secret"]
            oaToken = oaResult[1]["line_message_token"]
        } else {
            res.status(400).send('H@@krec3ive')
            next()
            return
        }

    } catch (error) {
        next(error)
        return
    }


    if (await validator.verifyLineWebhookSignature(req) == true) {
        const lineUser: string = data.events[0].source.userId
        const bid: Buffer = await lineHookS.userHandler(lineUser)

        const event: string = data.events[0].type
        switch (event) {
            case "message":
                lineHookS.logActivity(bid, oaBid, "message")
                break;
            case "follow":
                lineHookS.logActivity(bid, oaBid, "follow")
                // do some follow such as send flex message
                break
            case "unfollow":
                lineHookS.logActivity(bid, oaBid, "unfollow")
                // do some unfollow
                break
            case "postback":
                lineHookS.logActivity(bid, oaBid, "postback")
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