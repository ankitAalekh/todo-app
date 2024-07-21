import React, { createContext, useState, useContext } from "react"

// Create Context
const AuthContext = createContext()

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (username, password) => {
    // Mock authentication
    if (username === "user" && password === "password") {
      setUser({ username })
      localStorage.setItem("authId", username + password)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.clear()
  }
  const isAuthenticated = () => {
    if (localStorage.getItem("authId")) {
      return true
    } else return false
  }

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>
}

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext)
