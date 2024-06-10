import { Request, Response } from 'express'
import Chat, { IChat } from '../models/Chat'

export const getMessagesByRoom = async (req: Request, res: Response) => {
    const { room } = req.params
    try {
        const messages: IChat[] = await Chat.find({ room }).sort({ timestamp: 1 })
        res.json(messages)
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}
