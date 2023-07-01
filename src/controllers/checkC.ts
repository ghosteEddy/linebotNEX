import { Request, Response, NextFunction } from 'express'

const healthCheck = async (req, res: Response, next) => {
    res.status(200).send("I'm healthy")
}

export default {
    healthCheck
}