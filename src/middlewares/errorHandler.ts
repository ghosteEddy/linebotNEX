import { Request, Response, NextFunction } from 'express'

const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV == 'development') {
        console.error(err)
        res.status(400).send(err.message)
    } else {
        res.status(400).send('Something Wrong')
    }
}

export default errorHandler