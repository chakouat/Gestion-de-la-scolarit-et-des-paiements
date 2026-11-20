import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import HeaderControls from '../components/HeaderControls'
import { LogOut, Wallet, FileText, CheckCircle } from 'lucide-react'
import appLogo from '../assets/logo.png'

export default function StudentDashboard() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const etudiant = user?.etudiant

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 dark:bg-[#0a0a0a] dark:text-neutral-100 p-6 flex flex-col items-center transition-colors duration-200">
      <div className="w-full max-w-4xl space-y-6">
        {/* Barre supérieure Étudiant */}
        <header className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center p-1.5">
              <img src={appLogo} alt="Logo" className="h-full w-auto object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-white">{t('app_name')}</span>
                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">{t('student_space')}</span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {t('welcome')}, <span className="text-neutral-900 dark:text-white font-medium">{user?.nom_complet}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <HeaderControls />
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('logout')}</span>
            </button>
          </div>
        </header>

        {/* Fiche d'identité de l'étudiant */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-6 shadow-sm">
          <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
            Informations Scolaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-black/60 border border-neutral-200 dark:border-neutral-800">
              <div className="text-xs text-neutral-500">{t('matricule')}</div>
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono mt-1">
                {etudiant?.numero_etudiant || 'ETU2026001'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-black/60 border border-neutral-200 dark:border-neutral-800">
              <div className="text-xs text-neutral-500">{t('filiere')}</div>
              <div className="text-sm font-semibold text-neutral-900 dark:text-white mt-1">
                {etudiant?.filiere || 'Ingénierie Logicielle'}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-black/60 border border-neutral-200 dark:border-neutral-800">
              <div className="text-xs text-neutral-500">{t('niveau')}</div>
              <div className="text-sm font-semibold text-neutral-900 dark:text-white mt-1">
                {etudiant?.niveau || 'S5'}
              </div>
            </div>
          </div>
        </div>

        {/* Grille des modules Étudiant */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 space-y-3 shadow-sm hover:border-neutral-400 dark:hover:border-neutral-700 transition">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> {t('ready')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">{t('financial_status')}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{t('financial_desc')}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 space-y-3 shadow-sm hover:border-neutral-400 dark:hover:border-neutral-700 transition">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> {t('ready')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">{t('receipts')}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{t('receipts_desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
