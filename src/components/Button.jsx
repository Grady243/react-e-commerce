import React from 'react'

function Button({text}) {
  return (
    <button className="px-10 py-3  font-medium text-black bg-transparent border-2 border-black cursor-pointer ">
    {text}
  </button>
  )
}

export default Button
