const express=require('express');
const router=express.router;
const connection=require('../database');

//Home page-List of all items
router.get('/',(req,res)=>{
    connection.query('SELECT* FROM items',(err,result)=>{
        if(err){
            console.error('Error quering item:',err);
            return res.status(500).send('Internal Server error');
        }
        res.render('index',{items:result});
    });
});

//Add item
router.post('/add',(req,res)=>{
    const newitem=req.body.item;
    connection.query('Insert into items (name) values (?)',[newitem],(err)=>{
        if(err){
            console.error('Error adding item:',err);
            return res.status(500).send('Internal Server error');
        }
    });
});