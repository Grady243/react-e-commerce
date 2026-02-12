import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiCalendar, FiUpload } from 'react-icons/fi'
import memberService from './Modules/Member/memberService'
import { useTheme } from './context/ThemeContext'

// ===== PAGE D'INSCRIPTION PROFESSIONNELLE ET MODERNE =====
// Fonctionnalités:
// - Validation en temps réel du mot de passe (force checker)
// - Upload de photo avec prévisualisation
// - Radio buttons pour le sexe
// - Calcul automatique de l'âge
// - Design moderne avec gradients et animations
export default function Register() {
  // ===== ÉTATS DU FORMULAIRE =====
  const { isDark } = useTheme()
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    sexe: 'M',
    dateNaissance: '',
    age: null,
    password: '',
    confirmPassword: '',
    photo: null
  })
  const [photoPreview, setPhotoPreview] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0) // 0-4
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // ===== CALCUL AUTOMATIQUE DE L'ÂGE =====
  function calculateAge(dateStr) {
    if (!dateStr) return null
    const today = new Date()
    const birthDate = new Date(dateStr)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age < 0 ? null : age
  }

  // ===== VÉRIFICATION DE LA FORCE DU MOT DE PASSE EN TEMPS RÉEL =====
  function checkPasswordStrength(pwd) {
    let strength = 0
    if (pwd.length >= 6) strength++ // Longueur minimum
    if (pwd.length >= 10) strength++ // Longueur bonne
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++ // Majuscules et minuscules
    if (/\d/.test(pwd)) strength++ // Chiffres
    if (/[!@#$%^&*]/.test(pwd)) strength++ // Caractères spéciaux
    return Math.min(strength, 4) // Max 4
  }

  // ===== GESTION DE LA SAISIE DES CHAMPS =====
  function handleChange(e) {
    const { name, value } = e.target
    let newForm = { ...form, [name]: value }

    // Auto-calculer l'âge si le champ est la date de naissance
    if (name === 'dateNaissance') {
      newForm.age = calculateAge(value)
    }

    // Vérifier la force du mot de passe en temps réel
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value))
    }

    // Si on modifie le password ou confirmPassword, on peut réutiliser la validation
    setForm(newForm)
  }

  // ===== GESTION DE L'UPLOAD DE PHOTO =====
  function handlePhotoUpload(e) {
    const file = e.target.files[0]
    if (file) {
      // Vérifier si c'est une image
      if (!file.type.startsWith('image/')) {
        setError('Veuillez sélectionner une image valide.')
        return
      }

      // Limiter la taille à 5MB
      if (file.size > 5 * 1024 * 1024) {
        setError('La photo ne doit pas dépasser 5MB.')
        return
      }

      // Créer un aperçu avec FileReader
      const reader = new FileReader()
      reader.onload = (event) => {
        setPhotoPreview(event.target.result)
        setForm(prev => ({ ...prev, photo: file }))
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  // ===== OBTENIR LA COULEUR DE LA FORCE DU MOT DE PASSE =====
  function getPasswordStrengthColor() {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500']
    return colors[passwordStrength] || 'bg-gray-300'
  }

  function getPasswordStrengthText() {
    const texts = ['Très faible', 'Faible', 'Moyen', 'Bon', 'Très bon']
    return texts[passwordStrength] || 'Tapez un mot de passe'
  }

  // ===== SOUMISSION DU FORMULAIRE =====
  function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Validation complète
    if (!form.nom || !form.prenom || !form.email || !form.password || !form.confirmPassword || !form.dateNaissance) {
      setError('Tous les champs sont requis.')
      setLoading(false)
      return
    }

    if (form.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      setLoading(false)
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      setLoading(false)
      return
    }

    if (form.age && form.age < 13) {
      setError('Vous devez avoir au moins 13 ans pour créer un compte.')
      setLoading(false)
      return
    }

    // Enregistrer le profil utilisateur
    const fullName = `${form.prenom} ${form.nom}`
    memberService.updateProfile({
      name: fullName,
      email: form.email,
      sexe: form.sexe,
      dateNaissance: form.dateNaissance,
      age: form.age,
      photo: photoPreview // Sauvegarder l'aperçu en base64
    })

    // Authentification
    memberService.authenticate(form.email, form.password)
    
    setSuccess('Compte créé avec succès. Redirection...')
    setTimeout(() => {
      setLoading(false)
      navigate('/member')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="w-full max-w-xl">
        {/* ===== CONTENEUR PRINCIPAL AVEC EN-TÊTE STYLISÉ ===== */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* En-tête avec dégradé */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6">
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">F</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center">Créer un compte</h1>
            <p className="text-indigo-100 text-sm text-center mt-1">Rejoignez la communauté Flone</p>
          </div>

          {/* ===== CORPS DU FORMULAIRE ===== */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Ligne 1: Nom et Prénom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Nom</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
                    <input
                      name="nom"
                      type="text"
                      placeholder="ex: Shabani"
                      value={form.nom}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Prénom</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
                    <input
                      name="prenom"
                      type="text"
                      placeholder="ex: Martin"
                      value={form.prenom}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Ligne 2: Email, Mot de passe, Confirmer (sur la même ligne sur desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Email</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base" />
                    <input
                      name="email"
                      type="email"
                      placeholder="votre.email@exemple.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Mot de passe</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base" />
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                    >
                      {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                    </button>
                    {/* Indicateur de force du mot de passe en bas du champ */}
                    {form.password && (
                      <div className="mt-2">
                        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-1">
                          <div
                            className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{ width: `${(passwordStrength + 1) * 20}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-bold ${
                          passwordStrength === 0 ? 'text-red-500' :
                          passwordStrength === 1 ? 'text-orange-500' :
                          passwordStrength === 2 ? 'text-yellow-500' :
                          passwordStrength === 3 ? 'text-lime-500' :
                          'text-green-500'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Confirmer le mot de passe</label>
                  <input
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirmer"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-3 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                  />
                </div>
              </div>

              {/* Ligne 3: Sexe, Date de naissance et Âge (même ligne) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Sexe</label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="sexe"
                        value="M"
                        checked={form.sexe === 'M'}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">M</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="sexe"
                        value="F"
                        checked={form.sexe === 'F'}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">F</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Date de naissance</label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-base" />
                    <input
                      name="dateNaissance"
                      type="date"
                      value={form.dateNaissance}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Âge</label>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                    <p className="text-blue-800 dark:text-blue-300 text-sm">
                      <span className="font-semibold">Âge:</span> {form.age !== null ? `${form.age} ans` : '—'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload de Photo (ligne suivante) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Photo de profil (optionnel)</label>
                <div>
                  <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition text-sm text-gray-700 dark:text-gray-200">
                    <FiUpload className="text-gray-500" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  {photoPreview && (
                    <div className="mt-3 flex justify-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500 shadow-sm bg-white dark:bg-gray-800">
                        <img src={photoPreview} alt="Prévisualisation" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Password section consolidated above (no duplicate) */}

              {/* Messages d'erreur et succès */}
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm">
                  {success}
                </div>
              )}

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-y-105 active:scale-y-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Création du compte...</span>
                  </>
                ) : (
                  'Créer mon compte'
                )}
              </button>
            </form>

            {/* Lien vers login */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
