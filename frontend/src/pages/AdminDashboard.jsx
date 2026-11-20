import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import HeaderControls from '../components/HeaderControls'
import { LogOut, Users, Receipt, Calendar, Bell, CheckCircle } from 'lucide-react'
import appLogo from '../assets/logo.png'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 dark:bg-[#0a0a0a] dark:text-neutral-100 p-6 flex flex-col items-center transition-colors duration-200">
      <div className="w-full max-w-5xl space-y-6">
        {/* Barre supérieure Admin */}
        <header className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center p-1.5">
              <img src={appLogo} alt="Logo" className="h-full w-auto object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-white">{t('app_name')}</span>
                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">{t('admin_space')}</span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                {user?.nom_complet} ({user?.email})
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

        {/* Grille des 4 modules métier UML */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 space-y-3 shadow-sm hover:border-neutral-400 dark:hover:border-neutral-700 transition">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> {t('ready')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">{t('students_mgmt')}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{t('students_desc')}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 space-y-3 shadow-sm hover:border-neutral-400 dark:hover:border-neutral-700 transition">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                <Receipt className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> {t('ready')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">{t('fees_mgmt')}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{t('fees_desc')}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 space-y-3 shadow-sm hover:border-neutral-400 dark:hover:border-neutral-700 transition">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> {t('ready')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">{t('schedules_mgmt')}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{t('schedules_desc')}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-5 space-y-3 shadow-sm hover:border-neutral-400 dark:hover:border-neutral-700 transition">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                <Bell className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> {t('ready')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">{t('reminders_mgmt')}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{t('reminders_desc')}</p>
            </div>
          </div>
        </div>

        {/* Note informative de session sécurisée */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-950 p-5 shadow-sm text-xs text-neutral-600 dark:text-neutral-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t('session_status')} : <strong>Actif ({user?.role})</strong></span>
          </div>
          <span className="text-neutral-400 dark:text-neutral-600 text-[11px] font-mono">
            ID: {user?.id} • Role: {user?.role}
          </span>
        </div>
      </div>
    </div>
  )
}
