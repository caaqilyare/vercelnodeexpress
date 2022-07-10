var express = require('express');

var router = express.Router();

var database = require('../db');


router.get("/" , function (request , response , next ) {
  response.render('index', { title: 'Express', session : request.session , message:request.flash('success') });
});

router.post('/login', function(request, response, next){

  var user_email_address = request.body.user_email_address;

  var user_password = request.body.user_password;

  if(user_email_address && user_password)
  {
      query = `
      SELECT * FROM user_login 
      WHERE user_email = "${user_email_address}"
      `;

      database.query(query, function(error, data){

          if(data.length > 0)
          {
              for(var count = 0; count < data.length; count++)
              {
                  if(data[count].user_password == user_password)
                  {
                      request.session.user_id = data[count].user_id;

                      response.redirect("/");
                  }
                  else
                  {
                    request.flash('success' , 'Incorrect Password');
                    response.redirect("/");

                  }
              }
          }
          else
          {
            request.flash('success' , 'Incorrect Email Address');
            response.redirect("/");
          }
          response.end();
      });
  }
  else
  {
      response.send('Please Enter Email Address and Password Details');
      response.end();
  }

});

router.get('/logout', function(request, response, next){

  request.session.destroy();

  response.redirect("/");

});

module.exports = router;
