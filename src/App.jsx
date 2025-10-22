import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Tutors from './pages/Tutors'
import TutorApprovals from './pages/TutorApprovals'
import Users from './pages/Users'
import Subjects from './pages/Subjects'
import Roles from './pages/Roles'
import Levels from './pages/Levels'
import Fees from './pages/Fees'
import TutorFeeStructures from './pages/TutorFeeStructures'
import Students from './pages/Students'
import MetricCategories from './pages/MetricCategories'
import Metrics from './pages/Metrics'
import Gamification from './pages/Gamification'
import DocumentCategories from './pages/DocumentCategories'
import Documents from './pages/Documents'
import TutorDocuments from './pages/TutorDocuments'
import TutorAddresses from './pages/TutorAddresses'
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
          <Route path="/fees" element={<ProtectedRoute><Fees/></ProtectedRoute>} />
          <Route path="/tutors" element={<ProtectedRoute><Tutors/></ProtectedRoute>} />
          <Route path="/tutor-fees" element={<ProtectedRoute><TutorFeeStructures/></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute><Students/></ProtectedRoute>} />
          <Route path="/fees" element={<ProtectedRoute><Fees/></ProtectedRoute>} />
          <Route path="/metric-categories" element={<ProtectedRoute><MetricCategories/></ProtectedRoute>} />
          <Route path="/metrics" element={<ProtectedRoute><Metrics/></ProtectedRoute>} />
          <Route path="/gamification" element={<ProtectedRoute><Gamification/></ProtectedRoute>} />
          <Route path="/tutor-approval" element={<ProtectedRoute><TutorApprovals/></ProtectedRoute>} />
          <Route path="/document-categories" element={<ProtectedRoute><DocumentCategories/></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute><Documents/></ProtectedRoute>} />
          <Route path="/tutor-documents" element={<ProtectedRoute><TutorDocuments/></ProtectedRoute>} />
          <Route path="/tutor-addresses" element={<ProtectedRoute><TutorAddresses/></ProtectedRoute>} />
          <Route path="/subjects" element={<ProtectedRoute><Subjects/></ProtectedRoute>} />
          <Route path="/test" element={<Test/>} />
        </Routes>
      </div>
    </div>
  )
}
