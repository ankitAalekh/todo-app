import React, { useState } from "react"
import { useTodos } from "../../services/TodoContext"
import "./TodoItem.css"

const TodoItem = ({ todo }) => {
  const { toggleComplete, deleteTodo, editTodo } = useTodos()
  const [isEditing, setIsEditing] = useState(false)
  const [newTask, setNewTask] = useState(todo.task)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    editTodo({
      ...todo,
      task: newTask,
    })
    setIsEditing(false)
  }

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
      {isEditing ? (
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      ) : (
        <span className="task-text" onClick={() => toggleComplete(todo.id)}>
          {todo.task}
        </span>
      )}
      {todo.image && <img src={todo.image} alt="task" />}
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit} disabled={todo.completed}>
          Edit
        </button>
      )}
    </li>
  )
}

export default TodoItem
