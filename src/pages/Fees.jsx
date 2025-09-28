import React, { useEffect, useState } from 'react'
import { getFees, createFee, updateFee, deleteFee } from '../services/adminService'
import Modal from '../components/Modal'

export default function Fees(){
  const [fees, setFees] = useState([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ tutorId:'', commissionPercent:10 })

  useEffect(()=>{ load() }, [])

  const load = ()=> getFees().then(r=>setFees(r.data)).catch(()=>{})

  const openNew = ()=>{ setEditing(null); setForm({ tutorId:'', commissionPercent:10 }); setOpen(true) }
  const openEdit = (f)=>{ setEditing(f); setForm({ tutorId:f.tutorId, commissionPercent:f.commissionPercent }); setOpen(true) }

  const save = async ()=>{
    if(editing){
      await updateFee(editing.id, form)
    }else{
      await createFee(form)
    }
    setOpen(false); load()
  }

  const remove = async (id)=>{ if(confirm('Delete?')){ await deleteFee(id); load() } }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Fee Structures</h2>
        <button className="btn" onClick={openNew}>New Fee</button>
      </div>
      <div className="card">
        {fees.map(f=> (
          <div key={f.id} className="flex justify-between items-center p-3 border-b">
            <div> Tutor: {f.tutorId} — Commission: {f.commissionPercent}% </div>
            <div>
              <button className="btn mr-2" onClick={()=>openEdit(f)}>Edit</button>
              <button className="btn bg-red-600" onClick={()=>remove(f.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Modal title={editing ? 'Edit Fee' : 'New Fee'} onClose={()=>setOpen(false)}>
          <div className="space-y-3">
            <div><input className="input" placeholder="Tutor ID" value={form.tutorId} onChange={e=>setForm({...form, tutorId:e.target.value})} /></div>
            <div><input type="number" className="input" placeholder="Commission %" value={form.commissionPercent} onChange={e=>setForm({...form, commissionPercent:parseFloat(e.target.value)})} /></div>
            <div className="flex justify-end"><button className="btn" onClick={save}>Save</button></div>
          </div>
        </Modal>
      )}
    </div>
  )
}
