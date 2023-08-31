'use client'
import { Button, ConfigProvider } from 'antd'

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <Button className="bg-[#00B96B]"
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
