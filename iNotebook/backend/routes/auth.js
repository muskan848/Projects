const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');
const jwt = require('jsonwebtoken');
//after creating user , every user assigned with a token
// token is a given to verify the user

//web token signature
const JWT_SECRET = "Muskanis@g00dgir!";

//Route 1---------------------------------------------------------------------------------->

//POST is a request method supported by HTTP used by the World Wide Web. The HTTP POST method sends data to the server
//create user using post "/api/auth/createuser"
router.post('/createuser', [
    //vallidations
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be of 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    let success = false;

    // if there are error return bad req and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        //check the uniqueness of the email
        let user = await User.findOne({ email: req.body.email });
        //if user is already present
        if (user) {
            return res.status(400).json({ success, error: 'Sorry , a user with this email already exists' })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //else create a new user after checking uniqueness and all vallidations
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        //web token

        // web token data
        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, JWT_SECRET);
        // res.send(req.body);
        success = true;
        res.json({ success, token });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }

})


//Route 2---------------------------------------------------------------------------------->

//authentucate a user post "/api/auth/login" .no login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should not be empty').exists(),

], async (req, res) => {
    // if there are error return bad req and errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: req.body.email });

        //if user is not present
        if (!user) {

            return res.status(400).json({ success, error: 'Please try to login with coreect credentials' })
        }

        //check if password is correct or not
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {

            return res.status(400).json({ success, error: 'Please try to login with coreect credentials' })
        }


        //login successfully
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({ success, token });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');

    }

})


//Route 3---------------------------------------------------------------------------------->
//get logged in user details using post "/api/auth/getuser"  login required

//fetchuser->middleware function with help of which we can get user details by jwt token
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")  //select all data of user except password
        res.send(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');

    }

})

module.exports = router

