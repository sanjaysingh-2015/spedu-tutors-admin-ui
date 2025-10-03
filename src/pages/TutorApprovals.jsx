import React, { useEffect, useState } from 'react'
import {
  getTutors,
  searchTutors,
  createTutor,
  updateTutor,
  deleteTutor,
  extractSkills,
  getLevels,
  getUsers,
  approveRejectTutor
} from '../services/adminService'
import Modal from '../components/Modal'

import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowDownOnSquareIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

export default function Tutors() {
  const [tutors, setTutors] = useState([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    levelCode: '',
    firstName: '',
    middleName: '',
    lastName: '',
    resumeUrl: '',
    userEmail: '',
    commissionRate: '',
    bio: '',
    skills: '',
    status: ''
  })
  const [levels, setLevels] = useState([])
  const [users, setUsers] = useState([])

  // pagination state
  const [page, setPage] = useState(0) // backend usually starts from 0
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)

  // 🔍 search form state
  const [searchForm, setSearchForm] = useState({
    code: '',
    firstName: '',
    lastName: '',
    levelCode: '',
    profileStatus: 'PENDING_APPROVAL',
    status: ''
  })

  const statusLabels = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    DELETED: "Deleted"
  };

  const profileStatusLabels = {
    INITIATE: "Initiate",
    PENDING_APPROVAL: "Pending",
    APPROVED: "Approved",
    REJECTED: "Rejected"
  };

  useEffect(() => {
    load()
    getLevels().then(r => setLevels(r.data || []))
    getUsers().then(r => setUsers(r.data || []))
  }, [])

  const load = () => handleSearch()

  // 🔍 search handler
  const handleSearch = async () => {
    const params = new URLSearchParams({
      code: searchForm.code || '',
      firstName: searchForm.firstName || '',
      middleName: searchForm.middleName || '',
      lastName: searchForm.lastName || '',
      levelCode: searchForm.levelCode || '',
      profileStatus: searchForm.profileStatus || '',
      status: searchForm.status || '',
      page,
      size
    })
    const res = await searchTutors(params)
    if (res.status == 200) {
      const data = await res.data
      setTutors(data.content || [])
      setTotalPages(data.totalPages || 0)
    }
  }

  const approveReject = async (id, status) => {
    await approveRejectTutor(id, status)
    load()
  }

  // pagination controls
  const nextPage = () => {
    if (page < totalPages - 1) setPage(page + 1)
  }
  const prevPage = () => {
    if (page > 0) setPage(page - 1)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Approve Tutors</h2>
      </div>

      {/* 🔍 Search Controls */}
      <div className="flex gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Code"
          className="input w-32"
          value={searchForm.code}
          onChange={e => setSearchForm({ ...searchForm, code: e.target.value })}
        />
        <input
          type="text"
          placeholder="First Name"
          className="input w-40"
          value={searchForm.firstName}
          onChange={e => setSearchForm({ ...searchForm, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Middle Name"
          className="input w-40"
          value={searchForm.middleName}
          onChange={e => setSearchForm({ ...searchForm, middleName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input w-40"
          value={searchForm.lastName}
          onChange={e => setSearchForm({ ...searchForm, lastName: e.target.value })}
        />
        <select
          className="input w-40"
          value={searchForm.levelCode}
          onChange={e => setSearchForm({ ...searchForm, levelCode: e.target.value })}
        >
          <option value="">All Levels</option>
          {levels.map(l => (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
        </select>
        <select
          className="input w-40"
          value={searchForm.profileStatus}
          onChange={e => setSearchForm({ ...searchForm, profileStatus: e.target.value })}
        >
          <option value="">All Profile Status</option>
          <option key="INITIATE" value="INITIATE">Initiate</option>
          <option key="PENDING_APPROVAL" value="PENDING_APPROVAL">Pending Approval</option>
          <option key="APPROVED" value="APPROVED">Approved</option>
          <option key="REJECTED" value="REJECTED">Rejected</option>
        </select>
        <select
          className="input w-40"
          value={searchForm.status}
          onChange={e => setSearchForm({ ...searchForm, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option key="ACTIVE" value="ACTIVE">Active</option>
          <option key="INACTIVE" value="INACTIVE">Inactive</option>
          <option key="DELETED" value="DELETED">Deleted</option>
        </select>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="card">
        <table className="table w-full">
          <thead className="bg-blue-100 text-blue-800  text-left">
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Email</th>
              <th>Skills</th>
              <th>Level</th>
              <th>Profile Status</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map(t => (
              <tr key={t.id}>
                <td>{t.code}</td>
                <td>{t.firstName +' '+ t.middleName + ' ' + t.lastName}</td>
                <td>{t.userEmail}</td>
                <td>{t.skills}</td>
                <td>{t.levelName}</td>
                <td>{profileStatusLabels[t.profileStatus] || t.profileStatus}</td>
                <td>{statusLabels[t.status] || t.status}</td>
                <td>
                  <div className="flex flex-row items-center space-x-2">
                    <button
                      onClick={() => approveReject(t.id, "APPROVED")}
                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600"
                      title="Approve"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => approveReject(t.id, "REJECTED")}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                      title="Reject"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {tutors.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">No tutors found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={prevPage}
            disabled={page === 0}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={page >= totalPages - 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
  )
}
