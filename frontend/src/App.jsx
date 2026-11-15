import React, { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('zen_theme') === 'dark' ||
      (!('zen_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('zen_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('zen_theme', 'light')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200 flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-neutral-950 dark:bg-white flex items-center justify-center text-white dark:text-neutral-950 font-bold text-lg">
              Z
            </div>
            <div>
              <span className="font-semibold text-lg tracking-tight">ZEN</span>
              <span className="ml-2 text-xs text-neutral-500 font-medium hidden sm:inline">
                Scolarité & Paiements
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
              title={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
              aria-label="Basculer le thème"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6">
        {/* Espace réservé pour les composants et vues de l'application */}
      </main>
    </div>
  )
}
