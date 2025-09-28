import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const nav = useNavigate()

  const submit = async (e) =>{
    e.preventDefault()
    try{
      await login(email, password)
      nav('/dashboard')
    }catch(err){
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  const commonBtn =
    "flex items-center justify-center space-x-2 px-3 py-2 rounded-md font-semibold transition-colors";

  return (
    <div className="max-w-md mx-auto mt-12 card">
      <h3 className="text-xl font-semibold mb-4">Admin Login</h3>
      <form onSubmit={submit}>
        <div className="mb-4">
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button className={`${commonBtn} text-blue-600 hover:text-blue-800`}>
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Login</span>
        </button>
      </form>
    </div>
  )
}
