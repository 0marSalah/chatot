import { NextFunction, Request, Response } from 'express'

export default function passToExpressError(err: { statusCode?: number; message: string }, next: NextFunction) {
    console.log(err.message)
    if (!err.statusCode) {
        err.statusCode = 500
        err.message = 'Could not process request, check inputs and try agian.'
        console.log(err.message)
    }
    next(err)
}
