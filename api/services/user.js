const mongoose = require('mongoose')
const User = require('../model/user');
const bcrypt = require('bcrypt');
const CustomError = require('../custom.error');
const nodemailer = require('nodemailer');
require('dotenv').config()
class UserService {

    async signup(data) {
        const { email, password } = data
        let user = await User.findOne({ email: email })
        if (user) throw new CustomError("Email already exists");
    
        
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        if(!hashed)throw new CustomError('error occured')
        user = new User({
            _id: mongoose.Types.ObjectId(),
             email: email,
             password:hashed
            })
        const token = user.generateAuthToken();
        await user.save();
        
        return {
         user: user,
         token: token
        };
    }
     
    async login(data) {
        const { email, password } = data
        if (!email) throw new CustomError("Email is required");
        if (!password) throw new CustomError("Password is required");

        const user = await User.findOne({ email:email });
        if (!user) throw new CustomError("Incorrect email or password");
    
        const isTrue = await bcrypt.compare(password, user.password)
        if (!isTrue) throw new CustomError("Incorrect email or password");
    
        const token = user.generateAuthToken();
    
        return data = {
          user: user,
          token: token
        };
      }
      
async mailer(data){
 const {from, to, subject, text} = data;
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {

    user: process.env.user,
    pass: process.env.pass
  }
});

var mailOptions = {
  from: from,
  to: Array.isArray(to) ? to.join() : to,
  subject:subject,
  text: text
};
var mail = await transporter.sendMail(mailOptions);
if(!mail){
  throw new  Error("Something went wrong")
}
return mail.response;
}
   
      async delete(id) {
        const user = await User.remove({ _id: id });
        return user
    }

}

module.exports = new UserService();
