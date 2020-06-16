const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register.js')
const signin = require('./controllers/signin')
const profile = require('./controllers/profileGet')
const image = require('./controllers/image.js')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'colaad18',
        database: 'smart-brain'
    },
});


const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => { res.send(db.users) })

app.post('/register', register.handleRegister(db, bcrypt))

app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.put('/imageUrl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => {
})