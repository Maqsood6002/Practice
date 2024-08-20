const express=require('express');
const path=require('path');
const db=require('./dbConfig');

const app=express();
const port=process.env.port||3000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    db.query('SELECT* from users',(err,results)=>{
        if(err){
            console.error('Database query error',err);
            return;
        }
        const data=results;
        res.render('dataRecord',{data});
    });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});