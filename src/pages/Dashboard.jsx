import React, { useEffect, useState } from 'react'
import { getDashboard } from '../services/adminService'

export default function Dashboard(){
  const [data, setData] = useState(null)
  useEffect(()=>{ getDashboard().then(r=>setData(r.data)).catch(()=>{}) }, [])
  if(!data) return <div className="card">Loading dashboard...</div>
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">Total Tutors: <b>{data.totalTutors}</b></div>
        <div className="card">Total Students: <b>{data.totalStudents}</b></div>
        <div className="card">Total Classes: <b>{data.totalClasses}</b></div>
        <div className="card">Total Revenue: <b>{data.totalRevenue}</b></div>
      </div>
    </div>
  )
}
