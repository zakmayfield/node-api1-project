// implement your API here
 const express = require('express'); // import express

 const server = express() // declare our server

 const Users = require('./data/db.js')

 server.use(express.json());


// initial get when running the server
server.get('/', (req, res) => {
  res.json({ server: "Running"})
})

// get users
server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'Servers broken, yo.'})
    })
})
// postman successfully responded with the data of our users

// get a user by id -> utilize req.params.id to get the id of the user
server.get('/api/users/:id', (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: "Servers broke, yo."});
    })
})
// postman successfully returns the user specifeid by the id

// add a new user -> utilize req.body
server.post('/api/users', (req, res) => {
  const userInfo = req.body
  
  Users.insert(userInfo)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'Servers broken, yo.'})
    })
})
// postman successfully added a new user to our users

// delete a user -> utilize req.params.id
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id
  Users.remove(id)
    .then(removedUser => {
      res.status(200).json(removedUser);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'Servers broken, yo.'})
    })
})
// postman successfully removed the desired user


 const port = 5000; // declare our port

 server.listen(port, () => console.log(`\n API listening on port ${port} \n`)); // tell our server to listen on our port