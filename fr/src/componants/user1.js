import React from 'react'

export const User1 = (props) => {
  return (
    <div className="flex justify-end mb-4 cursor-pointer">
      <div className="flex max-w-96 bg-[#3079ae] text-white rounded-[20px] p-3 gap-3">
        <p>{props.message}</p>
        {props.audio && <audio controls src={props.audio} className="mt-2" />}
        {props.imageUrl && (
          <img
            src={props.imageUrl}
            alt="Uploaded"
            style={{ maxWidth: '200px', borderRadius: '10px', marginLeft: '10px' }}
          />
        )}
      </div>
      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
      </div>
    </div>
  )
}
