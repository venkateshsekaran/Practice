const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwt.config');
const bcrypt = require('bcrypt')
class JWTUtils {

    async verifyAuthenticateToken(request, response, next) {
        try {
            /**To get the token of request header  */
            let token = request.headers['authorization']
            /**To check a reuest have a tokenOrNot */
            if (!token) return response.status(401).send({
                auth: false,
                message: 'Niser Token not provided'
            })
            /**to decode a token and find out the userId  */
            let decodedToken = jwt.decode(token)
            let userId = decodedToken.userId
            /**To find the userId in database   */
            let validUser = await require('../models/userModel').findOne({ _id: userId })

            /**to check userId is validOrNot */
            if (!validUser) return response.status(401).send({
                code: 401,
                auth: false,
                message: 'Invalid user'
            })

            /**To verify a jwt token   */
            jwt.verify(token, jwtConfig.secret, function (error) {
                /** To check the token is not expired  */
                if (error && error.name === 'TokenExpiredError')
                    return response.status(401).send({
                        code: 'TokenExpired',
                        message: 'Uv heal Token Expired'
                    })
                /** To cheeck the token is not equal to expired  token  */
                if (error && error.name !== 'TokenExpiredError') {
                    return response.status(401).send({
                        message: 'To failed to authenticate'
                    })
                }
            })
            /**If all coditions are false then to set the userId in request   */
            request['userId'] = userId
            next();
        } catch (error) {
            console.log('verifyAuthenticateToken', error)
            throw error;
        }
    }

    async generateJwtToken(userId, validity) {
        let token = jwt.sign({ userId: userId }, jwtConfig.secret, { expiresIn: validity })
        return token
    }
    async comparePassword(savedPassword, requestPassword) {
        return bcrypt.compare(requestPassword, savedPassword)
    }
    async convertPasswordInBcrypt(password) {
        return await bcrypt.hash(password, await bcrypt.genSalt(10));
    }
}

module.exports = new JWTUtils()