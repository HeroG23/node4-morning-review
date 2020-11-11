require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const auth = require('./controllers/authController');
const middleware = require('./middleware/middleware');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    }
}).then( db => {
    app.set('db', db)
    console.log(`DB connected`)
});

app.post('/auth/register', middleware.checkUsername, auth.register)
app.post('/auth/login', middleware.checkUsername, auth.login)
app.post('/auth/logout',  auth.logout)
app.get('/api/user', auth.getUser)

app.listen(SERVER_PORT, ()=> console.log(`Server listening on port ${SERVER_PORT}`))