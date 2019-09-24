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
  Client.find()
    .then(clients => res.json(clients))
    .catch(err => res.status(400).json(`Error: ${err}`)
    )}
  );

app.post('/db/clients/deleteById/:id', (req, res) => {
  Client.findByIdAndDelete(req.params.id)
      .then(() => res.json('User Deleted'))
});

app.post('/db/clients/newclient', (req, res) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const newUser = new Client({
    firstName,
    lastName,
    email
  })
  
  newUser.save((err, newUser) => {
    if(err) return console.error(err);
    console.log(`added ${newUser}`)
  })
})
