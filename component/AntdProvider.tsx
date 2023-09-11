'use client'
import React from 'react'
import { ConfigProvider } from 'antd'
import { usePathname } from 'next/navigation'

export default function AntdProvider({ children }: { children: React.ReactNode }) {
    const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true)
    const menuitems = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-7-line"
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "ri-shield-user-line"
        },
        {
            name: "Application",
            path: "/application",
            icon: "ri-file-list-2-line"
        },
        {
            name: "Settings",
            path: "/settings",
            icon: "ri-settings-2-line"
        },
        {
            name: "Saved",
            path: "/saved",
            icon: "ri-save-line"
        }
    ]
    
    const pathname = usePathname()
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

            {/* if route is login or register, don't show layout */}
            {pathname === '/login' || pathname === '/register' ? (
                <div>
                    {children}
                </div>
            ):(
                <div className='layout-parent'>
                    <div className="sidebar">
                        <div className='logo'>
                            {isSidebarExpanded && <h1>Job Panel</h1>}
                            {!isSidebarExpanded && <i className="ri-menu-2-line"
                                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                            ></i>}
                            {isSidebarExpanded && <i className="ri-close-line"
                                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                            ></i>}
                        </div>

                        <div className='menu-items'>
                            {menuitems.map((item, index) => {
                                const isActive = pathname === item.path
                                return (
                                    <div className={`menu-item ${isActive ? "active-menu-item" : ""}`}
                                    style={{justifyContent: isSidebarExpanded ? "flex-start": "center",}}
                                    >
                                        <i className={item.icon}>
                                        </i>
                                        <span>{isSidebarExpanded && item.name}</span>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='user-info'>
                            {isSidebarExpanded && (
                            <div className='flex flex-col'>
                                <span>User Name</span>
                                <span>User Email</span>
                            </div>
                            )}
                            <i className="ri-logout-box-r-line"></i>
                        </div>
                    </div>
                    <div className="body">
                        {children}
                    </div>
                </div>
            )}
            {/* {children} */}
        </ConfigProvider>

    )
}