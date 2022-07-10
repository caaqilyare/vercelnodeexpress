const mysql = require('mysql');

const connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  database:'testing',
  user: 'root',
  password: ''
});


connection.connect(function(error){
   if(error) {
    console.log('Mysql is working not good'); 
   } else {
    console.log('Mysql is working good');
   }
});

module.exports = connection;