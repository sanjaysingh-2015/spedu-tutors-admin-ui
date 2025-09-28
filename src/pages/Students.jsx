import React, { useEffect, useState } from 'react'
import { getStudents, createStudent, updateStudent, deleteStudent } from '../services/adminService'
import Modal from '../components/Modal'

export default function Students(){
  const [students, setStudents] = useState([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ fullName:'', email:'', requirements:'' })

  useEffect(()=>{ load() }, [])

  const load = ()=> getStudents().then(r=>setStudents(r.data)).catch(()=>{})

  const openNew = ()=>{ setEditing(null); setForm({ fullName:'', email:'', requirements:'' }); setOpen(true) }
  const openEdit = (s)=>{ setEditing(s); setForm({ fullName:s.fullName, email:s.email, requirements:s.requirements || '' }); setOpen(true) }

  const save = async ()=>{
    if(editing){
      await updateStudent(editing.id, form)
    }else{
      await createStudent(form)
    }
    setOpen(false); load()
  }

  const remove = async (id)=>{ if(confirm('Delete?')){ await deleteStudent(id); load() } }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Students</h2>
        <button className="btn" onClick={openNew}>New Student</button>
      </div>
      <div className="card">
        <table className="table w-full">
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr></thead>
          <tbody>
            {students.map(s=> (
              <tr key={s.id}><td>{s.id}</td><td>{s.fullName}</td><td>{s.email}</td>
                <td>
                  <button className="btn mr-2" onClick={()=>openEdit(s)}>Edit</button>
                  <button className="btn bg-red-600" onClick={()=>remove(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <Modal title={editing ? 'Edit Student' : 'New Student'} onClose={()=>setOpen(false)}>
          <div className="space-y-3">
            <div><input className="input" placeholder="Full name" value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} /></div>
            <div><input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /></div>
            <div><textarea className="input" rows={4} placeholder="Requirements" value={form.requirements} onChange={e=>setForm({...form, requirements:e.target.value})} /></div>
            <div className="flex justify-end"><button className="btn" onClick={save}>Save</button></div>
          </div>
        </Modal>
      )}
    </div>
  )
}
