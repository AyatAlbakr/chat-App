import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import ChatMessages from './chatMessages'
import EmojiPicker from 'emoji-picker-react'
import { FaSmile, FaArrowRight, FaMicrophone } from 'react-icons/fa'
import { PaperClipIcon } from '@heroicons/react/24/outline';

const socket = io("http://localhost:4000")

function ChatArea(props) {
    const [talk, setTalk] = useState("")
    const [array, setArray] = useState(props.chat)
    const [showPicker, setShowPicker] = useState(false)
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const [isRecording, setIsRecording] = useState(false)
    const [image, setImage] = useState(null);

    useEffect(() => {
        socket.on('message', (newArray) => {
            setArray(newArray)
        })
        return () => socket.off('message')
    }, [])

    const handleChange = (e) => {
        setTalk(e.target.value)
    }

    const handleEmojiClick = (emojiData) => {
        setTalk((prev) => prev + emojiData.emoji)
        setShowPicker(false)
    }

    const handleSend = async (e) => {
        e.preventDefault()
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            const response = await fetch("http://localhost:4000/api/data", {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.imageUrl) {
                socket.emit("message", {
                    from: props.array.user.username,
                    to: props.reciever,
                    message: talk,
                    imageUrl: data.imageUrl
                });
                setImage(null);
                setTalk('');
            }
        }
        else if (talk.trim()) {
            socket.emit("message", { from: props.array.user.username, to: props.reciever, message: talk })
            setTalk('')
        }
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleKeyDownSend = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleSend(e)
        }
    }

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        setMediaRecorder(recorder)
        recorder.ondataavailable = (event) => {
            const audioBlob = event.data
            const audioUrl = URL.createObjectURL(audioBlob)
            socket.emit("audio-message", {
                from: props.array.user.username,
                to: props.reciever,
                audioUrl
            })
        }
        recorder.start()
        setIsRecording(true)
    }

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop()
            setIsRecording(false)
        }
    }

    return (
        <>
            <div className="flex-1">
                <header className="bg-[#313131] p-4 text-gray-700">
                    <div className="flex items-center cursor-pointer rounded-md">
                        <div className="w-8 h-8 bg-gray-300 rounded-full mr-3">
                            <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-[11px] font-semibold text-white">{props.reciever ? props.reciever : "No receiver picked"}</h2>
                        </div>
                    </div>
                </header>
                <ChatMessages
                    array={array.filter((e) => (e.from === props.array.user.username && e.to === props.reciever) || (e.from === props.reciever && e.to === props.array.user.username))}
                    user1={props.array.user.username}
                    user2={props.reciever}
                />
                <footer className="bg-[#415c70] border-t border-none p-4 absolute bottom-0 w-3/4">
                    <div className="flex items-center br-r-200">
                        <input type="text" onKeyDown={handleKeyDownSend} onChange={handleChange} value={talk} placeholder="Type a message..." className="w-full pt-2 pb-2 pl-6 rounded-[20px] border border-gray-400 focus:outline-none focus:border-blue-500" />
                        {/* <button type="button" className="absolute inset-y- right-20 flex items-center px-14" onClick={() => setShowPicker(!showPicker)}> */}
                        <button type="button" className="absolute inset-y right-60" onClick={() => setShowPicker(!showPicker)}>
                            <FaSmile className="text-[#3079ae] text-2xl" />
                        </button>
                        {showPicker && (
                            <div className="absolute right-0 top-[-450px]">
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}
                        <input type="file" onChange={handleImageChange} className="hidden" id="fileInput" />
                        <label htmlFor="fileInput" className="cursor-pointer ml-2 bg-[#3079ae] text-white px-4 py-2 rounded-[20px] flex items-center">
                            <PaperClipIcon className="w-5 h-5 mr-1" />
                            <span>Attach</span>
                        </label>
                        <button
                            onMouseDown={startRecording}
                            onMouseUp={stopRecording}
                            className="bg-[#3079ae] text-white p-2 rounded-full ml-2"
                        >
                            <FaMicrophone />
                        </button>
                        <button onClick={handleSend} className="bg-[#3079ae] text-white px-4 py-2 rounded-[20px] ml-2"><FaArrowRight /></button>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default ChatArea