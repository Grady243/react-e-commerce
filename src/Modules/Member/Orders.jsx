import React from 'react'
import { Link } from 'react-router-dom'
import memberService from './memberService'

// Liste des commandes du client
export default function Orders() {
  const orders = memberService.getOrders()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mes commandes</h1>

      <div className="space-y-3">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-medium">Commande #{order.id}</div>
              <div className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</div>
              <div className="text-sm text-gray-600">{order.items.length} article(s)</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">€ {order.total.toFixed(2)}</div>
              <div className="text-sm text-gray-500">{order.status}</div>
              <Link to={`/member/orders/${order.id}`} className="text-sm text-blue-600">Détails</Link>
            </div>
          </div>
        ))}
        {orders.length === 0 && <div className="text-gray-500">Aucune commande trouvée.</div>}
      </div>
    </div>
  )
}
