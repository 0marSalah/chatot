import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import joi from 'joi'
import { JWT_SECRET } from '../config'
import passToExpressError from '../utils/errorHandler'
import User from '../models/User'

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body
        const schema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().min(6).required()
        })
        const { error } = schema.validate(req.body)
        if (error) return res.status(400).json({ message: error.details[0].message })

        const isExisted = await User.findOne({
            email
        })
        if (isExisted) return res.status(400).json({ message: 'User already exists' })

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const accessToken = jwt.sign({ name, email }, JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '6d'
        })
        res.cookie('accessToken', accessToken, { httpOnly: true })

        return res.json({
            message: 'User registered',
            success: true,
            data: {
                user,
                accessToken
            }
        })
    } catch (error: any) {
        passToExpressError(error, next)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({
            email
        })
        if (!user) return res.status(400).json({ message: 'Invalid credentials' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

        const accessToken = jwt.sign({ email }, JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '6d'
        })
        res.cookie('accessToken', accessToken, { httpOnly: true })
        return res.json({
            message: 'User logged in',
            success: true,
            data: {
                user,
                accessToken
            }
        })
    } catch (error: any) {
        passToExpressError(error, next)
    }
}
