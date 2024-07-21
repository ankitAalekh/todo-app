import React, { useState, useRef } from "react"
import { useTodos } from "../../services/TodoContext"
import "./AddTodo.css"

const AddTodo = () => {
  const { addTodo } = useTodos()
  const [task, setTask] = useState("")
  const [image, setImage] = useState(null)
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    addTodo(task, image)
    setTask("")
    setImage(null)
    fileInputRef.current.value = ""
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input className="task-input" type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="New task" required />
      <input className="file-input" type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
      <button className="add-button" type="submit">
        Add Task
      </button>
    </form>
  )
}

export default AddTodo
