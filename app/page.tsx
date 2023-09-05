'use client'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {message} from 'antd'

export default function Home() {
  const [user, setUser] = useState<any>(null)

  const getUser = async () => {
    try {
      const response = await axios.get('/api/users/currentuser')
      //console.log(response.data)
      setUser(response.data.data)
    } catch (error: any) {
      message.error(error.response.data.message || error.message)
    }
  }
  
  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      <h1>Hello</h1>
      <h1>
        Current User Name: {user && user.name}
      </h1>
      <h1>
        Cuurent User's email: {user && user.email}
      </h1>
    </div>
  )
}
