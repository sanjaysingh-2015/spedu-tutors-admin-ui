import React, { useEffect, useState } from 'react'
import {
  getRoles,
  searchRoles,
  createRole,
  updateRole,
  deleteRole,
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
} from "@heroicons/react/24/outline";

export default function Roles() {
  const [tutors, setRoles] = useState([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    code: '',
    name: '',
    status: ''
  })
  const [levels, setLevels] = useState([])
  const [users, setUsers] = useState([])

  // 🔍 search form state
  const [searchForm, setSearchForm] = useState({
    code: '',
    name: '',
    status: ''
  })

  const statusLabels = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    DELETED: "Deleted"
  };

  useEffect(() => {
    load()
  }, [])


  const load = () =>
      getRoles().then(r => setRoles(r.data)).catch(() => {})
  // 🔍 search handler
  const handleSearch = async () => {
    const params = new URLSearchParams({
      code: searchForm.code || '',
      name: searchForm.name || '',
      status: searchForm.status || ''
    })
    const res = await searchRoles(params)
    if (res.ok) {
      const data = await res.json()
      setRoles(data)
    }
  }

  const openNew = () => {
    setEditing(null)
    setForm({
      code: '',
      name: '',
      status: ''
    })
    setOpen(true)
  }

  const openEdit = t => {
    setEditing(t)
    setForm({
      code: t.code || '',
      name: t.name || '',
      status: t.status || ''
    })
    setOpen(true)
  }

  const save = async () => {
    if (editing) {
      await updateRole(editing.id, form)
    } else {
      await createRole(form)
    }
    setOpen(false)
    load()
  }

  const remove = async id => {
    if (confirm('Delete?')) {
      await deleteRole(id)
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


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Roles</h2>
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
          value={searchForm.name}
          onChange={e => setSearchForm({ ...searchForm, name: e.target.value })}
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map(t => (
              <tr key={t.id}>
                <td>{t.code}</td>
                <td>{t.name}</td>
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
            {tutors.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">No tutors found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <Modal
          title={editing ? 'Edit Role' : 'New Role'}
          onClose={() => setOpen(false)}
        >
          {/* existing modal form remains unchanged */}
          <div className="space-y-3">
              {/* Level dropdown */}
              <div>
                <input
                  className="input"
                  placeholder="Name"
                  value={form.name}
                  onChange={e =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                    onClick={save}
                    className="p-2 bg-blue-600 hover:bg-blue-400 text-blue-1200"
                    title="Save Role Data"
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
