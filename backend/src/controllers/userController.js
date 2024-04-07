// src/controllers/userController.js
import bcrypt from 'bcryptjs';
import passport from 'passport';
import '../config/passportConfig.js';
import { startPeriodicChecks } from '../config/periodicTask.js';
import User from '../models/user.js';
export const signupUser = async (req, res) => {
    try {
        const { username, password, email,isDeveloper} = req.body;
        console.log("dev="+isDeveloper);
        if (!(username && password && email)) {
            return res.status(400).json({ error: 'Username, password, and email are required' });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const bugreport={
          bug:"",
          status:""
      }
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            isDeveloper:isDeveloper,
            bugtosolve: [bugreport]
        });

        await newUser.save();

        // Prepare the response, excluding the password
        const userForResponse = { ...newUser.toObject() };
        delete userForResponse.password;
        res.status(201).json(userForResponse);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error', details: err });
    }
};


export const loginUser = async (req, res, next) => {
  console.log('logging in');
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err){ return next(err);
      }else{
      startPeriodicChecks();
      return res.status(200).json({ message: 'Logged in successfully' });
  }});
  })(req, res, next);
};

export const logoutUser = async (req, res) => {
  console.log('logging out');
  req.logout(function(err) {
      if (err) { return next(err); }
      res.status(200).json({ message: 'Logged out successfully' });
  });
}
export const currentUser = async (req, res) => {
  console.log("Current user: " + req.isAuthenticated());
  if (req.isAuthenticated()) {
      // User is authenticated, send back user details
      // Exclude sensitive information if necessary
      const { password, ...userWithoutPassword } = req.user.toObject();
      res.status(200).json({ user: userWithoutPassword });
  } else {
      // User is not authenticated
      res.status(401).json({ message: 'User is not authenticated' });
  }
}

export const bugList = async (req, res) => {
  console.log("Current user: " + "mere");
  if(req.isAuthenticated()){
    const user = req.user;
    console.log("user="+user);
    res.status(200).json(user.bugtosolve);
}};