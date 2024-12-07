import React, { useState } from 'react'
import ChatArea from './chatArea'
import Nav from './nav'
import { useLocation } from 'react-router-dom'

function Main() {
    const location = useLocation()
    const [reciever, setReciever] = useState("")
    const { chat } = location.state.data?location.state.data:[]
    const [array, setArray] = useState([])

    return (
        <div className='flex h-screen overflow-hidden'>
            <Nav function={setReciever} chat={chat} array={location.state.data} />
            <ChatArea reciever={reciever} function={setArray} chat={chat} array={location.state.data} />
        </div>
    )
}

export default Main