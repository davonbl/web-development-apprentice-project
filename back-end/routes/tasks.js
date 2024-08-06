import express from 'express';
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()


router.get('/', async(req, res) => {

    try {
        const allTasks = await prisma.post.findMany()
        if(allTasks){
                    // const sortTracks = allTasks.sort((a,b) => a.id - b.id)
        // let newID = 1;
        // allTasks.forEach(async(ele, i) => {
        //     if(ele.id !== newID){
        //         console.log('HELLO WORLD')
        //         // ele.id = newID
        //         const updateList = await prisma.post.update({
        //             where: {
        //               id: ele.id,
        //             },
        //             data: {
        //               id: newID,
        //             }
        //           })  
        //     }
        //         newID++
        //     console.log('here is the newID: ', newID)
        // }) 
        // console.log('current table of data: ', allTasks)
        
        // res.json("Here is the current table of data: ", allTasks)
        res.status(200).json(allTasks)      
        }else{
            res.send('the postgres db is not connected b/c you have to connect to the vercel postgres db')
            
        }
    } catch (error) {
        console.error('Here is the error: ', error)
    }

})

router.get('/test', (req,res) => {

    try {
        res.send('this is to test the server')
    } catch (error) {
        console.log('Here is the error: ', error)
    }

})

router.get('/tasks/:client_id', async(req, res) => {

    try {
        const getId = req.params.client_id
        // console.log('Here is the specific object: ', getId)
        // const convertToNum = parseInt(getId)
        const getObject = await prisma.post.findFirst({
            where: {
                client_id: client_id
            }
        })
        // console.log('Here is the object: ', getObject)
        res.send(getObject); 
        
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {

        const {client_id, task} = req.body
        console.log('here is the task data: ', task)
        
        const addTask = await prisma.post.create({
            data: {
                task: task,
                client_id: client_id
            }
        }) 
        console.log("Here is the added task: ", addTask)
    
        res.json({
            success: true,
            text: task
        })
        
    } catch (error) {
        console.error('Here is the error: ', error)
    }

})

router.put('/', async(req, res) => {

      try {
        // const {id, task} = req.body
        const {client_id, task, old_id} = req.body
        // const {client_id} = req.params

        console.log('client_id from req.body: ', client_id)

        const initalTask = await prisma.post.findFirst({
            where:{
                client_id: client_id
            }
        })
        console.log(initalTask)
        //looks like bracket notion works in getting specific data within object
        // console.log("Here is the inital task: ", initalTask['task'])
        const findObject = await prisma.post.findFirst({
            where: {
                client_id: old_id
            }
        })
        console.log('here is the object: ', findObject)

        const updateTask = await prisma.post.update({
            where: {
                id: findObject.id,
            },
            data: {
              task: task,
              client_id: client_id
            }
          })
        // const {initalTask, updatedTask} = req.body
        // const updateTask = await prisma.post.update({
        //     where: {
        //       task: initalTask,
        //     },
        //     data: {
        //     //   id: id,
        //       task: updatedTask,
        //     }
        //   })
    
        console.log('here is the updated data: ', updateTask)
    
        res.json({
              success: true,
              initalText: 'INITAL TEXT: ' + initalTask['task'],
              text: 'UPDATED TEXT: ' + task
          })

        
      } catch (error) {
        console.error('Here is the error: ', error)
      }

})

router.delete('/', async(req, res) => {

    try {
        const {client_id} = req.body; 
        // const allTasks = await prisma.post.findMany()
        // console.log('here are the tasks: ', allTasks)
        const findObject = await prisma.post.findFirst({
            where: {
                client_id: client_id
            }
        })
        console.log('here is the object: ', findObject)
        const deletePost = await prisma.post.delete({
            where: {
                id: findObject.id
            }
        })
        // let newID = 1;
        // const allTasks = await prisma.post.findMany()
        // const sortTracks = allTasks.sort((a,b) => a.id - b.id)
    
        // sortTracks.forEach( async(ele, i) => {
        //     if(ele.id !== newID){
        //         // ele.id = newID
        //         const updateList = await prisma.post.update({
        //             where: {
        //               id: ele.id,
        //             },
        //             data: {
        //               id: newID,
        //             }
        //           })  
        //     }
        //         newID++
        //     }) 
        //     console.log('updated logs: ', allTasks)
        console.log('text has been deleted')
        res.json({
            success: true,
            text: 'text has been deleted',
            deletedPost: deletePost
        })
        
    } catch (error) {
        console.error('Here is the error: ', error)
    }
})



export default router