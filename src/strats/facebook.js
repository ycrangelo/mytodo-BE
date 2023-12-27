const passport = require('passport');
const { Strategy } = require('passport-facebook')
const facecbook_user = require('../database/schema/facebookUser')
require('dotenv').config()





//this is the uder teh hood auth in passportjs

//serializing user
passport.serializeUser((user, done) => {
  console.log('serializing user')
  console.log(user)
  //sending done, with a null error and user.id
  done(null, user.id)
})

//deserializing user
//means if the user is already login
//and want to get req
//it will not require to login again
//we using async/await becuase of getting the mongodb
passport.deserializeUser(async(id, done) => {
  console.log('deserializing user') 
  console.log(id)
  try {
    const facebookUser = await facecbook_user.findById(id)
    //cheking if it is empty
    //the id is from the session
    if (!facebookUser) throw new error('no user')
    console.log(facebookUser)
    //sending a done with null errors,and userid
    done(null,facebookUser)
  } catch (error) {
    console.log(error)
    done(error,null)
  }
})


//this is for trategy in discord login
passport.use(
  //defining the needs
  //parameter
  new Strategy(
    {
      clientID: '6856700447738880',
      clientSecret: 'f69072767881ea2eae3c84ca7fdf2ecd',
      callbackURL: 'https://todolist-lbt3.onrender.com/api/user/facebook/redirect',
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    //verify function
    //in this function
    //create a user
    //found user
    async (accessToken, refreshToken, profile, done) => {
      try {

        console.log(accessToken, accessToken)
        console.log(profile)
        console.log(profile.id)

        //finding the same id in mongoDB
        const facebookUser = await facecbook_user.findOne({ facebookID: profile.id, });
        console.log('hello!')
        if (facebookUser) {
          console.log('hello2!')
          console.log('found user!')
          console.log(facebookUser)
          return done(null, facebookUser)
        } else {
          //creating a new user in db
          const newUser = await facecbook_user.create({
            facebookID: profile.id,
            facebookNAME: profile.displayName,
          });
          console.log('created a new user')
          return done(null, newUser)
        }
      } catch (error) {
        console.log('heelow')
        return done(error, null)
      }
    })
)