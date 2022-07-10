var express = require('express');

var router = express.Router();

var database = require('../db');

router.get("/", function(request, response, next){

  if ( request.session.user_id ) {
    var query = "SELECT * FROM sample_data ORDER BY id DESC";
    database.query(query, function (error , data) {
        if (error) {
            throw error ;
        } else {
			response.render('sample_data', {title:'Waa Node.js Iyo MySQL CRUD Application', action:'list', sampleData:data ,session : request.session  ,  message:request.flash('success')});
		}
    });
  } else {
    response.redirect("/");
  }

});

router.get("/add", function(request, response, next){

    if (request.session.user_id) {
	    response.render("sample_data", {title:'Insert Data into MySQL', session : request.session  , action:'add'});
    } else {
        response.redirect("/");
    }
});

// add post

router.post("/add_sample_data" , function (request , response , next ) {
    var name = request.body.name;
    var last_name = request.body.last_name;
    var age = request.body.age;
    var gender = request.body.gender;
    var query = `
    INSERT INTO sample_data (id, first_name, last_name, age, gender) VALUES (NULL, "${name}", "${last_name}", "${age}", "${gender}")`;
    database.query(query,function (error , data ){
        if (error) {
            throw error ;
        } else {
            request.flash('success' , 'Sample Data Inserted');
            response.redirect("/sample_data");
        }
    })
});



router.get("/edit/:id" , function (request , response , next) {
    var id = request.params.id;

    var query = (`SELECT * FROM sample_data WHERE id = "${id}"`);
    database.query(query , function (error , data ) {
      response.render('sample_data' , {title : 'Edit Table' , action: 'edit', session : request.session  , sampleData:data[0]});
    })
});

//search post

router.get('/get_data', function(request, response, next){

    var search_query = request.query.search_query;

    var query = `
    SELECT * FROM sample_data 
    WHERE first_name LIKE '%${search_query}%' 
    LIMIT 10
    `;

    database.query(query, function(error, data){

        response.json(data);

    });

});

//find post

router.get("/find/:id", function ( request , response , next ) {
    var id = request.params.id ;
    var query = `SELECT * FROM sample_data WHERE first_name = "${id}"`;
    database.query(query , function (error , data ) {
        response.render('sample_data' , {title : 'Find Method' , action: 'find', session : request.session  , sampleData:data[0]});
    })
});


// edit post
router.post("/edit_done/:id" , function (request , response , next ) {
    var id = request.params.id;

    var name = request.body.name;
    var last_name = request.body.last_name;
    var age = request.body.age;
    var gender = request.body.gender;
    var query = `
	UPDATE sample_data 
	SET first_name = "${name}", 
	last_name = "${last_name}", 
	age = "${age}", 
	gender = "${gender}" 
	WHERE id = "${id}"
	`;
    database.query(query,function (error , data ){
        if (error) {
            throw error ;
        } else {
            request.flash('success' , 'Sample Data Updated');
            response.redirect("/sample_data");
        }
    })
});

// delete post

router.get("/delete/:id" , function (request , response , next ){
    var id = request.params.id;
    if (request.session.user_id) {
         var query = `DELETE FROM sample_data WHERE id = "${id}"`;
    }
   
    database.query(query, function(error , data ) {
        if (error) {
            request.flash('success' , 'You dont have permesion to do this');
            response.redirect("/sample_data");
        } else {
            request.flash('success' , 'Sample Data Deleted');
            response.redirect("/sample_data");
        }
    })
})

module.exports = router;