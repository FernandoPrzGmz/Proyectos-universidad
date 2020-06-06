# Backend
## Sample Application
Let’s say we are going to build a CRM (Customer Relations Management) tool. This would mean
that we would need to be able to manage and handle CRUD on the users in our database. Users will
be the main thing we will focus on when building this API and in a few chapters, Angular will build
the frontend views that will access our Users API.
Let’s build an API that will:
- Handle CRUD for an item (users)
- Have a standard URL (http://example.com/api/users and http://example.com/api/users/:user_-id)
- Use the proper HTTP verbs to make it RESTful (GET, POST, PUT, and DELETE)
- Return JSON data
- Log all requests to the console

## Getting Started
Let’s look at all the files we will need to create our API. We will need to define our Node packages,
start our server using Express, define our model, declare our routes using Express, and last but
not least, test our API.
Here is our file structure. We won’t need many files and we’ll keep this very simple for demonstration
purposes. When moving to a production or larger application, you’ll want to separate things out into
a better structure (like having your routes in their own file). We’ll go over file structure and best
practices later in the book.

```
1 - app/
2 --- models/
3 ------ user.js // our user model
4 - node_modules/ // created by npm. holds our dependencies/packages
5 - package.json // define all our node app and dependencies
6 - server.js // configure our application and create routes

```

## Defining our Node Packages (package.json)
As with all of our Node projects, we will define the packages we need in package.json. Go ahead
and create that file with these packages.
```json
{
  "name": "node-api",
  "main": "server.js",
  "dependencies": {
    "morgan": "~1.5.0",
    "express": "~4.10.3",
    "body-parser": "~1.9.3",
    "mongoose": "~3.8.19",
    "bcrypt-nodejs": "0.0.3"
  }
}
```
