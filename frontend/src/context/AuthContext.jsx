import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('zen_token'))
  const [loading, setLoading] = useState(true)

  // Vérifier la session au chargement
  useEffect(() => {
    const fetchUser = async () => {
      const savedToken = localStorage.getItem('zen_token')
      if (!savedToken) {
        setLoading(false)
        return
      }

      try {
        const response = await api.get('/me')
        setUser(response.data.user)
      } catch (err) {
        console.error('Session invalide ou expirée :', err)
        localStorage.removeItem('zen_token')
        setUser(null)
        setToken(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async (email, password) => {
    const response = await api.post('/login', { email, password })
    const { access_token, user: loggedUser } = response.data

    localStorage.setItem('zen_token', access_token)
    setToken(access_token)
    setUser(loggedUser)
    return loggedUser
  }

  const logout = async () => {
    try {
      await api.post('/logout')
    } catch (err) {
      console.warn('Erreur lors de la déconnexion API :', err)
    } finally {
      localStorage.removeItem('zen_token')
      setToken(null)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'administrateur',
        isStudent: user?.role === 'etudiant',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider')
  }
  return context
}
