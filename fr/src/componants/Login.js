import React, { useState } from 'react'
import { CiTwitter, CiFacebook } from "react-icons/ci"
import { FaInstagram } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [userName, setUserName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const send = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: userName, number: phoneNumber })
            })
            const data = await send.json()
            if (send.ok) {
                navigate("/chatArea", { state: { data: data } })
            }
        }
        catch (error) {
            console.error("Fetch error: ", error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 shadow sm:rounded-lg flex justify-center flex-1">
                <div className="flex-1 bg-blue-500 text-center hidden lg:flex flex flex-col">
                    <h1 className="text-2xl font-extrabold text-white mt-24 text-5xl">Gabbing with The World</h1>
                    <div
                        className="m-12 xl:m-16 h-full bg-contain bg-center bg-no-repeat mr-4"
                        style={{ backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')` }}
                    ></div>
                </div>
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-slate-800">
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/5962/5962463.png" className="w-32 mx-auto" alt="logo" />
                    </div>
                    <div className="mt-12 flex flex-col items-center m-8">
                        <h1 className="text-2xl xl:text-3xl font-extrabold text-white">Sign in</h1>
                        <div className="w-full flex-1 mt-8">
                            <form className="mx-auto max-w-xs">
                                <input
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="User Name"
                                />
                                <input
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="text"
                                    placeholder="Mobile Number"
                                />
                                <button
                                    onClick={handleClick}
                                    className="mt-5 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                >
                                    <span className="ml-3">Sign in</span>
                                </button>
                                {<p className="mt-2 text-red-600 text-center">{error}</p>}
                                <p className="mt-6 text-gray-600 text-center">
                                    I agree to abide by templatana's{' '}
                                    <a href="#" className="border-b border-gray-500 border-dotted">
                                        Terms of Service Privacy Policy
                                    </a>
                                </p>
                                <div className="my-12 text-center flex justify-between">
                                    <CiTwitter size={60} color="#3B82F6" />
                                    <CiFacebook size={60} color="#3B82F6" />
                                    <FaInstagram size={60} color="#3B82F6" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
