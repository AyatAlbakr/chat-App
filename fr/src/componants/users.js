import React, { useState, useEffect } from 'react'
import { User } from './User'
import io from 'socket.io-client'

function Users(props) {
    const [array, setArray] = useState(props.array.users)
    const [messages, setMessages] = useState(props.chat)
    const socket = io("http://localhost:4000")
    const changer = props.function

    const handleClick = (e) => {
        changer(e)
    }

    useEffect(() => {
        socket.on('message', (newArray) => {
            setMessages(newArray)
        })
        return () => socket.off('message')
    }, [])

    return (
        <>
            <div className="overflow-y-auto h-screen flex flex-col p-3 mb-9 pb-20">
                {array.map((z) => {
                    const chat = messages.filter((e) => (e.from === z.username && e.to === props.array.user.username) || (e.to === z.username && e.from === props.array.user.username))
                    return <button onClick={() => handleClick(z.username)}><User name={z.username} last={chat[chat.length - 1].message} /></button>
                })}
            </div>
        </>
    )
}

export default Users