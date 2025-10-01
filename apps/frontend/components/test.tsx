"use client"
import axios from 'axios'
import React from 'react'

const Test = () => {
  async function handleClick(){
    const response = await axios.get("http://localhost:3000/api/proxy/v1/test/loggerAPI")
    console.log(response.data)
  }
    return (
    <div>
        <button onClick={handleClick}>
            Send request
        </button>
    </div>
  )
}

export default Test