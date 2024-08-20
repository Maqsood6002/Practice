const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const session=require('express-session');

const app=express();
const port=process.env.port||3000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'static')));

app.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            console.error('Session Time over',err);
            return;
        }
        res.redirect('/');
    });
});

app.get('/dashboard',(req,res)=>{
    if(!req.session.userID){
        res.redirect('/login');
        return;
    }
    db.query('SELECT* FROM USER WHERE ID=?',[req.session.userID],(err,result)=>{
        if(err){
            console.error('Database error',err);
            return;
        }
        const user=results[0];
        res.render('dashboard',{user});
    });
});
