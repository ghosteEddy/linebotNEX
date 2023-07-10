import { createHmac } from "crypto";
import { Request } from "express";
import db from "../services/db"

const verifyLineWebhookSignature = async (req: Request, messagingSecret: string | null = null) => {
    let channelSecret: string
    const body = JSON.stringify(req.body)
    if (process.env.NODE_ENV == "development" && messagingSecret === null) {
        channelSecret = String(process.env.MESSAGING_SECRET_KEY)
    } else {
        channelSecret = String(messagingSecret)
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

const verifyOAClient = async (req: Request) => {
    let channel
}

export default { verifyLineWebhookSignature }