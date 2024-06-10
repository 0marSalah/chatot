import { Schema, Document, model } from 'mongoose'

export interface IChat extends Document {
    createdAt: Date
    updatedAt: Date
    message: string
    sender: string
    receiver: string
}

const chatSchema = new Schema<IChat>({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    message: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true }
})

export default model<IChat>('Chat', chatSchema)
