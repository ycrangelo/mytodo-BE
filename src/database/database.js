const mongoose = require('mongoose');

 mongoose.connect('mongodb+srv://angeloyocoryocor:angeloyocoryocor@cluster0.p13owno.mongodb.net/?retryWrites=true&w=majority').then(() => {
 console.log('connected in db')
}).catch((err)=>console.log(err))
