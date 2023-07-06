import { Request, Response, NextFunction } from "express"

const resLogger = (req: Request, res: Response, next: NextFunction) => {
    if (res.statusCode !== 200) {
        console.info(`${res.statusCode}`)
    }
    next()
}

export default resLogger