import express from 'express';
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()


router.get('/', async(req, res) => {

    try {
        const allTasks = await prisma.post.findMany()
        if(allTasks){
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
        const getObject = await prisma.post.findFirst({
            where: {
                client_id: client_id
            }
        })
        res.send(getObject); 
        
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {

        const {client_id, task} = req.body
        
        const addTask = await prisma.post.create({
            data: {
                task: task,
                client_id: client_id
            }
        }) 
    
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
        const {client_id, task, old_id} = req.body


        const initalTask = await prisma.post.findFirst({
            where:{
                client_id: client_id
            }
        })
        const findObject = await prisma.post.findFirst({
            where: {
                client_id: old_id
            }
        })


        const updateTask = await prisma.post.update({
            where: {
                id: findObject.id,
            },
            data: {
              task: task,
              client_id: client_id
            }
          })
    
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
        const findObject = await prisma.post.findFirst({
            where: {
                client_id: client_id
            }
        })
        const deletePost = await prisma.post.delete({
            where: {
                id: findObject.id
            }
        })
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