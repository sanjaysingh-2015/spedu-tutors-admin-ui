import React, { useState } from 'react'
import { register } from '../services/authService'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    await register({ email, password })
    nav('/login')
  }

  return (
    <div className="max-w-md mx-auto mt-12 card">
      <h3 className="text-xl font-semibold mb-4">Register</h3>
      <form onSubmit={submit}>
        <div className="mb-4">
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="btn">Register</button>
      </form>
    </div>
  )
}
