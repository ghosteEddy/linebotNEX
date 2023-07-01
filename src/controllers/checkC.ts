import { Request, Response, NextFunction } from 'express'

const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send("I'm healthy")
    } catch (error) {
        next(error)
    }
    next()
}

export default {
    healthCheck
}