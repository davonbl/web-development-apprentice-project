import React from "react";
import EditTask from "./EditTask";
import "../styles/toDo.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export default function ToDoList({list, setList, currentData}){
    const remote_server_link = import.meta.env.VITE_SERVER_LINK

    const clickButton = (id, completedTask) => {
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
    }

    const deleteButton = async(id) => {
        try {
            const passObj = {id}
            const res = await axios.delete(remote_server_link, passObj, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setList((currentList) => {
                return currentList.filter(ele => ele.client_id !== id)
            })        
        } catch (error) {
            console.error(error)
        }

    }

    const editButton = (id, toDo) => {
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
            const updatedObj = {
                client_id: id,
                task: newValue,
                old_id: inital_id
            }
            const res = await axios.put(remote_server_link, updatedObj, {
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
            
        } catch (error) {
            console.error(error)
        }

    }
    return(
        <>
            <ul className="orderList">
            {
                list.map((ele, i) => {
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
                        </li>
                    
                    )
                })
            }
            </ul>

        </>
    )
}