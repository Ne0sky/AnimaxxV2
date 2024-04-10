import dotenv from 'dotenv';
import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const PORT = process.env.PORT || 3000;
import session from 'express-session';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import userdb from './models/UserSchema.js';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

dotenv.config();

try {
    mongoose.connect(process.env.DATABASE)
    console.log("db connected")
} catch (error) {
    console.log("Error:", error);
}

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }));

app.use(express.json());

//session setup
app.use(session
    ({
        secret: "sejanunujn5654*jun7kb#kjb",
        resave: false,
        saveUninitialized: false,
    }));

//setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ['email', 'profile'],
},
    async (accessToken, refreshToken, profile, done)=> {
        // console.log("profile:",profile);
        try{
            const user = await userdb.findOne({googleId: profile.id});
            if(user){
                done(null, user);
            }else{
                const newUser = new userdb({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value,
                });
                await newUser.save();
                done(null, newUser);
            }
        }catch(err){
            console.log(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

//initialize google auth login
app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', 
    { successRedirect: 'http://localhost:5173/search',
    failureRedirect: 'http://localhost:5173/login'}),
    );

app.get('/login/success', async (req, res) => {
    if(req.user){
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            message: "User Authenticated",
            token,
            user: {
                id: req.user._id,
                email: req.user.email,
                displayName: req.user.displayName,
                image: req.user.image,
            },
        });
       }
    else{
        res.status(400).json({
            message: "User Not Authenticated",
        });
    }
    
});

app.get('/logout', (req, res) => {
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect('http://localhost:5173');
    }
    );
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});