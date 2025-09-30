import React, { useEffect, useState } from 'react'
import {
  getStudents,
  searchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  extractSkills,
  getLevels,
  getUsers,
  uploadResume
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

export default function Students() {
  const [students, setStudents] = useState([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    learningGoal: '',
    userEmail: '',
    status: ''
  })
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
    status: ''
  })

  const statusLabels = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    DELETED: "Deleted"
  };

  useEffect(() => {
    load()
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
      status: searchForm.status || '',
      page,
      size
    })
    const res = await searchStudents(params)
    if (res.status == 200) {
      const data = await res.data
      setStudents(data.content || [])
      setTotalPages(data.totalPages || 0)
    }
  }

  const openNew = () => {
    setEditing(null)
    setForm({
      firstName: '',
      middleName: '',
      lastName: '',
      learningGoal: '',
      userEmail: '',
      status: ''
    })
    setOpen(true)
  }

  const openEdit = t => {
    setEditing(t)
    setForm({
      firstName: t.firstName || '',
      middleName: t.middleName || '',
      lastName: t.lastName || '',
      learningGoal: t.learningGoal || '',
      userEmail: t.userEmail || '',
      status: t.status || ''
    })
    setOpen(true)
  }

  const save = async () => {
    if (editing) {
      await updateStudent(editing.id, form)
    } else {
      await createStudent(form)
    }
    setOpen(false)
    load()
  }

  const remove = async id => {
    if (confirm('Delete?')) {
      await deleteStudent(id)
      load()
    }
  }

  const aiExtract = async () => {
    if (!form.bio) return alert('Add bio first')
    const res = await extractSkills(form.bio)
    setForm(f => ({
      ...f,
      skills: Array.isArray(res.data)
        ? res.data.join(', ')
        : res.data || ''
    }))
  }

  const handleFileUpload = async e => {
    const file = e.target.files[0]
    if (!file) return
    const res = await uploadResume(file)
    setForm(f => ({ ...f, resumeUrl: res }))
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
        <h2 className="text-2xl font-semibold">Students</h2>
        <button onClick={openNew} className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
           <PlusIcon className="w-5 h-5" />
           <span>New</span>
        </button>
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
              <th>Learning Goal</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(t => (
              <tr key={t.id}>
                <td>{t.code}</td>
                <td>{t.firstName +' '+ t.middleName + ' ' + t.lastName}</td>
                <td>{t.userEmail}</td>
                <td>{t.learningGoal}</td>
                <td>{statusLabels[t.status] || t.status}</td>
                <td>
                  <div className="flex flex-row items-center space-x-2">
                    <button
                      onClick={() => openEdit(t)}
                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600"
                      title="Edit"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => remove(t.id)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                      title="Delete"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">No students found</td>
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


      {open && (
        <Modal
          title={editing ? 'Edit Student' : 'New Student'}
          onClose={() => setOpen(false)}
        >
          {/* existing modal form remains unchanged */}
          <div className="space-y-3">
              {/* User Email dropdown */}
              <div>
                <select
                  className="input"
                  value={form.userEmail}
                  onChange={e =>
                    setForm({ ...form, userEmail: e.target.value })
                  }
                >
                  <option value="">Select User</option>
                  {users.map(u => (
                    <option key={u.id} value={u.email}>
                      {u.email}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  className="input"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={e =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  className="input"
                  placeholder="Middle name"
                  value={form.middleName}
                  onChange={e =>
                    setForm({ ...form, middleName: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  className="input"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={e =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </div>
              <div>
                  <input
                    type="text"
                    placeholder="Learning Goal"
                    className="input w-40"
                    value={searchForm.learningGoal}
                    onChange={e => setForm({ ...form, learningGoal: e.target.value })}
                  />
              </div>
              <div>
                  <select
                    className="input w-40"
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="">Choose Status</option>
                    <option key="ACTIVE" value="ACTIVE">Active</option>
                    <option key="INACTIVE" value="INACTIVE">Inactive</option>
                    <option key="DELETED" value="DELETED">Deleted</option>
                  </select>
              </div>
              <div className="flex justify-end">
                <button
                    onClick={save}
                    className="p-2 bg-blue-600 hover:bg-blue-400 text-blue-1200"
                    title="Save Student Data"
                  >
                    <ArrowDownOnSquareIcon className="w-8 h-8" />
                </button>
              </div>
            </div>
        </Modal>
      )}
    </div>
  )
}
