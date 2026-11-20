import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import StudentDashboard from './pages/StudentDashboard'

function MainContent() {
  const { user, loading, isAuthenticated, isAdmin, isStudent } = useAuth()
  const { t } = useLanguage()

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-neutral-100 gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
        <span className="text-xs text-neutral-400 font-medium">{t('signing_in')}</span>
      </div>
    )
  }

  // 1. Si non authentifié -> Afficher la page de connexion inspirée de la photo
  if (!isAuthenticated) {
    return <LoginPage />
  }

  // 2. Si Administrateur -> Tableau de bord Admin
  if (isAdmin) {
    return <AdminDashboard />
  }

  // 3. Si Étudiant -> Tableau de bord Étudiant
  if (isStudent) {
    return <StudentDashboard />
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-black text-white">
      <p className="text-sm text-red-400">Profil non reconnu.</p>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <MainContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
