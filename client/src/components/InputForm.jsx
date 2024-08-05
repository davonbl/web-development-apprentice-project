import { useState, React } from "react";
import { v4 as uuidv4 } from 'uuid';


export default function InputForm({setList, setTask, task, list}){
    // inputText = 
    // const [text, setText] = useState('')
    const submitButton = (event) => {
        event.preventDefault()
        console.log('clicked')
        console.log('Here is the text: ', task)
        setList(preList => [...preList, {
            id: uuidv4(),
            toDo: task,
            completed: false,
            isEditing: false
        }])
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
        setTask('')
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setTask(event.target.value)
        // console.log(text)
    }
    console.log('here is the updated value: ', task)

    return (
        <>
            <p>'Here is where the input bar will be located'</p>
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