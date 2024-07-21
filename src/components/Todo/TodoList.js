import React, { useEffect } from "react"
import { useAuth } from "../../services/AuthContext"
import { useTodos } from "../../services/TodoContext"
import "./TodoList.css"
import AddTodo from "./AddTodo"
import TodoItem from "./TodoItem"
import Filters from "./Filters"
import { useNavigate } from "react-router-dom"
const TodoList = () => {
  const { todos, toggleComplete, deleteTodo } = useTodos()
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login")
    }
  }, [])

  return (
    <div className="todolist-container">
      {/* <div className="todolist-header">
        <button onClick={logout}>Logout</button>
      </div> */}
      <h1>Todo List</h1>
      <AddTodo />
      <div className="todo-items">
        {todos.length === 0 ? <p>No tasks available. Add a task to get started!</p> : todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
      </div>
      <Filters />
    </div>
  )
}

export default TodoList
