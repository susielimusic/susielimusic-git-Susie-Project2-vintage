const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const FacebookStrategy=require('passport-facebook')
const keys=require('./keys')
const lover=require('../models/lovers')


passport.serializeUser((lover,done)=>{
    done(null,lover.id)
})


passport.deserializeUser((id,done)=>{
    lover.findById(id).then((lover)=>{
        done(null,lover)
    })
})

passport.use(new GoogleStrategy({
    // options for google strategy
    callbackURL:"/auth/google/redirect",
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
        Recycler.findOne({googleId:profile.id}).then((lover)=>{
            if (lover){
                //user already exists then serilize passsword
                console.log("already exist")
                done(null,lover)
            } else {

                

                const imageUrl = profile.photos[0].value.replace("?sz=50", "")

            new lover({
                fullName:profile.displayName,
                firstName:profile.name.givenName,
                lastName:profile.name.familyName,
                userName:profile.displayName,
                googleId:profile.id,
                imageUrl,
                gender:profile.gender
            }).save().then((newlover)=>{
                console.log("user:" + newlover)
                done(null,newlover)
            }).catch(()=>{
                console.log("error")
            })
        }
    })
    console.log(profile)
}))


passport.use(new FacebookStrategy({
    // options for facebook strategy
    callbackURL:"/auth/facebook/redirect",
    clientID:keys.facebook.clientID,
    clientSecret:keys.facebook.clientSecret,
    profileFields: ['id', 'displayName', 'photos', 'email']
},(accessToken,refreshToken,profile,done)=>{
        Recycler.findOne({facebookId:profile.id}).then((lover)=>{
            if (lover){
                //user already exists then serilize passsword
                console.log("already exist")
                done(null,lover)
            } else {
            new lover({
                fullName:profile.displayName,
                firstName:profile.name.givenName,
                lastName:profile.name.familyName,
                userName:profile.displayName,
                facebookId:profile.id,
                imageUrl:profile.photos[0].value,
                gender:profile.gender
            }).save().then((newlover)=>{
                console.log("user:" + newlover)
                done(null,newlover)
            }).catch(()=>{
                console.log("error")
            })
        }
    })
    console.log(profile)
}))