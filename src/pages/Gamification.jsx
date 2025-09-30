import React, { useEffect, useState } from 'react'
import {
  getGamifications,
  searchGamifications,
  createGamification,
  updateGamification,
  deleteGamification,
  extractSkills,
  getMetrics,
  getLevels,
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

export default function Gamification() {
  const [gamifications, setGamifications] = useState([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    code: '',
    value: '',
    points: '',
    description: '',
    metricCode: '',
    levelCode: '',
    status: ''
  })
  const [metrics, setMetrics] = useState([])
  const [levels, setLevels] = useState([])

  // pagination state
  const [page, setPage] = useState(0) // backend usually starts from 0
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)

  // 🔍 search form state
  const [searchForm, setSearchForm] = useState({
    code: '',
    metricCode: '',
    levelCode: '',
    status: ''
  })

  const statusLabels = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    DELETED: "Deleted"
  };

  useEffect(() => {
    load()
    getMetrics().then(r => setMetrics(r.data || []))
    getLevels().then(r => setLevels(r.data || []))
  }, [])

  const load = () => handleSearch()

  // 🔍 search handler
  const handleSearch = async () => {
    const params = new URLSearchParams({
      code: searchForm.code || '',
      metricCode: searchForm.metricCode || '',
      levelCode: searchForm.levelCode || '',
      status: searchForm.status || '',
      page,
      size
    })

    const res = await searchGamifications(params)
    if (res.status == 200) {
      const data = await res.data
      setGamifications(data.content || [])
      setTotalPages(data.totalPages || 0)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0]; // take only yyyy-MM-dd part
  };

  const openNew = () => {
    setEditing(null)
    setForm({
      code: '',
      value: '',
      points: '',
      description: '',
      metricCode: '',
      levelCode: '',
      status: ''
    })
    setOpen(true)
  }

  const openEdit = t => {
    setEditing(t)
    setForm({
      metricCode: t.metricCode || '',
      levelCode: t.levelCode || '',
      code: t.code || '',
      value: t.value || '',
      points: t.points || '',
      description: t.description || '',
      status: t.status || ''
    })
    setOpen(true)
  }

  const save = async () => {
    if (editing) {
      await updateGamification(editing.id, form)
    } else {
      await createGamification(form)
    }
    setOpen(false)
    load()
  }

  const remove = async id => {
    if (confirm('Delete?')) {
      await deleteGamification(id)
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
    handleSearch()
  }
  const prevPage = () => {
    if (page > 0) setPage(page - 1)
    handleSearch()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Gamification</h2>
        <button onClick={openNew} className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
           <PlusIcon className="w-5 h-5" />
           <span>New</span>
        </button>
      </div>

      {/* 🔍 Search Controls */}
      <div className="flex gap-2 mb-4 items-center">
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
          value={searchForm.metricCode}
          onChange={e => setSearchForm({ ...searchForm, metricCode: e.target.value })}
        >
          <option value="">All Metrics</option>
          {metrics.map(l => (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
        </select>

        <input
          placeholder="Code"
          className="input w-40"
          value={searchForm.code}
          onChange={e => setSearchForm({ ...searchForm, code: e.target.value })}
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
              <th>Description</th>
              <th>Value</th>
              <th>Points</th>
              <th>Level</th>
              <th>Metric</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gamifications.map(t => (
              <tr key={t.id}>
                <td>{t.code}</td>
                <td>{t.description}</td>
                <td>{t.value}</td>
                <td>{t.points}</td>
                <td>{t.levelName}</td>
                <td>{t.metricName}</td>
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
            {metrics.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">No metrics found</td>
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
          title={editing ? 'Edit Gamification' : 'New Gamification'}
          onClose={() => setOpen(false)}
        >
          {/* existing modal form remains unchanged */}
          <div className="space-y-3">
              {/* GamificationCategory dropdown */}
              <div>
                <select
                  className="input"
                  value={form.levelCode}
                  onChange={e =>
                    setForm({ ...form, levelCode: e.target.value })
                  }
                >
                  <option value="">Select Levels</option>
                  {levels.map(l => (
                    <option key={l.code} value={l.code}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  className="input"
                  value={form.metricCode}
                  onChange={e =>
                    setForm({ ...form, metricCode: e.target.value })
                  }
                >
                  <option value="">Select Metrics</option>
                  {metrics.map(l => (
                    <option key={l.code} value={l.code}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  className="input"
                  placeholder="Description"
                  value={form.description}
                  onChange={e =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div>
                  <input
                    className="input"
                    placeholder="Value"
                    value={form.value}
                    onChange={e =>
                      setForm({ ...form, value: e.target.value })
                    }
                  />
              </div>
              <div>
                  <input
                    className="input"
                    placeholder="Points"
                    value={form.points}
                    onChange={e =>
                      setForm({ ...form, points: e.target.value })
                    }
                  />
              </div>
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
              <div className="flex justify-end">
                <button
                    onClick={save}
                    className="p-2 bg-blue-600 hover:bg-blue-400 text-blue-1200"
                    title="Save Gamification Data"
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
