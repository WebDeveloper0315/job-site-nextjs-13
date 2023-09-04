'use client'
import React from "react"
import { Card, CardHeader, CardBody, CardFooter, Image, Divider, Form } from '@nextui-org/react'

export default function Login() {
    return (
        <div className="flex justify-center h-screen items-center bg-primary">
            
            <Card className = 'max-w-[400px]'>
                <CardHeader className = 'flex flex-col'>
                    <Image
                    alt="nextui logo"
                    height={100}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={100}
                    />
                    <p className = 'text-md'>Blackghost's Job site - Login</p>    
                </CardHeader>
                <Divider/>
                <CardBody>
                    
                </CardBody>
            </Card>
            
        </div>
    )
}
