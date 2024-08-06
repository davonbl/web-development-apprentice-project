import { useState, React } from "react";

export default function EditTask({editTask, editTaskButton, original_id, original_text}){

    const [value, setValue] = useState(editTask.toDo)
    const submitButton = (event) => {
        event.preventDefault()
        editTaskButton(value, editTask.client_id, original_id, original_text)

    }

    const handleChange = (event, original_id) => {

        setValue(event.target.value)

    }

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