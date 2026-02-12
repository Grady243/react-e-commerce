import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import memberService from './memberService'

// Tableau de bord utilisateur : résumé rapide et commandes récentes
function Dashboard() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        setOrders(memberService.getOrders())
    }, [])

    const total = orders.reduce((s, o) => s + (o.total || 0), 0)

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Tableau de bord</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 shadow rounded p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total commandes</div>
                    <div className="text-xl font-bold dark:text-white">{orders.length}</div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Montant total</div>
                    <div className="text-xl font-bold dark:text-white">€ {total.toFixed(2)}</div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">En cours</div>
                    <div className="text-xl font-bold dark:text-white">{orders.filter(o => o.status === 'processing').length}</div>
                </div>
            </div>

            <h2 className="text-lg font-semibold mb-2 dark:text-white">Commandes récentes</h2>
            <div className="space-y-3">
                {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center">
                        <div>
                            <div className="font-medium dark:text-white">Commande #{order.id}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(order.date).toLocaleString()}</div>
                        </div>
                        <div className="text-right">
                            <div className="font-semibold dark:text-white">€ {order.total.toFixed(2)}</div>
                            <Link to={`/member/orders/${order.id}`} className="text-sm text-blue-600 dark:text-blue-400">Voir</Link>
                        </div>
                    </div>
                ))}
                {orders.length === 0 && <div className="text-gray-500 dark:text-gray-400">Vous n'avez pas encore de commandes.</div>}
            </div>
        </div>
    )
}

export default Dashboard
