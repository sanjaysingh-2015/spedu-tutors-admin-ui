import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Test(){
  const [res, setRes] = useState(null)
  useEffect(()=>{
    api.get('/test').then(r=>setRes(r.data)).catch(e=>setRes({ error: e.message }))
  }, [])
  return <div className="card">{JSON.stringify(res)}</div>
}
