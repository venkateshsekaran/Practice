const { response } = require('express');
const transporter = require('../config/mail.config') 



const emailTemplate = async function(type,data) {
    try {
        let emailTemplate = `
        `
        return emailTemplate
    } catch (error) {
        console.log(error);
    }
}
class Emails {
    async sendEmailForForgotPassword(email,data){
        try {
            let options = {
                to : email ,
                subject : 'Forgot Password ',
                html : `<h>${data.url}</h>`
            }
            transporter.sendMail(options)  
            // return response.status(200).send({code : 200 , message: 'Password reset link send sucessfully'})
            return  {
                status : 200,
                message : 'Password reset link send sucessfully'
            }
        } catch (error) {
            console.log(error);
            return {
                status :500,
                message : 'Password reset link is not  send sucessfully'
            }
            
        }
    }
    async sendInvitationLink(email,data){
        try {
            let options = {
                to : email ,
                subject : 'Invitation Link ',
                html : `<h>${data.url}</h>`
            }
            transporter.sendMail(options)  
            // return response.status(200).send({code : 200 , message: 'Password reset link send sucessfully'})
            return  {
                status : 200,
                message : 'User invitation link send sucessfully'
            }
        } catch (error) {
            console.log(error);
            return {
                status :500,
                message : 'User invitation link is not  send sucessfully'
            }
            
        }
    }
}
module.exports = new Emails()