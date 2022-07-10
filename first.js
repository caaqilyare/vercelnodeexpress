// load hhtp module

const http = require('http');

//create server

http.createServer((request, response) => {
    response.writeHead(200, {
        'Contant-Type' : 'text/html'
    }); 
    response.write('<h1>Hi its my frist time to make my own server node js</h1>');
    response.end();
} ).listen(2000);