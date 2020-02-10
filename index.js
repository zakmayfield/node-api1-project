// implement your API here
 const express = require('express'); // import express

 const server = express() // declare our server

 const Users = require('./data/db.js')

 server.use(express.json());


// initial get when running the server
server.get('/', (req, res) => {
  res.json({ server: "Running"})
})

// test GET
server.get('/names', (req, res) => {
  const names = [
    {
      name: 'Joe'
    },
    {
      name: 'Ellie'
    }
  ]
  res.status(200).json(names)
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
//postman successfully added a new user to our users


 const port = 5000; // declare our port

 server.listen(port, () => console.log(`\n API listening on port ${port} \n`)); // tell our server to listen on our port