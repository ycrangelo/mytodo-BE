const mongoose = require('mongoose');

 mongoose.connect('mongodb://127.0.0.1:27017/todoList').then(() => {
 console.log('connected in db')
}).catch((err)=>console.log(err))
