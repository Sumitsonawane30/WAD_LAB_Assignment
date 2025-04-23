const express = require("express")

const app = express();

// app.get('/',(req,res)=>{
//     res.send("this is responding")
// })

app.use(express.static("public"))
app.listen(5000, ()=>{
    console.log("port is listening at 5000!!!")
})


