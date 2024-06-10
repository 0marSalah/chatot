import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import passToExpressError from '../utils/errorHandler'
import User from '../models/User'

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        if (typeof id !== 'string') return res.status(400).json({ message: 'Invalid id' })

        const user = await User.findById(id)
        return res.json({
            message: 'User found',
            success: true,
            data: {
                user
            }
        })
    } catch (err: any) {
        passToExpressError(err, next)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { name } = req.body
    if (typeof name !== 'string') {
        return res.status(400).json({ message: 'Invalid name' })
    }

    try {
        const user = await User.findByIdAndUpdate(
            {
                _id: id
            },
            {
                name
            },
            {
                new: true
            }
        )
        return res.json({
            message: 'User updated',
            success: true,
            data: {
                user
            }
        })
    } catch (error: any) {
        passToExpressError(error, next)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id)
        return res.json({
            message: 'User deleted',
            success: true,
            data: {
                user
            }
        })
    } catch (error: any) {
        passToExpressError(error, next)
    }
}
