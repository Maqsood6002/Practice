const mysql=require('mysql');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crude_app'
});

connection.connect(err=>{
    if(err){
        console.error('Error connecting to mysql:'.err);
        return;
    }
    console.log('Connected to mysql');
});
module.exports=connection;