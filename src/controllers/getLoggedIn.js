const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");   


const profile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
        success: true,
        user,
    });
}