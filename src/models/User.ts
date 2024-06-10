import { Schema, model, Document } from 'mongoose'

interface IUser extends Document {
    createdAt: Date
    updatedAt: Date
    name: string
    email: string
    password: string
    rooms: string[]
    chats: string[]
}

const userSchema = new Schema<IUser>({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
    chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }]
})

export default model<IUser>('User', userSchema)
