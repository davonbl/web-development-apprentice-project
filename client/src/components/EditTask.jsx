import { useState, React } from "react";
import { v4 as uuidv4 } from 'uuid';
// import editTaskButton from ''

// setList, setTask, task, list,
export default function EditTask({editTask, editTaskButton, original_id, original_text}){
    // inputText = 
    const [value, setValue] = useState(editTask.toDo)
    const submitButton = (event) => {
        event.preventDefault()
        // console.log('clicked')
        // console.log('Here is the text: ', editTask.toDo)
        // editToDo(value, editTask.id)
        editTaskButton(value, editTask.client_id, original_id, original_text)

        // setTask('')
    }

    const handleChange = (event, original_id) => {
        // console.log('the button is clicked')
        // console.log('here is the original_id: ', original_id)
        // console.log(event.target.value)
        setValue(event.target.value)
        // console.log(text)
    }
    // console.log('here is the updated value: ', task)

    return (
        <>
            <div>
                <form>
                    <input 
                        onChange={(event) => handleChange(event, original_id)}
                        type="text"
                        value={value}
                        placeholder="updating task"
                    />
                    <button 
                        onClick={submitButton}
                        type="submit"
                    >
                        Update Task
                    </button>   
                    
                </form>
            </div>

        </>
    )
}