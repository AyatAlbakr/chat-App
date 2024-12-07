import React from 'react'
import { User1 } from './user1'
import { User2 } from './user2'

function ChatMessages(props) {
    return (
        <div className="h-screen overflow-y-auto p-4 pb-36 bg-[#313131]">
            {props.array.map((e) => {
                if (e.from === props.user1) {
                    return <User1 message={e.message} audio={e.audioUrl} imageUrl={e.imageUrl} />
                }
                else {
                    return <User2 message={e.message} audio={e.audioUrl} imageUrl={e.imageUrl} />
                }
            })}
        </div>
    )
}

export default ChatMessages