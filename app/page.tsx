'use client'
import { SetLoading } from '@/redux/loadersSlice'
import { Col, Row, message } from 'antd'
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Divider from '@/component/Divider'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [jobs = [], setJobs] = React.useState([])
  const dispatch = useDispatch()
  const {currentUser} = useSelector((state: any) => state.users)

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

  return (
    <div>
      <Row gutter={[16, 16]} className='gap-3'>
        {jobs.map((job:any) => (
          <Col 
            span={8} 
            className='card flex flex-col gap-2 py-3 cursor-pointer'
            key={job._id}
            onClick={() => router.push(`/jobinfo/${job._id}`)}
          >
            <h1 className='text-md'>{job.title}</h1>
            <Divider/>
            <div className="flex justify-between">
              <span>Company</span>
              <span>{job.user.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Location</span>
              <span>{job.location}</span>
            </div>
            <div className="flex justify-between">
              <span>Salary</span>
              <span>{job.salaryFromRange} USD - {job.salaryToRange} USD</span>
            </div>

            <div className="flex justify-between">
              <span>Work Mode</span>
              <span>{job.workMode}</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}