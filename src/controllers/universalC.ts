import { Request, Response, NextFunction } from 'express'
import ulogS from '../services/universalLogS'

const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send("I'm healthy")
    } catch (error) {
        next(error)
    }
    next()
}

const ulog = async (req: Request, res: Response, next: NextFunction) => {
    try {
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