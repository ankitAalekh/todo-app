import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./services/AuthContext"
import Login from "./components/Login"
import TodoList from "./components/Todo/TodoList"
import { TodoProvider } from "./services/TodoContext"

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated() ? element : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute element={<TodoList />} />} />
          </Routes>
        </Router>
      </TodoProvider>
    </AuthProvider>
  )
}

export default App
