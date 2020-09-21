const express=require('express')
require('./db/mysql')

const app=express();
app.use(express.json())

//maintenance mode
// app.use((req,res,next)=>{
//     res.status(503).send("maintenance error");
// })

// sample get
app.get('/',(req,res)=>{
  res.send("get req");
})

//sample post
app.post('/',(req,res)=>{
  res.send("post req")
})

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>console.log("server is up in" + PORT))

