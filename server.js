const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000 || process.env.PORT;
const db = mongoose.connection;
const dotenv = require('dotenv').config();
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

mongoose.connect(`mongodb://localhost:${dbHost}/${dbName}`, 
  { useUnifiedTopology: true })

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('The DB is ONLINE'));

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => console.log(`Server is running on port ${port}`))

const clientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
})

const Client = mongoose.model('Client', clientSchema);

app.get('/db/clients', (req, res) => {
  Client.find((err, clients) => {
    if(err) return console.error(err);
    console.log(clients)
    res.json(clients)
  })
})

app.post('/db/clients/deleteById/:id', (req, res) => {
  Client.findByIdAndDelete(req.params.id, cb => {
    console.log(cb)
  });
})

app.post('/db/clients/newclient', (req, res) => {
  let newUser = new Client({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  })
  
  newUser.save((err, newUser) => {
    if(err) return console.error(err);
    console.log(`added ${newUser}`)
  })
})