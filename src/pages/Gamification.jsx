import React, { useEffect, useState } from 'react'
import { getGamification } from '../services/adminService'

export default function Gamification(){
  const [cfg, setCfg] = useState([])
  useEffect(()=>{ getGamification().then(r=>setCfg(r.data)).catch(()=>{}) }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gamification Config</h2>
      <div className="card">
        {cfg.map(c=> (
          <div key={c.id} className="p-3 border-b">{c.metric} — {c.points} points</div>
        ))}
      </div>
    </div>
  )
}
