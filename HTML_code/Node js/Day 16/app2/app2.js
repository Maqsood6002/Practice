var express=require('express');
var bodyparser=require('body-parser');
var multer=require('multer');
var upload=multer();
var app=express();
app.get('/',function(req,res){
    res.render('form');
});
app.set('view engine','ejs');
app.set('views','./views');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload.array());
app.use(express.static('public'));
app.post('/',function(req,res){
    console.log(req.body);
    res.send("Rescieve your request");
});
app.listen(3000);