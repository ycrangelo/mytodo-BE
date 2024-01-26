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
 const { userID, title, todo } = req.body;
 const newTodo = await todos.create({ userID, title, todo },)
 //then saving it
 await newTodo.save()
 //sending a response to the client side
 res.status(200)
})
//params (userID,title,todo)

//delete method
router.delete('/delete/userTodos/:userID/:title', async (req, res) => {
 try {
  const userID = req.params.userID;
  const title = req.params.title;
  const result = await yourModel.deleteOne({ userID: userID, title: title });
  res.send(200)
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Failed to delete document' });
 }
})














module.exports = router;