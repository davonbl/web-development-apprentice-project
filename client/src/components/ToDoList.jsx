import React from "react";
import EditTask from "./EditTask";
import "../styles/toDo.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export default function ToDoList({list, setList, currentData}){

    const clickButton = (id, completedTask) => {
        console.log(`button clicked, and id ${id}`)
        console.log('value of completed task: ', !completedTask)
        console.log('here is the list: ', list)
            setList((prevList) => {
                return prevList.map((ele) => {
                    if(ele.client_id === id){
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

    const deleteButton = async(id) => {
        try {
            console.log('here is the delete button')
            console.log('here is the id of clicked object: ', id)
            console.log('here is the list: ', list)
            // const testValue = list.filter(ele => ele.id !== id)
            const passObj = {id}
            const res = await axios.delete('http://localhost:8080/', passObj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setList((currentList) => {
                return currentList.filter(ele => ele.client_id !== id)
            })
            console.log('what is filtered: ', list)         
        } catch (error) {
            console.error(error)
        }

    }

    const editButton = (id, toDo) => {
        console.log('here is the edit button')
        setList(editList => {
            return editList.map(ele => 
                ele.client_id === id?  {
                    ...ele,
                    toDo,
                    isEditing: !ele.isEditing
                } : ele
            )
        })
    }
    const editTaskButton = async (newValue, id, inital_id, text) => {
        try {
            // console.log('here is toDos: ', newValue)
            // console.log('here is new id: ', id)
            // console.log('here is the inital_id: ', inital_id)
            // console.log('the original text? ', text)
            const updatedObj = {
                client_id: id,
                task: newValue,
                old_id: inital_id
            }
            console.log('here is the UPDATED OBJ: ', updatedObj)
            const res = await axios.put(`http://localhost:8080`, updatedObj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setList(currentList =>{
                return currentList.map(ele =>
                    ele.client_id === id? {
                        ...ele,
                        toDo: newValue,
                        isEditing: !ele.isEditing
                    } : ele
                )
            })
            //add the put value here
            
        } catch (error) {
            console.error(error)
        }

    }
    return(
        <>
            <p>To-do List</p>
            <ol>
            {
                list.map((ele, i) => {
                    console.log('key: ', ele.client_id)
                return ele.isEditing? (
                        <EditTask key = {ele.client_id}
                            editTaskButton ={editTaskButton}
                            editTask={ele}
                            original_id={ele.client_id}
                            original_text={ele.task}
                        />
                    ):(
                        
                        <li key= {ele.client_id}
                          className="listStyles"  
                        >
                            <input 
                                type="checkbox" 
                                // name="day" 
                                checked={ele.completed}
                                value={ele.client_id} 
                                onChange={() =>clickButton(ele.client_id, ele.completed)}
                                >
                            </input>
                            <p className={ele.completed? "completedTask" : "pendingTask"}>{ele.toDo}</p>
                            <FontAwesomeIcon 
                                icon={faPenToSquare}
                                onClick={() => editButton(ele.client_id, ele.toDo)}
                                />
                            <FontAwesomeIcon 
                                icon={faTrash}
                                onClick={() => deleteButton(ele.client_id)}
                                />
                            {/* <button onClick={() => {return clickButton(i + 1)}}>Edit</button> */}
                        </li>
                    
                    )
                })
            }
            </ol>

        </>
    )
}