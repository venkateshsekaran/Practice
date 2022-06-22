const UserModel = require('../models/userModel')

const JwtUtils = require('../utils/jwt.utils')
const jwt = require('jsonwebtoken')
const JwtConfig = require('../config/jwt.config')

class AuthenticationController {

    async login(request, response) {
        try {
            let user = await UserModel.findOne({ email: request.body.email })
            if (!user) {
                return response.send({
                    code: 500,
                    message: 'User email does not exists in Uv heal '
                })
            }

            let comparePassword = await JwtUtils.comparePassword(user.password, request.body.password)
            if (!comparePassword) {
                return response.send({
                    code: 403,
                    message: 'User password is not matched ! . '
                })
            }

            return response.send({
                code: 200,
                token: await JwtUtils.generateJwtToken(user._id, 86400),
                user: user,
                message: 'You have successfully login ! .'
            })
        } catch (error) {
            console.log(error)
            return response.send({ code: 500, message: 'Something went wrong !' })
        }
    }
    async signup(request, response) {
        try {
            let userData = request.body
            let checkEmailExitsOrNot = await UserModel.findOne({ email: userData.email })
            if (checkEmailExitsOrNot) {
                return response.send({
                    code: 500,
                    message: 'Email id already exits'
                })
            }
            await UserModel({
                email: userData.email,
                password: await JwtUtils.convertPasswordInBcrypt(userData.password),
                userType: 'Admin',
                createdOn: new Date()
            }).save();

            return response.send({
                code: 200,
                message: 'You are successfully signup ! .'
            })
        } catch (error) {
            console.log(error);
        }
    }
    async forgotPassword(request, response) {
        try {
            if (request.body.password !== request.body.confirmPassword) return response.status(400).send({ code: 400, message: 'The password did not match to confirm password' })

            let checkTokenValid = await require('../models/tokenModel').findOne({ token: request.body.token })

            if (!checkTokenValid) return response.status(400).send({ code: 400, message: 'Token is not  invalid !' })

            // await jwt.verify(request.body.token, JwtConfig.secret, function (error) {
            //     if (error && error.name === 'TokenExpiredError')
            //         return response.status(401).send({
            //             code: 'TokenExpired',
            //             message: 'Forgot password link is expired. please send it again'
            //         })
            // })
            await UserModel.updateOne({ email: checkTokenValid.email }, { $set: { password: await JwtUtils.convertPasswordInBcrypt(request.body.password) },isEmailVerified :true })

            await require('../models/tokenModel').deleteOne({ email: checkTokenValid.email, token: request.body.token })

            return response.status(200).send({ code: 200, message: 'Your password changed successfully' })
        } catch (error) {
            console.log(error);
        }
    }
    async sendEmailToForgotPassword(request, response) {
        try {
            let userDetail = await UserModel.findOne({ email: request.body.email })
            if (!userDetail) return response.status(404).send({ code: 200, message: 'Email id does not exits' })
            let forgotToken = await JwtUtils.generateJwtToken(userDetail._id, 900)

            let url = `https://uvheal-frontend.herokuapp.com/forgot-password?token=${forgotToken}`

            await require('../models/tokenModel')({
                userId: userDetail._id,
                token: forgotToken,
                email: request.body.email,
                expiresIn: 900
            }).save()

            let links = await require('../utils/email').sendEmailForForgotPassword(request.body.email, { url: url })
            return response.status(links.status).send({ code: links.status, message: links.message })
        } catch (error) {
            console.log(error);
        }
    }
    async setPassword(request, response) {
        try {
            let data = request.body.setPasswords
            console.log(request.body);
            let matchPasswod = data.password.match(data.confirmPassword)

            if (!matchPasswod) return response.status(400).send({ code: 400, message: 'The password did not match to confirm password' })
            let checkTokenValid = await require('../models/tokenModel').findOne({ token: request.body.token })

            if (!checkTokenValid) return response.status(400).send({ code: 400, message: 'Token is not  invalid !' })
           
            data.password = await JwtUtils.convertPasswordInBcrypt(data.password)

            await UserModel.updateOne({ email: checkTokenValid.email }, { $set: { password: data.password ,isEmailVerified:true} })
            await require('../models/tokenModel').deleteOne({ email: checkTokenValid.email, token: request.body.token })

            return response.status(200).send({ code: 200, message: 'Password is update sucessfully' })
        } catch (error) {
            console.log(error);
        }
    }




}
module.exports = new AuthenticationController()