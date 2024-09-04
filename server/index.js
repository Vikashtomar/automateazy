import express from 'express'
import connection from './db/connection.js'
import cors from 'cors'

const app = express()
const port = 8000;
app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(cors({origin:"http://localhost:5173"}))

connection.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port: ${port}`)
    })
})