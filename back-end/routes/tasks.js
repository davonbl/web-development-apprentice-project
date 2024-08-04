import express from 'express';
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()


router.get('/', async(req, res) => {

    try {
        const allTasks = await prisma.post.findMany()
        const sortTracks = allTasks.sort((a,b) => a.id - b.id)
        let newID = 1;
        allTasks.forEach(async(ele, i) => {
            if(ele.id !== newID){
                console.log('HELLO WORLD')
                // ele.id = newID
                const updateList = await prisma.post.update({
                    where: {
                      id: ele.id,
                    },
                    data: {
                      id: newID,
                    }
                  })  
            }
                newID++
            console.log('here is the newID: ', newID)
        }) 
        console.log('updated logs: ', allTasks)
        
        res.json(sortTracks)
        // res.json(allTasks)
        // console.log('testing')
        // console.log(allTasks)        
    } catch (error) {
        console.error('Here is the error: ', error)
    }

})

router.get('/tasks/:id', (req, res) => {
    const getId = req.params
    res.send(getId); 
})

router.post('/', async (req, res) => {
    const {id, task} = req.body
    const initalCount = await prisma.post.count()
    const addTask = await prisma.post.create({
        data: {
            id: initalCount + 1,
            task: task
        }
    }) 
    console.log(addTask)

    res.json({
        success: true,
        text: task
    })

})

router.put('/', async(req, res) => {
    const {id, task} = req.body
    const updateTask = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          id: id,
          task: task,
        }
      })

    console.log(updateTask)

    res.json({
          success: true,
          text: 'UPDATED TEXT: ' + task
      })
})

router.delete('/', async(req, res) => {

    const {id} = req.body; 
    // const allTasks = await prisma.post.findMany()
    // console.log('here are the tasks: ', allTasks)
    const deletePost = await prisma.post.delete({
        where: {
            id: id
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
    
    res.json({
        success: true,
        text: 'text has been deleted'
    })
})



export default router