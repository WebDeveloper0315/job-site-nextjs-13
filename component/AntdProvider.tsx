'use client'
import React, { useEffect, useState } from 'react'
import { ConfigProvider, message } from 'antd'
import { usePathname } from 'next/navigation'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { SetCurrentUser } from '@/redux/usersSlice'
import Loader from './Loader';
import { SetLoading } from '@/redux/loadersSlice'
import { useRouter } from 'next/navigation'


export default function AntdProvider({ children }: { children: React.ReactNode }) {
    const {currentUser} = useSelector((state:any) => state.users)
    const { loading } = useSelector((state: any) => state.loaders)
    const dispatch = useDispatch()
    const router = useRouter()
    const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true)
    const [menuItems, setMenuItems ] = useState([
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
    ])
    
    const pathname = usePathname()

    const getCurrentUser =async () => {
        try {
            dispatch(SetLoading(true))
            const response = await axios.get("api/users/currentuser")
            const isEmployer = response.data.data.userType === 'employer'
            dispatch(SetCurrentUser(response.data.data))

            if(isEmployer) {
                const tempMenuItems = menuItems
                tempMenuItems[2].name = 'Posted Jobs'
                tempMenuItems[2].path = '/jobs'
                setMenuItems(tempMenuItems)
            }
            
        } catch (error : any) {
            message.error(error.response.data.message || "Error during getting the current user")
        } finally {
            dispatch(SetLoading(false))
        }
    }

    useEffect(() => {
        if(pathname !== '/login' && pathname !== '/register' && !currentUser){
            getCurrentUser()
        }
        
    }, [pathname])

    const onLogout = async () => {
        try {
            dispatch(SetLoading(true))
            await axios.post('api/users/logout')
            message.success("Logout Successfully.")
            dispatch(SetCurrentUser(null))
            router.push('/login')
        } catch (error: any) {
            message.error(error.response.data.message || 'Error during logout')
        } finally {
            dispatch(SetLoading(false))
        }
    }
    
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

            {loading && <Loader/>}

            {/* if route is login or register, don't show layout */}
            {pathname === '/login' || pathname === '/register' ? (
                <div>
                    {children}
                </div>
            ):(
                currentUser && (
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
                            {menuItems.map((item, index) => {
                                const isActive = pathname === item.path
                                return (
                                    <div className={`menu-item ${isActive ? "active-menu-item" : ""}`}
                                    style={{justifyContent: isSidebarExpanded ? "flex-start": "center",}}
                                    key={index}
                                    onClick={() => router.push(item.path)}
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
                                <span>{currentUser?.name}</span>
                                <span>{currentUser?.email}</span>
                            </div>
                            )}
                            <i className="ri-logout-box-r-line" onClick={onLogout}></i>
                        </div> 
                    </div>
                    <div className="body">
                        {children}
                    </div>
                </div>
                )
            )}
            {/* {children} */}
        </ConfigProvider>

    )
}