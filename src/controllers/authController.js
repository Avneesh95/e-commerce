const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");



const registerUser = async (req, res) => {

    try
    {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const Hashpassword = await bcrypt.hash(password,10);

        const user =await User.create({
            name : name,
            email : email,
            password : Hashpassword,


            
        })

        res.status(201).json({
            message :"user registered successfully"
        })


    }

    catch(err)
    {
    
        console.log(err);
        
      res.status(500).json({
      success: false,
      message: err.message,
    });
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password" });
    }
    const user = await User.findOne({email});

    if(!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.status(201).json({ message: "Login successful", token });



    console.log("User:", user);
console.log("User ID:", user._id);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
}



module.exports = {
    registerUser,
    loginUser
};