import { Request, Response, NextFunction } from "express"

const reqLogger = (req: Request, res: Response, next: NextFunction) => {
    console.info(`${req.method}: ${req.headers.host}${req.url}`)
    next()
}

export default reqLogger