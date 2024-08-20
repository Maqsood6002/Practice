const express=require('express');
const bodyparser=require('body-parser');
const app=express();
const port=process.env.port||3000;
const connection=require('./database');

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

const indexRoutes=require('./routes/index');
app.use('/',indexRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});