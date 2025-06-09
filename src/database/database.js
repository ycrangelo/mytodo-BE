const mongoose = require('mongoose');

 mongoose.connect('mongodb+srv://lornayocor:cXqrgEX74ex576j3@juntos.n0m0ol6.mongodb.net/?retryWrites=true&w=majority&appName=juntos').then(() => {
 console.log('connected in db')
}).catch((err)=>console.log(err))
