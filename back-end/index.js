import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import tasksRoutes from "./routes/tasks.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

//cors
app.use(cors())
//body-parser
app.use(express.json())

app.use('/', tasksRoutes)

app.listen(PORT, () => {

    // console.log('testing purposes: ' + process.env.PORT)
    console.log(`Server is running on http://localhost:${PORT} \nClick CTRL + C to quit `)

})