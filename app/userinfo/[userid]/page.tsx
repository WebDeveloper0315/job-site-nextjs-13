'use client'
import EmployeeForm from '@/component/EmployeeForm'
import EmployeeInfo from '@/component/EmployeeInfo'
import EmployerForm from '@/component/EmployerForm'
import EmployerInfo from '@/component/EmployerInfo'
import PageTitle from '@/component/PageTitle'
import { SetLoading } from '@/redux/loadersSlice'
import { message } from 'antd'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function UserInfo() {
    const [userInfo, setUserInfo] = React.useState<any>(null)
    const { userid } = useParams()
    const dispatch = useDispatch()
    const router = useRouter()

    const fetchUserInfo = async () => {
        try {
            dispatch(SetLoading(true))
            const response = await axios.get(`/api/users/${userid}`)
            setUserInfo(response.data.data)
        } catch (error: any) {
            message.error(error.message)
        } finally {
            dispatch(SetLoading(false))
        }
    }

    React.useEffect(() => {
        fetchUserInfo()
    }, [])

    return (
        userInfo && (
            <div>
                <PageTitle
                    title={`${userInfo.userType === 'employer' ? 'Employer' : "Employee"} Info`}
                />

                {userInfo.userType === 'employer' ? <EmployerInfo employerInfo={userInfo}/> : <EmployeeInfo employeeInfo={userInfo}/>}
            </div>
        )
    )
}