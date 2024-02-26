import express from "express";
import mysql from "mysql";
import cors from "cors"
const app=express();
app.use(express.json())
app.use(cors())

const db=mysql.createConnection({
    host:"bhd3wiuhdycwupzxy8zj-mysql.services.clever-cloud.com",
    user:"ufwjujr9vslbyhzy",
    password:"PHrJOcBEvcDBQQyCW8gy",
    database:"bhd3wiuhdycwupzxy8zj"
})

app.get("/emp",(req,res)=>{
    const q="select * from summa"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return  res.json(data)
    })
})

app.get("/upd/:id",(req,res)=>{
    // console.log(params.id)
    const q="select * from summa where id= ?"
    const id=[req.params.id]    
    db.query(q,id,(err,data)=>{
        if(err) return res.json(err)
        // console.log(data)
        return  res.json(data)
    })
})

app.put("/upd/:id",(req,res)=>{
    const empid=req.params.id;
    console.log(empid)
    const q=`UPDATE summa SET name="${req.body.name}",dept="${req.body.dept}",dob="${req.body.dob}",gender="${req.body.gender}",des="${req.body.des}",salary=${req.body.salary} WHERE id="${empid}"`
    db.query(q,(err,data)=>{    
        if(err) return res.json(err)
        return res.json("Employee updated successfully")
    })
})

app.post("/add",(req,res)=>{
    const q="insert into summa (name,id,dept,dob,gender,des,salary) values (?,?,?,?,?,?,?)"
    const values=[req.body[0].name,req.body[0].id,req.body[0].dept,req.body[0].dob,req.body[0].gender,req.body[0].desg,req.body[0].salary];
    // console.log(req.body[1])
    if(values[0]==="") return res.json("0");
    else if(values[1]==="") return res.json("1");
    else if(values[2]==="") return res.json("2");
    else if(values[3]==="") return res.json("3");
    else if(values[3]>req.body[1]) return res.json("8")
    else if(values[4]==="") return res.json("4");
    else if(values[5]==="") return res.json("5");
    else if(values[6]==="") return res.json("6");
    else if(values[6]>99999999||values[6]<0) return res.json("7");
    db.query(q,values,(err,data)=>{
        if(err) return res.json(err)
        // console.log("yes")
        return res.json("Added")
    })
})

app.delete("/del/:id",(req,res)=>{
    const empid=[req.params.id];
    // console.log(empid)
    const q=`DELETE FROM summa WHERE id= ?`
    // console.log(q)
    db.query(q,empid,(err,data)=>{
        if(err){
            // console.log(err) 
            return res.json(err)
        }
        // console.log("yes")
        return res.json(data) 
    })
})

app.get("/",(req,res)=>{
    return res.json("HELLO  d")
})

app.listen(5500,()=>{
    console.log("Connected to Server")
    // return res.json("HELOOOOOOOOOOOO")
})