'user strict';
// load the express package and create our app
const express = require('express'),
      app     = express(),
      path    = require('path');

// send our index.html file to the user for the home page
app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname + '/index.html'));
});

/**
 *  Routing Node Applications
 */

// create routes for the admin section
// get an instance of the router
const adminRouter = express.Router();

// route middleware that will happen on every request
adminRouter.use( (req, res, next) =>{
  // log each request to the console
  // Cada vez que accedamos a las rutas nos imprimia el metodo y la url
  console.log(req.method, req.url);
  // continue doing what we were doing and go to the route
  next();
});



adminRouter.param('name', (req, res, next, name) =>{
  // do validation on name here
  // blah blah validation
  // log something so we know its working
  console.log('doing name validations on ' + name);
  // once validation is done save the new item in the req
  req.name = name;
  // go to the next thing
  next();
});
// route with parameters (http://localhost:1337/admin/users/:name)
adminRouter.get('/hello/:name', (req, res) => {
  res.send('hello ' + req.name + '!');
});



// admin main page. the dashboard (http://localhost:1337/admin)
adminRouter.get('/', (req, res) => {
  res.send('I am the dashboard!');
});

// users page (http://localhost:1337/admin/users)
adminRouter.get('/users', (req, res) => {
  res.send('I show all the users!');
});
// posts page (http://localhost:1337/admin/posts)
adminRouter.get('/posts', (req, res) => {
  res.send('I show all the posts!');
});

// apply the routes to our application
app.use('/admin', adminRouter);
// We can now access the admin panel page at http://localhost:1337/admin and the sub-pages at http://localhost:1337/admin/users and http://localhost:1337/admin/posts.

 // start the server
 app.listen(1337);
 console.log('1337 is the magic port!');
