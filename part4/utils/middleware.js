const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        request['token'] = authorization.replace('Bearer ', '');
    } else {
        request.headers['token'] = null;
    } 

    next();
}

const userExtractor = async (request, response, next) => {
    const token = request.token

    const decodedToken = jwt.decode(token, process.env.SECRET);
    if (!decodedToken) {
        request['user'] = null;
        response.status(401).json({ error: 'invalid token' });
    } else {
        const user = await User.findById(decodedToken.id);
        request['user'] = user;
    }

    next();
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}