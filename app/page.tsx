'use client'
import { SetLoading } from '@/redux/loadersSlice'
import { Col, Row, message } from 'antd'
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Divider from '@/component/Divider'
import { useRouter } from 'next/navigation'
import Filters from '@/component/Filters'

export default function Home() {
  const [filters, setFilters] = React.useState({
    searchText: "",
    location: "",
  })
  const router = useRouter()
  const [jobs = [], setJobs] = React.useState([])
  const dispatch = useDispatch()
  const {currentUser} = useSelector((state: any) => state.users)

  const fetchJobs = async () => {
    try {
        dispatch(SetLoading(true))
        const response = await axios.get('/api/jobs', {params: filters})
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
      <Filters filters={filters} setFilters={setFilters} getData={fetchJobs}/>
      <Row>
        {jobs.map((job:any) => (
          <Col 
            span={8} 
            className='p-2'
            key={job._id}
            onClick={() => router.push(`/jobinfo/${job._id}`)}
          >
            <div className='card flex flex-col gap-2 py-3 p-2 cursor-pointer'>
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
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}