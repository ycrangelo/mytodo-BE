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


app.use(cors({
   origin:'http://localhost:5173/',
}));
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
         mongoUrl: 'mongodb+srv://angeloyocoryocor:angeloyocoryocor@cluster0.p13owno.mongodb.net/?retryWrites=true&w=majority',
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