import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import memberService from './memberService'

// Page du profil utilisateur
// Affiche les informations de l'utilisateur et quelques actions rapides
function Profile() {
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Charger le profil depuis le service (mock / localStorage)
        const p = memberService.getProfile()
        setProfile(p)
    }, [])

    const handleEdit = () => {
        // Aller vers la page de modification
        navigate('/member/account')
    }

    if (!profile) return <div className="p-6">Chargement...</div>

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Mon profil</h1>

            <div className="bg-white shadow rounded p-4 mb-6">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-xl text-gray-500">
                        {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <div className="font-semibold">{profile.name}</div>
                        <div className="text-sm text-gray-600">{profile.email}</div>
                        <div className="text-sm text-gray-600">{profile.phone || '—'}</div>
                    </div>
                </div>

                <div className="mt-4 flex space-x-2">
                    <button onClick={handleEdit} className="px-4 py-2 bg-blue-600 text-white rounded">Modifier</button>
                    <Link to="/member/orders" className="px-4 py-2 bg-gray-100 rounded">Mes commandes</Link>
                    <Link to="/member/addresses" className="px-4 py-2 bg-gray-100 rounded">Adresses</Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded p-4">
                    <div className="text-sm text-gray-500">Commandes</div>
                    <div className="text-xl font-bold">{memberService.getOrders().length}</div>
                </div>

                <div className="bg-white shadow rounded p-4">
                    <div className="text-sm text-gray-500">En cours</div>
                    <div className="text-xl font-bold">{memberService.getOrders().filter(o => o.status === 'processing').length}</div>
                </div>

                <div className="bg-white shadow rounded p-4">
                    <div className="text-sm text-gray-500">Livrées</div>
                    <div className="text-xl font-bold">{memberService.getOrders().filter(o => o.status === 'delivered').length}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile
