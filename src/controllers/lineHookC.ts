import { Request, Response, NextFunction } from 'express'
import validator from '../utils/validator'
import lineHookS from '../services/lineHookS'
import { LineWebhook } from '../models/linehookT'
import lMessage from '../services/lineMessageS'

const lineHook = async (req: Request, res: Response, next: NextFunction) => {
    const data: LineWebhook = req.body
    let oaBid: Buffer
    let oaSecret: string
    let oaToken: string
    const oaLogCfg = {
        logFollow: true,
        logUnfollow: true,
        logMessage: false,
        logPostback: true
    }
    // validate that OA is in our care
    try {
        const destination = data.destination
        const oaResult = await lineHookS.checkOAClient(destination)
        // TODO: move mapping & logic to service
        if (oaResult[0] === true) {
            oaBid = oaResult[1]["line_oa_id_bin"]
            oaSecret = oaResult[1]["line_message_secret"]
            oaToken = oaResult[1]["line_message_token"]
            oaLogCfg.logFollow = oaResult[1]["log_follow"]
            oaLogCfg.logUnfollow = oaResult[1]["log_unfollow"]
            oaLogCfg.logMessage = oaResult[1]["log_message"]
            oaLogCfg.logPostback = oaResult[1]["log_postback"]

        } else {
            res.status(400).send('H@@krec3ive')
            next()
            return
        }
        if (await validator.verifyLineWebhookSignature(req, oaSecret) == true) {
            const lineUser: string = data.events[0].source.userId
            const bid: Buffer = await lineHookS.userHandler(lineUser, oaToken)

            const event: string = data.events[0].type
            switch (event) {
                case "message":
                    if (oaLogCfg.logMessage) lineHookS.logActivity(bid, oaBid, "message")
                    break;
                case "follow":
                    if (oaLogCfg.logFollow) lineHookS.logActivity(bid, oaBid, "follow")
                    lMessage.replyPreRegisterForm(String(data.events[0].replyToken), lineUser, oaToken)
                    // do some follow such as send flex message
                    break
                case "unfollow":
                    if (oaLogCfg.logUnfollow) lineHookS.logActivity(bid, oaBid, "unfollow")
                    // do some unfollow
                    break
                case "postback":
                    if (oaLogCfg.logPostback) lineHookS.logActivity(bid, oaBid, "postback", data.events[0].postback?.data)
                    // assign approrpriately
                    // TODO: seperate this later
                    switch (data.events[0].postback?.data) {
                        case "pre-register":
                            lMessage.replyPreRegisterForm(String(data.events[0].replyToken), lineUser, oaToken)
                    }
                    break
                default:
                    console.info(`web hook event type not supported: ${event}`)
                    break;
            }
            res.status(200).send('HookReceive')
        } else {
            res.status(400).send('H@@krec3ive')
        }
    } catch (error) {
        next(error)
        return
    }
}

export default {
    lineHook
}