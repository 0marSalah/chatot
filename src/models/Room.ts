import { Document, model, Schema } from 'mongoose'

interface IRoom extends Document {
    createdAt: Date
    updatedAt: Date
    name: string
    users: string[]
    chats: string[]
}

const roomSchema = new Schema<IRoom>({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    name: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }]
})

export default model<IRoom>('Room', roomSchema)
