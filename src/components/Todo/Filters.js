import React, { useState } from "react"
import { useTodos } from "../../services/TodoContext"
import "./Filter.css" // Import the CSS file

const Filters = () => {
  const { todos } = useTodos()
  const [filter, setFilter] = useState("all")

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed
    if (filter === "active") return !todo.completed
    return true
  })

  return (
    <div className="filters-container">
      <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
        All
      </button>
      <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
        Completed
      </button>
      <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>
        Active
      </button>
      <div className="filtered-todos">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <div key={todo.id}>
              {todo.image && <img src={todo.image} alt="Todo" style={{ width: "75px", height: "75px" }} />}
              {todo.task}
            </div>
          ))
        ) : (
          <div>No task found </div>
        )}
      </div>
    </div>
  )
}

export default Filters
