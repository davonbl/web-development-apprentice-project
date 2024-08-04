import { useState, React } from "react";


export default function InputForm({setList, setText, text, list}){
    // inputText = 
    // const [text, setText] = useState('')
    const submitButton = (event) => {
        event.preventDefault()
        console.log('clicked')
        console.log('Here is the text: ', text)
        setList(list => [...list, text])
        setText('')
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setText(event.target.value)
        // console.log(text)
    }
    console.log('here is the updated value: ', text)

    return (
        <>
            <p>'Here is where the input bar will be located'</p>
            <div>
                <form>
                    <input 
                        onChange={handleChange}
                        type="text"
                        value={text}
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