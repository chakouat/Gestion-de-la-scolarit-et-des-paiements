import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import HeaderControls from '../components/HeaderControls'
import ForgotPasswordPage from './ForgotPasswordPage'
import { Eye, EyeOff } from 'lucide-react'
import appLogo from '../assets/logo.png'

export default function LoginPage() {
  const { login } = useAuth()
  const { t, isRTL } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  // Si l'utilisateur clique sur "Mot de passe oublié ?", basculer sur la vue dédiée
  if (showForgotPassword) {
    return <ForgotPasswordPage onBackToLogin={() => setShowForgotPassword(false)} />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await login(email, password)
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 422 || err.response?.data?.errors?.email) {
        setError(t('invalid_credentials'))
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError(t('err_network'))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center relative px-4 py-12 bg-white text-neutral-900 dark:bg-[#0a0a0a] dark:text-neutral-100 transition-colors duration-200">
      {/* Contrôles discrets dans le coin supérieur droit (Langue FR/EN/عر et Mode Clair/Sombre) */}
      <div className="absolute top-5 right-6 md:top-6 md:right-8 z-30">
        <HeaderControls />
      </div>

      {/* Conteneur central d'authentification inspiré fidèlement des captures */}
      <div className="w-full max-w-[430px] flex flex-col items-center">
        {/* Logo officiel de l'application Nexoria */}
        <div className="h-12 w-12 flex items-center justify-center mb-3">
          <img
            src={appLogo}
            alt="Nexoria Logo"
            className="h-11 w-auto object-contain drop-shadow-sm select-none"
            draggable={false}
          />
        </div>

        {/* Nom de l'application : Nexoria */}
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-1">
          {t('app_name')}
        </h1>

        {/* Sous-titre : Connectez-vous à votre compte */}
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-8">
          {t('app_tagline')}
        </p>

        {/* Carte du formulaire : Fond identique au background en mode clair (bg-white) ET en mode sombre (dark:bg-[#0a0a0a]), sans ombre */}
        <div className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#0a0a0a] p-7 md:p-8 shadow-none">
          {error && (
            <div className="mb-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] px-4 py-3.5 text-xs text-neutral-900 dark:text-neutral-100 animate-in fade-in select-none">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Champ Adresse e-mail */}
            <div>
              <label className="block text-xs font-semibold text-neutral-900 dark:text-neutral-200 mb-2">
                {t('email_label')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t('email_placeholder')}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] px-3.5 py-2.5 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-0 transition"
              />
            </div>

            {/* Champ Mot de passe avec lien oublié sur la même ligne */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-neutral-900 dark:text-neutral-200">
                  {t('password_label')}
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
                >
                  {t('forgot_password')}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] px-3.5 py-2.5 pr-10 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-0 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer p-1`}
                  aria-label="Afficher ou masquer le mot de passe"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Case à cocher : Se souvenir de moi */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#121214] text-black dark:text-white focus:ring-0 cursor-pointer accent-black dark:accent-white"
              />
              <label htmlFor="remember" className="text-xs font-medium text-neutral-800 dark:text-neutral-300 cursor-pointer select-none">
                {t('remember_me')}
              </label>
            </div>

            {/* Bouton : Se connecter
                - Au repos : transparent avec texte centré
                - Au survol en Dark Mode : colore en gris/blanc (#bcbcbc) avec texte blanc
                - Au survol en Light Mode : colore en noir/charcoal (#424242) avec texte clair
            */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 text-center text-sm font-medium text-neutral-900 dark:text-white bg-transparent hover:bg-[#424242] hover:text-neutral-300 dark:hover:bg-[#bcbcbc] dark:hover:text-white rounded-xl transition-colors duration-150 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    <span>{t('signing_in')}</span>
                  </>
                ) : (
                  <span>{t('sign_in')}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
