import express from "express";
import jwt from "jsonwebtoken";
import users from "./users.js";
import bcrypt from "bcrypt";

const JWT_SECRET = "your_secret_key";
const todos=[];
const app=express();
app.use(express.json());


app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    role: role || "user"
  }
  
users.push(newUser);
  res.status(201).json({ message: "User registered successfully" });
});





app.post("/login",async(req,res)=>
{
  const {username,password}=req.body;
  const user=users.find(u=>u.username===username);
  if(!user || !(await bcrypt.compare(password,user.password)))
  {
    return res.status(401).json({message:"invalid credentials"});
  }


const payload={
    sub:  user.id,
    name: user.username,
    role: user.role
};

const token =jwt.sign(payload,JWT_SECRET,{
    expiresIn:"1h"});

    res.json({accessToken:token});
});
 

//Middleware

function authenticateToken(req,res,next)
{
    const header=req.headers["authorization"];
    const token=header && header.split(" ")[1];
    if(token==null)
    {
        return res.sendStatus(401);
    }
    jwt.verify(token,JWT_SECRET,(err,user)=>
    {
        if(err)
        {
            return res.sendStatus(403);
        }
        req.user=user;
        next();
    });
}
//Protected route

app.get("/api/secret-quote",authenticateToken,(req,res)=>
{
    res.json({
        message:`Welcome ${req.user.name}`,
        userdata:req.user
    });
    });

    function authorizeAdmin(req,res,next){
        if(req.user.role!=="admin")
        {
            return res.status(403).json({message:"access denied:admins only"});
        }
        next();
        }
        app.get("/admin/data",authenticateToken,authorizeAdmin,(req,res)=>
        {
            res.json({
               message:"welcome to admin panel",
               secretdata:"This is top-secret admin information"

            });
        });
    

app.get("/api/todos",authenticateToken,(req,res)=>
{
    const usertodos=todos.filter(t=>todos.userID===req.user.sub);
    res.json(usertodos);
});


app.post("/api/todos",authenticateToken,(req,res)=>
{
    const {task}=req.body;
    const newtodo={
        id:todos.length+1,
        task,
        userID:req.user.sub
    };
    todos.push(newtodo);
    res.status(201).json(newtodo);
    });

app.delete("/api/todos/:id",authenticateToken,(req,res)=>
    {
        const todoid=parseInt(req.params.id,10);
        const index=todos.findIndex(v=>v.id===todoid && v.userID===req.user.sub);
        if(index===-1)
        {
            return res.status(403).json({message:"delete only available todos"});

        }
        todos.splice(index,1);
        res.json({message:"todo deleted"});
    });






 const PORT=4000;
 app.listen(PORT,()=>
{
    console.log(`Server is running on ${PORT}`);

});