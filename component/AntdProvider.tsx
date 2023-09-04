'use client'
import React from 'react'
import { ConfigProvider } from 'antd'

export default function AntdProvider({ children }: { children: React.ReactNode }) {
    return (

        <ConfigProvider
            theme={{
                token: {
                    // Seed Token
                    colorPrimary: '#213555',
                    borderRadius: 2,

                    // Alias Token
                    colorBgContainer: '#f6ffed',
                },
            }}
        >
            {children}
        </ConfigProvider>

    )
}