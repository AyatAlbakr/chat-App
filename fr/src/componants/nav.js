import React from 'react'
import Users from './users';
import { useNavigate } from 'react-router-dom';

function Nav(props) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/")
    }
    const chat = props.chat
    const reciverChanger = props.function
    return (
        <>
            <div className="w-1/4 bg-[#415c70] border-neutral-600 border-r-2 border-solid">
                <header className="p-4 border-b border-none flex justify-between items-center bg-[#3079ae] flex flex-coltext-white">
                    <h1 className="text-2xl font-semibold text-white">Gabby</h1>
                    <div className="relative">
                        <button id="menuButton" className="focus:outline-none">
                            <h2 className="text-2xl text-gray-100 hover:text-blue-300 transition duration-100 ease-in font-semibold"><button onClick={handleClick}> Log out</button></h2>
                        </button>
                    </div>
                </header>
                <Users chat={chat} function={reciverChanger} array={props.array} />
            </div>
        </>
    )
}

export default Nav