'use client'
import React from "react"
import { Button } from '@nextui-org/button'

export default function Login() {
    return (
        <div className="flex justify-center h-screen items-center bg-primary">
            <Button 
                color="primary" 
                variant="shadow" 
                onPress={() => {
                    alert("Hello")
                }}
            >
                Click me
            </Button>
        </div>
    )
}
