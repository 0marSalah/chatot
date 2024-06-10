import mongoose from 'mongoose'
import { DB_URL } from '../config'

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL)
        console.log('Database connection established')
    } catch (error) {
        console.error('Failed to connect to the database', error)
        process.exit(1) // Exit the process with a failure code
    }
}

export default connectDB
