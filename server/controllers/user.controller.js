const User = require('../model/user.model.js');
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken');
const transporter = require('../utils/sendEmail.js');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name , email , password)
 
    const isUserExist = await User.findOne({ email });
 
    console.log(isUserExist);
 
    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: `You have already account with this email ${email}`,
      });
    }
 
    const hashedPassword = await bcrypt.hash(password , 10);
 
 
    const user = await User.create({
      name,
      email,
      password : hashedPassword
    });

    //NOTE send a email on successfull registration :
await transporter.sendMail({
  from : process.env.SMTP_USER,
  to : email ,
  subject  : "Registration Success",
  html : `<p>Welecome ${user.name} to nexus</p> <p>Your account is successfully created</p>`
 
})
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message : error.message
    })
  }
};
 
 
 
// exports.login = async (req, res) => {
//   try {
//   } catch (error) {}
// };
 
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
 
    //check if user exist if exist then check the password :
    const user = await User.findOne({ email });
    console.log(user);
 
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `You do not have any account with this email ${email} , Please create an account and try again.`,
      });
    }
//match the passowrd

    //match the passowrd
    const isPasswordMatch = await bcrypt.compare(password, user.password);
 
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: 'Password do not match',
      });
    }
 
    const token = jwt.sign(
      { name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET_STRING,
      {
        expiresIn: process.env.JWT_EXPIRES ,
      }
    );
    res.status(200).json({
      success: true,
      message: 'Login successfull',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message : error.message
    })
  }
};
 
 