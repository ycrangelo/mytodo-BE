// imports
require('./database/database.js')
require('./strats/discord.js')
require('./strats/facebook.js')
require('./strats/local.js')
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const passport = require('passport')
const mongoStore = require('connect-mongo')
const authUser = require('./routes/auth.js')
const todo = require('./routes/todoList')


const corsOptions = {
  origin:  '*',
  methods: ['PUT', 'GET', 'POST', 'OPTIONS', 'DELETE', 'PATCH'],
};

app.use(cors(corsOptions));


//port/localHost
const PORT = 3002;
app.use(express.json())
app.use(express.urlencoded())

app.use(session(
   {
      secret: 'asudhgausdhgaushd',
      resave: false,
      saveUninitialized: false,
      store: mongoStore.create({
         mongoUrl: 'mongodb+srv://lornayocor:cXqrgEX74ex576j3@juntos.n0m0ol6.mongodb.net/?retryWrites=true&w=majority&appName=juntos',
      }),
   }
))



app.use(cookieParser())
app.use((req, res, next) => {
   console.log(req.method)
   console.log(`${process.env.FACEBOOKCLIENTID}`)
   next()
})

app.use(passport.initialize())
app.use(passport.session())
app.use("/api/user", authUser)
app.use("/api/todos", todo)
app.listen(PORT,()=>console.log('RUNNING IN PORT 3002'))