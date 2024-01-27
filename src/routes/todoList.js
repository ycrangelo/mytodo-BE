const { Router } = require('express');
const router = Router();
const todos = require('../database/schema/todos')



//adding a auth in the groceries route
// router.use((req, res, next) => {
//  console.log('req,inside the groceries router')
//  console.log(req.user)
//  //checking if the req.user has a laman
//  if (req.user) {
//   next();
//  } else {
//   console.log(req.user)
//   res.status(401).send('unothorized')
//  }
// })

//get method
router.get('/get/userTodos/:userID', async (req, res) => {
 const { userID } = req.params
 const userDB = await todos.find({ userID: userID });
 console.log(userDB)
 res.status(200).send(userDB)
})

//crate method
router.post('/post/userTodos', async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    const { userID, title, todo } = req.body;
    const newTodo = await todos.create({ userID, title, todo });
    await newTodo.save();

    // Sending a response to the client side with data
    res.status(201).json({ message: 'ok', todo: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

//params (userID,title,todo)

//delete method
router.delete('/delete/userTodos/:_id', async (req, res) => {
  try {
     res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    const userID = req.params.userID;
    const title = req.params.title;
    const result = await todos.deleteOne({ _id: _id });
    res.status(201).json({ message: 'ok' }); // Corrected response method
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});














module.exports = router;