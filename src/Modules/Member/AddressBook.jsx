import React, { useState } from 'react'
import memberService from './memberService'

// Gestion simple du carnet d'adresses
export default function AddressBook() {
  const [addresses, setAddresses] = useState(memberService.getAddresses())
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ label: '', line1: '', city: '', postalCode: '', country: '' })

  function resetForm() {
    setForm({ label: '', line1: '', city: '', postalCode: '', country: '' })
    setEditing(null)
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleAdd(e) {
    e.preventDefault()
    const a = memberService.addAddress(form)
    setAddresses(memberService.getAddresses())
    resetForm()
  }

  function handleEdit(a) {
    setEditing(a.id)
    setForm({ ...a })
  }

  function handleUpdate(e) {
    e.preventDefault()
    memberService.updateAddress(editing, form)
    setAddresses(memberService.getAddresses())
    resetForm()
  }

  function handleDelete(id) {
    if (!confirm('Supprimer cette adresse ?')) return
    memberService.deleteAddress(id)
    setAddresses(memberService.getAddresses())
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Adresses</h1>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="font-semibold mb-2">Ajouter / Modifier</h2>
          <form onSubmit={editing ? handleUpdate : handleAdd} className="bg-white p-4 rounded shadow">
            <input name="label" placeholder="Libellé" value={form.label} onChange={handleChange} className="w-full mb-2 border rounded px-2 py-1" />
            <input name="line1" placeholder="Adresse" value={form.line1} onChange={handleChange} className="w-full mb-2 border rounded px-2 py-1" />
            <input name="city" placeholder="Ville" value={form.city} onChange={handleChange} className="w-full mb-2 border rounded px-2 py-1" />
            <input name="postalCode" placeholder="Code postal" value={form.postalCode} onChange={handleChange} className="w-full mb-2 border rounded px-2 py-1" />
            <input name="country" placeholder="Pays" value={form.country} onChange={handleChange} className="w-full mb-2 border rounded px-2 py-1" />
            <div className="flex space-x-2">
              <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">{editing ? 'Mettre à jour' : 'Ajouter'}</button>
              <button type="button" onClick={resetForm} className="px-3 py-1 bg-gray-200 rounded">Annuler</button>
            </div>
          </form>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Liste</h2>
          <div className="space-y-2">
            {addresses.map(a => (
              <div key={a.id} className="bg-white p-3 rounded shadow flex justify-between items-start">
                <div>
                  <div className="font-medium">{a.label}</div>
                  <div className="text-sm text-gray-600">{a.line1}</div>
                  <div className="text-sm text-gray-600">{a.postalCode} {a.city} — {a.country}</div>
                </div>
                <div className="space-y-1 text-right">
                  <button onClick={() => handleEdit(a)} className="text-sm text-blue-600">Modifier</button>
                  <button onClick={() => handleDelete(a.id)} className="text-sm text-red-600">Supprimer</button>
                </div>
              </div>
            ))}
            {addresses.length === 0 && <div className="text-gray-500">Aucune adresse enregistrée.</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
