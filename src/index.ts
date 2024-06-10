import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { login, register } from './controllers/auth'
import { deleteUser, getUser, updateUser } from './controllers/user'
import { PORT } from './config'
import connectDB from './utils/db'
import bodyParser from 'body-parser'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'

dotenv.config()

const app = express()
const server = http.createServer(app)

// Configure CORS for Express
app.use(
    cors({
        origin: 'http://localhost:3001', // Adjust according to your client URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    })
)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3001', // Adjust according to your client URL
        methods: ['GET', 'POST']
    }
})

connectDB()
console.log('Database connection established')

app.use(bodyParser.json())
app.use(express.json())
app.use(morgan('dev'))

// Define routes
app.route('/register').post(register)
app.route('/login').post(login)
app.route('/users/:id').get(getUser).put(updateUser).delete(deleteUser)

io.on('connection', socket => {
    console.log('A user connected')
    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
