import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import memberService from './Modules/Member/memberService'

// Composant simple pour déconnecter l'utilisateur et le rediriger
export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        memberService.logout()
        // Petite attente pour effet UX puis redirection
        setTimeout(() => navigate('/'), 300)
    }, [navigate])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="text-xl font-semibold">Vous avez été déconnecté.</div>
                <div className="text-sm text-gray-600 mt-2">Redirection vers l'accueil…</div>
            </div>
        </div>
    )
}
