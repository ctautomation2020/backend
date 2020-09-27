const express=require('express')
import {prisma} from './prisma'

const app=express();
app.use(express.json())

// app.use((req,res,next)=>{
//     res.status(503).send("maintenance error");
  
// })


app.get('/',(req,res)=>{
  res.send("hello world");
})

app.get('/person',async (req,res)=>{
    const persons = await prisma.person.findMany()
    res.send(persons)
})

const PORT=process.env.PORT||3000;


app.listen(PORT,()=>console.log("server is up in" + PORT))