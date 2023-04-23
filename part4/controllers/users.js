const usersRouter = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;
    if (username === undefined || password === undefined) {
        return response.status(400).json({ error: "username and password are required" });
    } else if (username.length < 3 || password.length < 3) {
        return response.status(400).json({ error: "username and password must be at least 3 characters long" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username: username,
        name: name,
        passwordHash: passwordHash
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.status(200).json(users);
})

module.exports = usersRouter