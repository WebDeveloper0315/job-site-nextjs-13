'use client'
import { Button, ConfigProvider } from 'antd'

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <Button
        type='primary'
        onClick={() =>{
          alert('Hello')
        }}
      >
        Antd's Button
      </Button>

    </div>
  )
}
