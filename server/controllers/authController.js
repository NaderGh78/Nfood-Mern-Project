const asynHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const { UserModel, validateRegisterUser, validateLoginUser } = require("../models/UserModel");

/*===========================================*/
/*===========================================*/
/*===========================================*/

/**
 *@desc register new user 
 *@route /api/auth 
 *@method Post
 *@access public
*/
const register = asynHandler(

    async (req, res) => {

        const { error } = validateRegisterUser(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "user already exist" });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        await user.save();

        // 5 - send response to client
        res.status(201).json({ message: "Successful Registration ,please Log In" });
    }
);

/*===========================================*/

/**
 *@desc login new user 
 *@route /api/auth 
 *@method Post
 *@access public
*/
const login = asynHandler(

    async (req, res) => {

        // 1. validation
        const { error } = validateLoginUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // 2. is user exist
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "invalid email or password" });
        }

        // 3. check the password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "invalid email or password" });
        }

        // 4. generate the token (jwt)
        const token = user.generateToken();

        // 5. send response to client
        res.status(200).json({
            _id: user._id,
            isAdmin: user.isAdmin,
            token,
            profilePhoto: user.profilePhoto,
            username: user.username,
            email: user.email
        })
    }
);

module.exports = {
    register,
    login
}