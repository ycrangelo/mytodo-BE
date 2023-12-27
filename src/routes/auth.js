const { Router } = require('express');
const router = Router();
const passport = require('passport')
const user = require('../database/schema/localUser')
const {hashPass} = require('../utils/bcrypt')


router.get('/discord', passport.authenticate('discord'), (req, res) => {
  console.log('auth discord')
    const USER = req.user;
  // Send username to the client
  res.status(200).send({ USER });
})

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
  console.log('auth discord')
  const USER = req.user;
  res.status(200).send({ USER });
})
router.get('/facebook', passport.authenticate('facebook'), (req, res) => {
  console.log('auth discord')
  const USER = req.user;
  res.status(200).send({ USER });
});

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  console.log('auth discord')
  const USER = req.user;
  res.status(200).send({ USER });
});

router.post('/register', async (req, res) => {
  //distructuring the req body
  //finding the user post if it is already exist
  //finding by username and email(storing it in userDB)
  try {
    //distructuring the req body
    const { email } = req.body
    console.log('hi')
    //finding the user post if it is already exist
    //finding by username and email(storing it in userDB)
    const userDB = await user.findOne({ $or: [{ email }] });

    // checking it  if it is truthy( if it has duplicates)
    console.log('h2i')
    if (userDB) {
      //sending a 401 and a message
      res.status(401)
      res.send('user already exist')
    } else {
      const password = hashPass(req.body.password)
      console.log(password)
      //if it is not exist, we creating it in the DB
      const newUser = await user.create({ password, email },)
      //then saving it
      await newUser.save()
      //sending a response to the client side
      res.status(201)
    }
  } catch (error) {
    console.log(error)
  }
})


router.post('/login', passport.authenticate('local'), (req,res) => {
  console.log('logged in')
  const user = req.user;
  res.status(200).send({ user });
})


module.exports =router