import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { Sun, Moon, Globe } from 'lucide-react'

export default function HeaderControls() {
  const { isDark, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Options exactes affichées selon la maquette : FR, EN, عر
  const languages = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'عر' },
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setLangMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {/* Sélecteur de langue */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setLangMenuOpen(!langMenuOpen)}
          className="p-1.5 text-neutral-800 hover:text-black dark:text-neutral-300 dark:hover:text-white transition-colors cursor-pointer"
          title="Changer de langue"
          aria-label="Changer de langue"
        >
          <Globe className="w-5 h-5" />
        </button>

        {langMenuOpen && (
          <div className="absolute right-0 mt-2.5 w-28 rounded-2xl border border-neutral-100 dark:border-neutral-800/80 bg-white dark:bg-[#0c0c0e] shadow-lg py-2.5 px-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="flex flex-col">
              {languages.map((lang) => {
                const isSelected = language === lang.code
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code)
                      setLangMenuOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                      isSelected
                        ? 'text-neutral-400 dark:text-neutral-500'
                        : 'text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900/60'
                    }`}
                  >
                    {lang.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bouton Dark / Light mode */}
      <button
        type="button"
        onClick={toggleTheme}
        className="p-1.5 text-neutral-800 hover:text-black dark:text-neutral-300 dark:hover:text-white transition-colors cursor-pointer"
        title={isDark ? 'Mode clair' : 'Mode sombre'}
        aria-label="Basculer le thème"
      >
        {isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </div>
  )
}
