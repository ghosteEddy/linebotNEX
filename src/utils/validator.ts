import { createHmac } from "crypto";
import { Request } from "express";

const verifyLineWebhookSignature = async (req: Request) => {
    let channelSecret: string
    const body = JSON.stringify(req.body)
    if (process.env.NODE_ENV == "development") {
        channelSecret = String(process.env.MESSAGING_SECRET_KEY)
    } else {
        channelSecret = '1234'
        // todo get client from database
    }
    const hash = createHmac("SHA256", channelSecret)
        .update(body)
        .digest("base64")

    const reqSignature = req.headers["x-line-signature"]
    if (hash === reqSignature) {
        return true
    } else {
        return false
    }
}

export default { verifyLineWebhookSignature }