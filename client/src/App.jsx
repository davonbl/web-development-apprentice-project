import { useState } from 'react'
import ToDoList from './components/ToDoList'
import InputForm from './components/InputForm'
import './App.css'

function App() {
  const [list, setList] = useState([])
  const [task, setTask] = useState('')

  return (
    <>
      <div>
        <InputForm
          setList={setList}
          setTask={setTask}
          task={task}
          list={list}
        />
        <ToDoList
          list={list}
          setList={setList}
        />
      </div>
    </>
  )
}

export default App
