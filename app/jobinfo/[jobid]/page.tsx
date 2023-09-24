'use client'
import Divider from "@/component/Divider"
import PageTitle from "@/component/PageTitle"
import { SetLoading } from "@/redux/loadersSlice"
import { Button, Col, Row, message } from "antd"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import React from "react"
import { useDispatch, useSelector } from "react-redux"

export default function JobInfo() {

    const {currentUser} = useSelector((state:any) => state.users)

    const [jobData, setJobData] = React.useState<any>(null)
    const [applications = [], setApplications] = React.useState<any[]>([])
    const router = useRouter()

    const {jobid} = useParams()

    const dispatch = useDispatch()

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

    const fetchApplications =async () => {
        try {
            dispatch(SetLoading(true))
            const response = await axios.get(`/api/applications?job=${jobid}&user=${currentUser._id}`)
            setApplications(response.data.data) 
        } catch (error:any) {
            message.error(error.message)
        } finally {
            dispatch(SetLoading(false))
        }
    }

    React.useEffect(() => {
        fetchJob()
        fetchApplications()
    }, [])

    const onApply = async () => {
        try {
            dispatch(SetLoading(true))
            const response = await axios.post(`/api/applications`,{
                job: jobData._id,
                user: currentUser._id,
                status: 'pending',
            })
            message.success(response.data.message)
        } catch (error: any) {
            message.error(error.message)
        } finally {
            dispatch(SetLoading(false))
        }
    }

    return (
        jobData && (<div>
            <PageTitle title={jobData.title}/>

            <Row gutter={[16,16]} className="gap-3">
                <Col span={12} className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <span>Company</span>
                        <span>{jobData.user.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Location</span>
                        <span>{jobData.location}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Salary</span>
                        <span>{jobData.salaryFromRange} USD - {jobData.salaryToRange} USD</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Work Mode</span>
                        <span>{jobData.workMode}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Job Type</span>
                        <span>{jobData.jobType}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Experience Required</span>
                        <span>{jobData.experience} Year</span>
                    </div>

                    
                </Col>

                <Col span={24}
                    className="flex flex-col gap-2"
                >
                    <h1 className="text-md">Job Description</h1>
                    <Divider/>
                    <span>{jobData.description}</span>
                    {applications.length >0 && (
                        <span className="my-3 info p-3">
                            You have already applied for this job. Please wait for the employer to respond
                        </span>
                    )}

                    <div className="flex justify-end gap-3">
                        <Button type="default" onClick={()=>router.back()}>
                            Cancel
                        </Button>
                        <Button type="primary" onClick={onApply}
                            disabled={(currentUser.userType === 'employer') || (applications.length > 0)}
                        >
                            Apply
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
        )
    )
}