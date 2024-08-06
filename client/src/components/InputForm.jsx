import { useState, React } from "react";
import { v4 as uuidv4 } from 'uuid';
import useSWRMutation from 'swr/mutation'
import axios from "axios";


export default function InputForm({setList, setTask, task, list}){
    const remote_server_link = import.meta.env.VITE_SERVER_LINK
    // const other_remote_server_link = 


    // inputText = 
    // const [text, setText] = useState('')
    const submitButton = async(event) => {
        try {
            event.preventDefault()
            // console.log('clicked')
            // console.log('Here is the text: ', task)
            const newClientId = uuidv4()
            setList(preList => [...preList, {
                client_id: newClientId,
                toDo: task,
                completed: false,
                isEditing: false
            }])
            // console.log('here is the list: ', list.client_id)
            // this is where I would make a post request to the server
            // to ensure the data is being passed through
            // I should pass it as a json file, and I think I will
            // use useSWR for this
            // keep in mind that I am passing in a path, not a whole URL
            // for best practices 
            // setTimeout(() => {
            //     console.log('here is the task added in the list: ',list )
            // }, 0 )
            // console.log('here is the task added in the list: ',list )
            const newTodo = { 
                task: task,
                client_id: newClientId
              }
            //   console.log('here is teh newTodo: ', newTodo)
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
        // console.log(event.target.value)
        setTask(event.target.value)
        // console.log(text)
    }
    // console.log('here is the updated value: ', task)

    return (
        <>
            <h2>'What are your plans for today?'</h2>
            <div>
                <form>
                    <input 
                        onChange={handleChange}
                        type="text"
                        value={task}
                        placeholder="What is your task for today?"
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