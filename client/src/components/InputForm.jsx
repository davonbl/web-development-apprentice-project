import { useState, React } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";


export default function InputForm({setList, setTask, task, list}){
    const remote_server_link = import.meta.env.VITE_SERVER_LINK

    const submitButton = async(event) => {
        try {
            event.preventDefault()

            const newClientId = uuidv4()
            setList(preList => [...preList, {
                client_id: newClientId,
                toDo: task,
                completed: false,
                isEditing: false
            }])
            const newTodo = { 
                task: task,
                client_id: newClientId
              }
              const res = await axios.post(remote_server_link, newTodo, {
                headers:{
                    'Content-Type': 'application/json'
                }
              });
            setTask('')
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        setTask(event.target.value)
    }


    return (
        <>
            <h2>What are your plans for today?</h2>
            <div>
                <form>
                    <input 
                        onChange={handleChange}
                        type="text"
                        value={task}
                        placeholder="Write your plans here"
                    />
                    <button 
                        onClick={submitButton}
                        type="submit"
                    >
                        Add Task
                    </button>   
                    
                </form>
            </div>

        </>
    )
}