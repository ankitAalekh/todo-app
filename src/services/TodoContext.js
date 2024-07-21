import React, { createContext, useContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos")
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = (task, image) => {
    setTodos([...todos, { id: uuidv4(), task, completed: false, image }])
  }

  const toggleComplete = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const editTodo = (updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))
  }

  return <TodoContext.Provider value={{ todos, addTodo, toggleComplete, deleteTodo, editTodo }}>{children}</TodoContext.Provider>
}

export const useTodos = () => useContext(TodoContext)
