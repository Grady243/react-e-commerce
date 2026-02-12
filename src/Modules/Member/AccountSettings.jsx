import React, { useState, useEffect } from 'react'
import memberService from './memberService'

// Page de modification du compte
export default function AccountSettings() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const p = memberService.getProfile()
    setForm({ name: p.name || '', email: p.email || '', phone: p.phone || '' })
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Validation basique
    if (!form.name || !form.email) {
      setStatus({ type: 'error', message: 'Le nom et l’email sont requis.' })
      return
    }
    memberService.updateProfile(form)
    setStatus({ type: 'success', message: 'Profil mis à jour.' })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Paramètres du compte</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4">
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Téléphone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div className="flex items-center space-x-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
        </div>

        {status && (
          <div className={`mt-3 text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  )
}
