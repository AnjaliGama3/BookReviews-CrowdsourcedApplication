var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var dataUtil = require("./data-util");
var _ = require("underscore");
var logger = require('morgan');
var exphbs = require('express-handlebars');
var PORT = 3004;
var app = express();
var handlebars = exphbs.handlebars;
var moment = require('moment');
var marked = require('marked');

var _DATA = dataUtil.loadData().book_reviews; //changed THIS

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
//CHANGE THIS TO: don't
app.engine('handlebars', exphbs({ defaultLayout: 'main', partialsDir: "views/partials/" }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

 //replace tags with type

 //I need 8 total endpoints

 //1 for homepage
app.get('/',function(req,res){
  var types = dataUtil.getAllTypes(_DATA);
  res.render('home',{
    data: _DATA,
    types: types
  });
  
})



app.get('/slug/:inslug',function(req,res){
  var types = dataUtil.getAllTypes(_DATA);
  var inslug = req.params.inslug;
  var posts = [];
  _DATA.forEach(function(post) {
    
      if (post.slug.localeCompare(inslug) === 0) {
          posts.push(post);
      }
  });
  res.render('home',{
    data: posts,
    types: types
  });
  
})

//1 for navigation filter

app.get('/type/:intype',function(req,res){

  var types = dataUtil.getAllTypes(_DATA);
 // console.log(types);
  
  var intype = req.params.intype;
//  console.log(intype);
  var posts = [];
  _DATA.forEach(function(post) {

      if (post.type.includes(intype)) {
          posts.push(post);
      }
  });
  res.render('home', {
      types: types,
      data: posts,
      
  });
});

app.get('/rate/topRated',function(req,res){

  var types = dataUtil.getAllTypes(_DATA);
  //console.log(types);
  
 // var intype = req.params.intype;
//  console.log(intype);
  var posts = [];
  _DATA.forEach(function(post) {
      console.log(post.rating);
      console.log(post.rating)
      console.log(post.rating)
      console.log(post.rating)
      if (post.rating === 5) {
          posts.push(post);
      }
  });
  res.render('home', {
      types: types,
      data: posts,
      
  });
});

app.get('/rate/leastFavorites',function(req,res){

  var types = dataUtil.getAllTypes(_DATA);
  var posts = [];
  _DATA.forEach(function(post) {
      console.log(post.rating);
      console.log(post.rating)
      console.log(post.rating)
      console.log(post.rating)
      if (post.rating === 1) {
          posts.push(post);
      }
  });
  res.render('home', {
      types: types,
      data: posts,
      
  });
});


/*
app.get('/title/Alphabetical',function(req,res){

  var types = dataUtil.getAllTypes(_DATA);

  var posts = [];
  _DATA.forEach(function(post) {
          posts.push(post);
          console.log(posts.sort((a,b) =>- a.rating + b.rating));
    
  });
  //posts.sort;
  posts = posts.sort((a,b) => -a.title + b.title);
 
  res.render('home', {
      types: types,
      data: posts,
      
  });
});
*/
app.post('/api/createreview', function(req, res) {
  if(!req.body) { return res.send("No data recieved"); }
  var body = req.body;
  if(body.type && body.title && body.author && body.rating && body.review && body.slug){  
    console.log(req.body);
  
  
 // var body = JSON.parse(JSON.stringify(req.body)); 
  //console.log(body);
  // Transform tags and content 
  if(body.type){
  body.type = body.type.split(" ");
  }
  
  body.rating = Number(body.rating);
 // console.log(body);
  //body.review = marked(body.review);

  // Add time and preview
  //body.preview = body.content.substring(0, 300);
  //body.time = moment().format('MMMM Do YYYY, h:mm a');

  
  _DATA.push(req.body);
  console.log(_DATA);
  dataUtil.saveData(_DATA);
  }else{
    return res.send("No data recieved");
  }

});



app.get("/api/reviews", function(req, res) {
  var types = dataUtil.getAllTypes(_DATA);
  var result = ('home',{
    data: _DATA,
    //types: types
  });
  if (!result) return res.json({});
  res.json(result);
});

//1 for html form
app.get("/create", function(req, res) {
  res.render('create');
});


app.post('/create', function(req, res) {
  var body = req.body;
 // var body = JSON.parse(JSON.stringify(req.body)); 
  //console.log(body);
  // Transform tags and content 
  body.type = body.type.split(" ");
  body.rating = Number(body.rating);
 // console.log(body);
  //body.review = marked(body.review);

  // Add time and preview
  //body.preview = body.content.substring(0, 300);
  //body.time = moment().format('MMMM Do YYYY, h:mm a');

  
  _DATA.push(req.body);
  console.log(_DATA);
  dataUtil.saveData(_DATA);
  res.redirect("/");
});



app.listen(PORT, function() {
    console.log('Listening on port:', PORT);
});
