import React from "react";
import EditTask from "./EditTask";
import "../styles/toDo.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';

export default function ToDoList({list, setList}){

    // const clickButton = (id, completedTask) => {
    //     console.log(`button clicked, and id ${id}`)
    //     if(!completedTask){
    //         setList((list) => {
    //             list.map((ele) => {
    //                 if(ele.id === id){
    //                     return ele.completed = true; 
    //                 }
    //             })
    //         })
    //         console.log(`value of completed: ${completedTask}`)
    //     }
    // }
    const clickButton = (id, completedTask) => {
        console.log(`button clicked, and id ${id}`)
        console.log('value of completed task: ', !completedTask)
        console.log('here is the list: ', list)
            setList((prevList) => {
                return prevList.map((ele) => {
                    if(ele.id === id){
                        return {
                            ...ele,
                            completed: !completedTask
                        }
                    }else{
                        return ele
                    }
                })
            })
            console.log(`value of completed: ${!completedTask}`)        
    }

    const deleteButton = (id) => {
        console.log('here is the delete button')
        console.log('here is the id of clicked object: ', id)
        console.log('here is the list: ', list)
        // const testValue = list.filter(ele => ele.id !== id)
        setList((currentList) => {
            return currentList.filter(ele => ele.id !== id)
        })
        console.log('what is filtered: ', list)
    }

    const editButton = (id, toDo) => {
        console.log('here is the edit button')
        setList(editList => {
            return editList.map(ele => 
                ele.id === id?  {
                    ...ele,
                    toDo,
                    isEditing: !ele.isEditing
                } : ele
            )
        })
    }
    const editTaskButton = (newValue, id) => {
        console.log('here is toDos: ', newValue)
        console.log('here is id: ', id)
        setList(currentList =>{
            return currentList.map(ele =>
                ele.id === id? {
                    ...ele,
                    toDo: newValue,
                    isEditing: !ele.isEditing
                } : ele
            )
        })
        // .map(ele => 
        //     ele.id === id? {
        //         ...ele,
        //         toDos,
        //         isEditing: !toDos.isEditing
        //     } : ele
        // ))
    }
    return(
        <>
            <p>The List will be here</p>
            <ol>
            {
                list.map((ele, i) => {
                return ele.isEditing? (
                        <EditTask key = {ele.id}
                            editTaskButton ={editTaskButton}
                            editTask={ele}
                        />
                    ):(
                        <>
                        {/* // key = {i + 1} */}
                        <li key= {ele.id}
                          className="listStyles"  
                        >
                            <input 
                                type="checkbox" 
                                // name="day" 
                                checked={ele.completed}
                                value={ele.id} 
                                onChange={() =>clickButton(ele.id, ele.completed)}
                                >
                            </input>
                            <p className={ele.completed? "completedTask" : "pendingTask"}>{ele.toDo}</p>
                            <FontAwesomeIcon 
                                icon={faPenToSquare}
                                onClick={() => editButton(ele.id, ele.toDo)}
                                />
                            <FontAwesomeIcon 
                                icon={faTrash}
                                onClick={() => deleteButton(ele.id)}
                                />
                            {/* <button onClick={() => {return clickButton(i + 1)}}>Edit</button> */}
                        </li>
                        </>
                    )
                })
            }
            </ol>

        </>
    )
}