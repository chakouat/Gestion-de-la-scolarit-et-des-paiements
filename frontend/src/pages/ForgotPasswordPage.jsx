import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import HeaderControls from '../components/HeaderControls'
import { Check } from 'lucide-react'
import appLogo from '../assets/logo.png'

export default function ForgotPasswordPage({ onBackToLogin }) {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Simulation ou appel API de réinitialisation
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSubmitted(true)
    } catch (err) {
      setError(t('err_network'))
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

      {/* Conteneur central inspiré fidèlement des maquettes */}
      <div className="w-full max-w-[430px] flex flex-col items-center">
        {/* Logo officiel doré de l'application Nexoria */}
        <div className="h-12 w-12 flex items-center justify-center mb-3">
          <img
            src={appLogo}
            alt="Nexoria Logo"
            className="h-11 w-auto object-contain drop-shadow-sm select-none"
            draggable={false}
          />
        </div>

        {/* Titre : Mot de passe oublié (affiché uniquement avant soumission pour correspondre à la capture de confirmation) */}
        {!submitted && (
          <>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-1">
              {t('forgot_title')}
            </h1>

            {/* Sous-titre */}
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-8 text-center max-w-sm">
              {t('forgot_subtitle')}
            </p>
          </>
        )}

        {/* Carte du formulaire : Fond identique au background en mode clair (bg-white) ET en mode sombre (dark:bg-[#0a0a0a]), sans ombre */}
        <div className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#0a0a0a] p-7 md:p-8 shadow-none mt-2">
          {error && (
            <div className="mb-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121214] px-4 py-3.5 text-xs text-neutral-900 dark:text-neutral-100 animate-in fade-in select-none">
              {error}
            </div>
          )}

          {submitted ? (
            /* Vue de confirmation 1:1 avec la capture d'écran */
            <div className="py-2 text-center animate-in fade-in space-y-6">
              {/* Icône de validation simple et épurée (sans cercle de couleur) */}
              <div className="flex justify-center">
                <Check className="w-6 h-6 text-neutral-900 dark:text-white stroke-[2.5]" />
              </div>

              {/* Message de confirmation exact */}
              <p className="text-sm font-normal text-neutral-900 dark:text-white leading-relaxed px-2">
                {t('reset_link_sent')}
              </p>

              {/* Lien souligné Retour à la connexion */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-sm font-semibold text-neutral-900 dark:text-white underline underline-offset-4 hover:text-neutral-600 dark:hover:text-neutral-300 transition cursor-pointer"
                >
                  {t('back_to_login')}
                </button>
              </div>
            </div>
          ) : (
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

              {/* Bouton : Envoyer le lien de réinitialisation */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 text-center text-sm font-medium text-neutral-900 dark:text-white bg-transparent hover:bg-[#424242] hover:text-neutral-300 dark:hover:bg-[#bcbcbc] dark:hover:text-white rounded-xl transition-colors duration-150 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                      <span>{t('sending_reset_link')}</span>
                    </>
                  ) : (
                    <span>{t('send_reset_link')}</span>
                  )}
                </button>
              </div>

              {/* Bouton : Retour à la connexion */}
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="py-1.5 text-center text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition cursor-pointer"
                >
                  {t('back_to_login')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
