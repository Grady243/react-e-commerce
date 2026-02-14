import React from 'react'
import { useParams } from 'react-router-dom'
import memberService from './memberService'

// Détails d'une commande et suivi basique
export default function OrderDetails() {
  const { id } = useParams()
  const order = memberService.getOrderById(id)

  if (!order) return <div className="p-6">Commande introuvable.</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Détails commande #{order.id}</h1>

      <div className="bg-white shadow rounded p-4 mb-4">
        <div className="text-sm text-gray-500">Date</div>
        <div className="mb-2">{new Date(order.date).toLocaleString()}</div>

        <div className="text-sm text-gray-500">Statut</div>
        <div className="mb-2 font-semibold">{order.status}</div>

        <div className="text-sm text-gray-500">Montant</div>
        <div className="mb-2">€ {order.total.toFixed(2)}</div>
      </div>

      <div className="bg-white shadow rounded p-4 mb-4">
        <h2 className="font-semibold mb-2">Articles</h2>
        <ul className="space-y-2">
          {order.items.map((it, i) => (
            <li key={i} className="flex justify-between">
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-gray-500">Quantité: {it.qty}</div>
              </div>
              <div className="font-semibold">€ {(it.price * it.qty).toFixed(2)}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="font-semibold mb-2">Suivi</h2>
        <div className="text-sm text-gray-600">{order.tracking && order.tracking.length ? order.tracking.join(' → ') : 'Aucun suivi disponible.'}</div>
      </div>
    </div>
  )
}
