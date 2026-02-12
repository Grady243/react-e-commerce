import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi'
import { FaGoogle, FaApple, FaTwitter } from 'react-icons/fa'
import memberService from './Modules/Member/memberService'
import { useTheme } from './context/ThemeContext'

// Page de connexion responsive et moderne
export default function Login() {
    const { isDark } = useTheme()
    const [form, setForm] = useState({ email: '', password: '', remember: false })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        setLoading(true)
        // Appel mock au service
        const res = memberService.authenticate(form.email.trim(), form.password)
        setLoading(false)
        if (res.ok) {
            // redirection vers l'espace membre
            navigate('/member')
        } else {
            setError(res.message || 'Échec de la connexion')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
            <div className="w-full max-w-md">
                {/* Conteneur principal */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    {/* En-tête avec dégradé */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8">
                        <div className="flex items-center justify-center mb-2">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">F</span>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white text-center">Bienvenue</h1>
                        <p className="text-indigo-100 text-sm text-center mt-1">Connectez-vous à votre compte Flone</p>
                    </div>

                    {/* Corps du formulaire */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Champ Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="votre.email@exemple.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-gray-400 dark:placeholder-gray-500"
                                    />
                                </div>
                            </div>

                            {/* Champ Mot de passe */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Mot de passe</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
                                    <input
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-gray-400 dark:placeholder-gray-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                                    >
                                        {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                                    </button>
                                </div>
                            </div>

                            {/* Cocher et lien */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center text-gray-700 dark:text-gray-300 cursor-pointer">
                                    <input
                                        name="remember"
                                        type="checkbox"
                                        checked={form.remember}
                                        onChange={handleChange}
                                        className="mr-2 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span>Se souvenir de moi</span>
                                </label>
                                <Link to="/forgot" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
                                    Mot de passe oublié ?
                                </Link>
                            </div>

                            {/* Message d'erreur */}
                            {error && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Bouton de connexion */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-y-105 active:scale-y-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Connexion...</span>
                                    </>
                                ) : (
                                    'Se connecter'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">OU</span>
                            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                        </div>

                        {/* Boutons des réseaux sociaux */}
                        <div className="mt-8 grid grid-cols-3 gap-2">
                            {/* Google */}
                            <button
                                type="button"
                                onClick={() => {/* Logique Google */ }}
                                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-20 dark:hover:bg-gray-700/50 transition font-semibold text-gray-700 dark:text-gray-300"
                                title="Se connecter avec Google"
                            >
                                <FaGoogle className="text-red-500 text-xl" />
                            </button>

                            {/* Apple */}
                            <button
                                type="button"
                                onClick={() => {/* Logique Apple */ }}
                                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-20 dark:hover:bg-gray-700/50 transition font-semibold text-gray-700 dark:text-gray-300"
                                title="Se connecter avec Apple"
                            >
                                <FaApple className="text-gray-900 dark:text-white text-xl" />
                            </button>

                            {/* X (Twitter) */}
                            <button
                                type="button"
                                onClick={() => {/* Logique X */ }}
                                className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg hover:bg-gray-20 dark:hover:bg-gray-700/50 transition font-semibold text-gray-700 dark:text-gray-300"
                                title="Se connecter avec X"
                            >
                                <FaTwitter className="text-blue-400 text-xl" />
                            </button>
                        </div>

                        {/* Lien d'inscription */}
                        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                            Pas encore de compte ?{' '}
                            <Link to="/register" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold">
                                Inscrivez-vous
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
