import React, { useEffect, useState } from 'react'
import {
  getUsers,
  searchUsers,
  createUser,
  updateUser,
  deleteUser,
  extractSkills,
  getRoles,
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

export default function Users() {
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [form, setForm] = useState({
    roleCode: '',
    name: '',
    email: '',
    phone: '',
    profilePicture: '',
    password: '',
    status: ''
  })
  const [roles, setRoles] = useState([])

  const statusLabels = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    DELETED: "Deleted"
  };

  // 🔍 search form state
  const [searchForm, setSearchForm] = useState({
    name: '',
    email: '',
    phone: '',
    roleCode: '',
    status: ''
  })

  useEffect(() => {
    load()
    getRoles().then(r => setRoles(r.data || []))
    getUsers().then(r => setUsers(r.data || []))
  }, [])

  const load = () =>
    getUsers().then(r => setUsers(r.data)).catch(() => {})

  // 🔍 search handler
  const handleSearch = async () => {
    const params = new URLSearchParams({
      name: searchForm.name || '',
      email: searchForm.email || '',
      phone: searchForm.phone || '',
      roleCode: searchForm.roleCode || '',
      status: searchForm.status || ''
    })
    const res = await searchUsers(params)
    if (res.ok) {
      const data = await res.json()
      setUsers(data)
    }
  }

  const openNew = () => {
    setEditing(null)
    setForm({
      roleCode: '',
      name: '',
      email: '',
      phone: '',
      profilePicture: '',
      password: '',
      status: ''
    })
    setOpen(true)
  }

  const openEdit = t => {
    setEditing(t)
    setForm({
      roleCode: t.roleCode || '',
      name: t.name || '',
      email: t.email || '',
      phone: t.phone || '',
      profilePicture: t.profilePicture || '',
      password: t.password || '',
      status: t.status || ''
    })
    setOpen(true)
  }

  const isSaveEnabled = () => {
    if (editing) {
      // In edit mode
      if (isPasswordChanged) {
        // If password is being changed → must match & not empty
        return form.password && form.password === confirmPassword;
      } else {
        // Password not touched → allow save
        return true;
      }
    } else {
      // In create mode → always require password match & not empty
      return form.password && form.password === confirmPassword;
    }
  };

  const save = async () => {
    if (editing) {
      await updateUser(editing.id, form)
    } else {
      await createUser(form)
    }
    setOpen(false)
    load()
  }

  const remove = async id => {
    if (confirm('Delete?')) {
      await deleteUser(id)
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
    setForm(f => ({ ...f, profilePicture: res }))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Users</h2>
        <button onClick={openNew} className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
           <PlusIcon className="w-5 h-5" />
           <span>New</span>
        </button>
      </div>

      {/* 🔍 Search Controls */}
      <div className="flex gap-2 mb-4 items-center">
        <input
          type="text"
          placeholder="Name"
          className="input w-40"
          value={searchForm.name}
          onChange={e => setSearchForm({ ...searchForm, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          className="input w-40"
          value={searchForm.email}
          onChange={e => setSearchForm({ ...searchForm, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="input w-40"
          value={searchForm.phone}
          onChange={e => setSearchForm({ ...searchForm, phone: e.target.value })}
        />
        <select
          className="input w-40"
          value={searchForm.roleCode}
          onChange={e => setSearchForm({ ...searchForm, roleCode: e.target.value })}
        >
          <option value="">All Roles</option>
          {roles.map(l => (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
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
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(t => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.phone}</td>
                <td>{t.roleName}</td>
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
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <Modal
          title={editing ? 'Edit User' : 'New User'}
          onClose={() => setOpen(false)}
        >
          {/* existing modal form remains unchanged */}
          <div className="space-y-3">
              {/* Level dropdown */}
              <div>
                <select
                  className="input"
                  value={form.roleCode}
                  onChange={e =>
                    setForm({ ...form, roleCode: e.target.value })
                  }
                >
                  <option value="">Select Role</option>
                  {roles.map(l => (
                    <option key={l.code} value={l.code}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>

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
              <div>
                <input
                  className="input"
                  placeholder="Email"
                  value={form.email}
                  onChange={e =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  className="input"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={e =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              </div>

              {/* Resume file upload */}
              <div>
                <input type="file" onChange={handleFileUpload} />
                {form.resumeUrl && (
                  <p className="text-sm text-green-600">
                    Uploaded: {form.profilePicture}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="Password"
                  className="input"
                  placeholder="Password"
                  value={form.password}
                  onChange={e => {
                      setForm({ ...form, password: e.target.value });
                      setIsPasswordChanged(true); // Mark that password is being updated
                    }}
                />
              </div>
              <div>
                <input
                  type="Password"
                  className="input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
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
                  disabled={!isSaveEnabled()}
                  className={`px-4 py-2 rounded text-white ${
                    !isSaveEnabled()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
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
