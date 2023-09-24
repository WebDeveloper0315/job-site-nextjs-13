'use client'
import JobPostForm from "@/component/JobPostForm"
import PageTitle from "@/component/PageTitle"
import { SetLoading } from "@/redux/loadersSlice"
import { Button, Form, message } from "antd"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import React from "react"
import { useDispatch } from "react-redux"


export default function EditJob() {
    const [jobData, setJobData] = React.useState<any>(null)
    const router = useRouter()

    const {jobid} = useParams()

    const dispatch = useDispatch()

    const onFinish = async (values : any) => {
        try {
            values._id = jobid
            dispatch(SetLoading(true))
            const response = await axios.put(`/api/jobs/${jobid}`, values)
            message.success(response.data.message)
            router.push('/jobs')
        } catch(error:any) {
            message.error(error.message)
        } finally {
            dispatch(SetLoading(false))
        }

    };

    const fetchJob =async () => {
        try {
            dispatch(SetLoading(true))
            const response = await axios.get(`/api/jobs/${jobid}`)
            setJobData(response.data.data) 
        } catch (error:any) {
            message.error(error.message)
        } finally {
            dispatch(SetLoading(false))
        }
    }

    React.useEffect(() => {
        fetchJob()
    }, [])

    return (
        jobData && <div>
            <div className="flex justify-between items-center">
                <PageTitle title='Edit Job Post'/>
                <Button type="default" onClick={()=>router.back()}>
                    Back
                </Button>
            </div>

            <Form layout="vertical"
                onFinish={onFinish}
                initialValues={jobData}
            >
                <JobPostForm/>
                <div className="flex justify-end items-center gap-3 my-3">
                    
                    <Button type="default" onClick={()=>router.back()}>
                        Cancel
                    </Button>

                    <Button type="primary" htmlType="submit">
                        Update Job
                    </Button>
                </div>
            </Form>
        </div>
    )
}