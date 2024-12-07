import React from 'react'

export const User = (props) => {
  return (
    <div className="flex items-center mb-4 cursor-pointer hover:bg-[#3079ae] p-2 rounded-md">
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
        <img src="https://placehold.co/200x/ffc2e2/ffdbdb.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt='img' className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex-1">
        <h2 className="text-lg justify-self-start font-semibold text-white">{props.name}</h2>
        <p className="text-white  justify-self-start text-[16px]">{props.last ? props.last : "Media received"}</p>
      </div>
    </div>
  )
}
