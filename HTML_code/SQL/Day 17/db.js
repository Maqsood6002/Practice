const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const mysql=require('mysql');

const app=express();
const port=process.env.port || 3000;
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'static')));
const db=mysql.createConnection({
    host:"localhost",
    password:"",
    database:"registration"
});
db.connect(err=>{
    if(err){
        console.error('Database connection error:',err);
        return;
    }
    console.log('Connected to database');
});
app.get('/',(req,res)=>{
    res.render('index');
});
app.post('/register',(req,res)=>{
    const {name,email,password}=req.body;
    const newUser={name,email,password};
    db.query('Insert INTO users SET ?',newUser,(err,result)=>{
        if(err){
            console.error('Database insertion error:',err);
            return;
        }
        console.log('User registration:',result);
        res.render('registration success');
    });
});
app.listen(port,()=>{
    console.log('Server is running on port ${port}');
});