import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Tutors from './pages/Tutors'
import Users from './pages/Users'
import Roles from './pages/Roles'
import Levels from './pages/Levels'
import Students from './pages/Students'
import Fees from './pages/Fees'
import Gamification from './pages/Gamification'
import Test from './pages/Test'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <div>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/roles" element={<ProtectedRoute><Roles/></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users/></ProtectedRoute>} />
          <Route path="/levels" element={<ProtectedRoute><Levels/></ProtectedRoute>} />
          <Route path="/tutors" element={<ProtectedRoute><Tutors/></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute><Students/></ProtectedRoute>} />
          <Route path="/fees" element={<ProtectedRoute><Fees/></ProtectedRoute>} />
          <Route path="/gamification" element={<ProtectedRoute><Gamification/></ProtectedRoute>} />

          <Route path="/test" element={<Test/>} />
        </Routes>
      </div>
    </div>
  )
}
