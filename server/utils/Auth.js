const jwt = require('jsonwebtoken');

const secret = 'mysecretshhhhhhh'
const expiration = "2h"

module.exports = {
    signToken: function({ username, email, _id }) {
        const paylaod = { username, email, _id };

        return jwt.sign({ data: paylaod }, secret, { expiresIn: expiration });
    },

    authMiddleware: function({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization

        if (req.headers.authorization) {
            token = token
                .split(' ')
                .pop()
                .trim()
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        return req;
    }
};