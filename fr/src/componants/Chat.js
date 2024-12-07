// App.js
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io("http://localhost:4000")

function Chat() {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    useEffect(() => {

        socket.on('message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage])
        })


        return () => socket.off('message')
    }, [])

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('message', message)
            setMessage('')
        }
    }


    return (
        <div>
            <h1>Simple Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default Chat