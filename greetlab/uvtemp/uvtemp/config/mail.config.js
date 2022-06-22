const nodemailer = require("nodemailer");

let testAccount = nodemailer.createTestAccount(); 

let transporter = nodemailer.createTransport({
    host :  "smtp.gmail.com",
    port : 465 ,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'pratik.c@morphedo.com',
      pass: '@@morphedo12',
    }  ,
    from : 'learnprogramming404@gmail.com'
})

module.exports = transporter