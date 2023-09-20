'use client'
import PageTitle from "@/component/PageTitle"
import { SetLoading } from "@/redux/loadersSlice"
import { Button , Table, message} from "antd"
import axios from "axios"
import { useRouter } from "next/navigation"
import React from "react"
import { useDispatch } from "react-redux"
import moment from "moment"

export default function Jobs() {
    const [jobs, setJobs] = React.useState([])
    const dispatch = useDispatch()
    const router = useRouter() 

    const fetchJobs = async () => {
        try {
            dispatch(SetLoading(true))
            const response = await axios.get('/api/jobs')
            setJobs(response.data.data)
        } catch (error:any) {
            message.error(error.message)
        } finally {
            dispatch(SetLoading(false))
        }
    }

    React.useEffect(() => {
        fetchJobs()
    }, [])

    const columns = [
        {
            title: "Title",
            dataIndex: "title"
        },
        {
            title: "Posted On",
            dataIndex: "createdAt",
            render : (text : any) => moment(text).format('DD-MM-YYYY HH:mm:ss')
        },
        {
            title: "Location",
            dataIndex: "location"
        },
        {
            title: "Job Type",
            dataIndex: "jobType"
        },
        {
            title: "Work Mode",
            dataIndex: "workMode"
        },
        {
            title: "Experience",
            dataIndex: "experience"
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text: any, record: any) => (
                <div className="flex gap-3">
                    <i className="ri-delete-bin-line"></i>
                    <i 
                        className="ri-pencil-line"
                        onClick={() => router.push(`/jobs/edit/${record._id}`)}
                    ></i>
                </div>
            )
        },
    ]

    return (
        <div>
            <div className="flex justify-between items-center">
                <PageTitle title='Jobs'/>
                <Button type="primary" onClick={()=>router.push('/jobs/new')}>
                    New Job
                </Button>
            </div>

            <div className="my-2">
                <Table columns={columns} dataSource={jobs}/>
            </div>
        </div>
    )
}