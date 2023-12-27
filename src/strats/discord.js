const passport = require('passport');
const { Strategy } = require('passport-discord')
const discord_user = require('../database/schema/discordUser')





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
    const dcUserID = await discord_user.findById(id)
    //cheking if it is empty
    //the id is from the session
    if (!dcUserID)  console.log('here is the error')
    console.log(dcUserID)
    //sending a done with null errors,and userid
    done(null,dcUserID)
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
      clientID: '1185581609949335592',
      clientSecret: 'CTrevyeH14jdOT5hJsWOCKkN2ufgbjkx',
      callbackURL: 'http://localhost:3002/api/user/discord/redirect',
      scope:['identify'],
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
        const dcUser = await discord_user.findOne({ discordID: profile.id, });
        console.log('hello!')
        if (dcUser) {
          console.log('hello2!')
          console.log('found user!')
          console.log(dcUser)
          return done(null, dcUser)
        } else {
          //creating a new user in db
          const newUser = await discord_user.create({
            discordID: profile.id,
            discordNAME: profile.username,
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