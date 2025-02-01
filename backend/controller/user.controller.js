const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "User already exist" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ success: true, message: "User created successfully" });

    } catch (error) {
        console.log("error in registering user ", error)
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        // console.log("body is ", req.body)
        const { email, password } = req.body;
        const validUser = await User.findOne({ email });
        if (!validUser) return res.status(404).json({ success: false, message: "User Not Found" });
        const validPassword = bcrypt.compare(password, validUser.password);
        if (!validPassword) return res.status(401).json({ success: false, message: "Wrong credentials" })
        const token = jwt.sign({ id: validUser._id, name : validUser.name , email : validUser.email }, 'hamza1');

        return res.status(200).json({ success: true, message: "Login Succesful", token });

    } catch (error) {
        console.log("error in registering user ", error)
    }
}