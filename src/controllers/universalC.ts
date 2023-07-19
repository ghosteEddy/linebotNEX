import { Request, Response, NextFunction } from 'express'
import ulogS from '../services/universalLogS'

const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (process.env.NODE_ENV == "development") {
            console.log(req.socket.remoteAddress)
            console.log(req.headers)
            console.log(req.body)
        }
        res.status(200).send("I'm healthy")
    } catch (error) {
        next(error)
    }
    next()
}

const ulog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let client = req.socket.remoteAddress
        // check env reverse proxy()
        if (req.headers["x-forwarded-for"]) { client = String(req.headers["x-forwarded-for"]) }
        if (req.body.remark == null) { req.body.remark = `remote address: ${client}\n headers: ${JSON.stringify(req.headers)}` }
        ulogS.log(req.body)
        res.status(200).send()
    } catch (error) {
        next(error)
    }
    next()
}

export default {
    healthCheck,
    ulog
}