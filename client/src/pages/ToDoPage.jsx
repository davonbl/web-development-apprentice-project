import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useSWR from "swr";
import axios from "axios";
import ToDoList from '../components/ToDoList';
import InputForm from '../components/InputForm';

const fetcher = async() => {
  const remote_server_link = import.meta.env.VITE_SERVER_LINK
    try {
    const res = await axios.get(remote_server_link)
    return res.data
    } catch (error) {
      console.error(error)
    }
  }

export default function ToDoPage(){
    const [list, setList] = useState([]);
    const [task, setTask] = useState('');

    const remote_server_link = import.meta.env.VITE_SERVER_LINK
    const { data, error, isLoading } = useSWR(remote_server_link, fetcher);
    
    useEffect(() => {
      if(data && Array.isArray(data)){
        let testing = data.map(ele => {
          setList(preList => [...preList, {
            client_id: ele.client_id,
            toDo: ele.task,
            completed: false,
            isEditing: false
        }])   
        })   
      }
  
    }, [data])
  
    return(
        <>
            <InputForm
                setList={setList}
                setTask={setTask}
                task={task}
                list={list}
            />
            <ToDoList
                list={list}
                setList={setList}
                currentData={data}
            />
        
        </>
    )
}