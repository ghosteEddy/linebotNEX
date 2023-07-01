import { Request, Response, NextFunction } from "express"

const resLogger = (req: Request, res: Response, next: NextFunction) => {
    console.info(`${res.statusCode}`)
    next()
}

export default resLogger