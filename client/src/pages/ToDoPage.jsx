import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useSWR from "swr";
import axios from "axios";
import ToDoList from '../components/ToDoList';
import InputForm from '../components/InputForm';

const fetcher = async() => {
    try {
    const res = await axios.get('http://localhost:8080')
    return res.data
    } catch (error) {
      console.error(error)
    }
  }

export default function ToDoPage(){
    const [list, setList] = useState([])
    const [task, setTask] = useState('')
  
    const { data, error, isLoading } = useSWR("http://localhost:8080", fetcher);
    
    useEffect(() => {
      console.log('HELLO WORLD')
      console.log('here is the fetched data: ', data)
      // console.log('here are the tasks: ' , data.task)
      if(data && Array.isArray(data)){
        // let testing = data.map(ele => {
        //   console.log(ele.task)
        //   return ele.task
        // })
        let testing = data.map(ele => {
          console.log(ele.task)
          // return ele.task
          setList(preList => [...preList, {
            client_id: uuidv4(),
            toDo: ele.task,
            completed: false,
            isEditing: false
        }])   
        })   
      }
  
    }, [data])
  
    // hadnling data fetching with useSWR in react
  
    console.log('here is the data', data)

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
            />
        
        </>
    )
}