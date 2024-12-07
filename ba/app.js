const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const fs = require("fs")
const path = require("path")
const cors = require('cors')
const multer = require('multer')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

console.log("Server is running...")

const users = [
    { username: "yazan", number: 1 },
    { username: "mohammad", number: 2 },
    { username: "ayat", number: 3 }
]

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

const userFile = path.join(__dirname, 'messages.json')

const uploadDir = path.join(__dirname, 'uploads')
app.use('/uploads', express.static(uploadDir))

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
})

const upload = multer({ storage })

app.post('/api/data', upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'image', maxCount: 1 }]), (req, res) => {
    const files = req.files
    let imagePath = ''

    if (files.image && files.image.length > 0) {
        imagePath = `http://localhost:4000/uploads/${path.basename(files.image[0].path)}`
    }

    return res.status(200).json({ imageUrl: imagePath })
})

const readFrom = () => {
    try {
        const data = fs.readFileSync(userFile)
        return JSON.parse(data)
    } catch (error) {
        console.error("Error reading file:", error)
        return []
    }
}

const writeFrom = (data) => {
    fs.writeFileSync(userFile, JSON.stringify(data, null, 2), (error) => {
        if (error) {
            console.error("Error writing to file:", error)
        }
    })
}

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)

    socket.on('message', (message) => {
        console.log("Text message received:", message)
        const exchange = readFrom()
        exchange.push(message)
        writeFrom(exchange)
        io.emit('message', exchange)
    })

    socket.on('audio-message', (audioMessage) => {
        console.log("Audio message received:", audioMessage)
        const exchange = readFrom()
        exchange.push(audioMessage)
        writeFrom(exchange)
        io.emit('message', exchange)
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id)
    })
})

app.post("/login", async (req, res) => {
    const { username, number } = req.body
    const userExists = users.find((user) => (user.number == number) && (user.username == username))
    
    if (!userExists) {
        return res.status(400).json({ message: "User does not exist" })
    }
    
    const exchange = readFrom()
    res.json({
        users: users.filter((e) => e.username !== username),
        user: users.find((user) => (user.number == number) && (user.username == username)),
        chat: exchange
    })
})

server.listen(4000, () => {
    console.log('Server is listening on port 4000')
})