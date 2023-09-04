'use client'
import React from "react"
import { Button } from 'antd'

export default function Login() {
    return (
        <div className="flex justify-center h-screen items-center bg-primary">
            <h1>Login</h1>
            <Button
                type="primary"
                onClick={() => {
                    alert("Hello");
                }}
            >
                Primary Button
            </Button>
        </div>
    )
}
