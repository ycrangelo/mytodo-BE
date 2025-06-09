const mongoose = require('mongoose');

 mongoose.connect('mongodb+srv://yocorangelo13:cjHDVxnILbyOFpdY@cluster0.cxuo6j0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
 console.log('connected in db')
}).catch((err)=>console.log(err))
