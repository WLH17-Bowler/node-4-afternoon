require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swag = require('./controllers/swagCtrl')
const auth = require('./controllers/authCtrl')
const cart = require('./controllers/cartCtrl')
const searchCtrl = require('./controllers/searchCtrl')

const app = express()

let {SERVER_PORT, SESSION_SECRET} = process.env

app.use(express.json())
app.use(
    session({
        session: SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
)
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

// SWAG
app.get('/api/swag', swag.read)
// AUTH
app.post('/api/register', auth.register)
app.post('/api/login', auth.login)
app.post('/api/signout', auth.signout)
app.get('./api/user', auth.getUser)
// CART
app.post('/api/cart/checkout', cart.checkout)
app.post('/api/cart/:id', cart.add)
app.delete('/api/cart/:id', cart.delete)
// SEARCH
app.get('/api/search', searchCtrl.search)

app.listen(SERVER_PORT, () => {
    console.log(`Server pulse ${SERVER_PORT}`)
})