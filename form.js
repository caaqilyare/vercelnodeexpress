const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  database:'testing',
  user: 'root',
  password: ''
});

var database_connection_status = '';

connection.connect(function(error){
   if(error) {
    database_connection_status = 'connection has been lost';
   } 
});

const app = express();
app.use(express.urlencoded());

app.get('/', function (request , response , next) {
    response.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    
        <title>Node Express</title>
      </head>
      <body>
      <br><h1>`+database_connection_status+`</h1> <br>
      <div class="container">
      <br><h1>Simple Form </h1>
      <form method="POST" action="/">
          <div class="mb-3">
            <label class="form-label">First Name</label>
            <input type="text" name="name" id="name" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Last Name</label>
            <input type="text" name="last_name" id="last_name" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label">Email Address</label>
            <input type="text" name="email_address" id="email_address" class="form-control">
          </div>
          <button type="submit" name="submit" id="submit" class="btn btn-primary">Add</button>
        </form>
      </div>
         
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
      </body>
    </html>
    `);
});

app.post('/' , function (request , response , next) {
  response.send(request.body);
});

app.listen(2000);