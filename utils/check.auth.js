const { AuthenticationError} = require('apollo-server');
const jwt = require('jsonwebtoken');
const { SECRET_KEY  } = require('../config');

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split('Bearer ')[1];

        if(token) {
            try {
                const user = jwt.verify(token,SECRET_KEY);
                return user;

            } catch (e) {
                throw new AuthenticationError('Invalid/Expired token');

            }

        }
        throw Error('Authentication token must be \'Bearer [token]');
    }

    throw Error('Authentication Header must be provided');

    }