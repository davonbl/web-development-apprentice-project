import { useState } from 'react'
import ToDoList from './components/ToDoList'
import InputForm from './components/InputForm'
import './App.css'

function App() {
  const [list, setList] = useState([])
  const [text, setText] = useState('')

  return (
    <>
      <div>
        <InputForm
          setList={setList}
          setText={setText}
          text={text}
          list={list}
        />
        <ToDoList
          list={list}
        />
      </div>
    </>
  )
}

export default App
