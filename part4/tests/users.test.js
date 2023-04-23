const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

describe('user io', () => {
    const correctUser = {
        "username": "lol1",
        "name": "lol",
        "password": "lol"
    }

    const badUsername = {
        "username": "lo",
        "name": "lol",
        "password": "lol"
    }

    const badPass = {
        "username": "lol2",
        "name": "lol",
        "password": "lo"
    }

    const noUsername = {
        "name": "lol",
        "password": "lol"
    }

    const noPassword = {
        "username": "lol1",
        "name": "lol",
    }

    beforeEach(async () => {
        await User.deleteMany({});
    }, 100000)

    test('correct user is added', async () => {
        await api
                .post("/api/users")
                .send(correctUser)
                .expect(201);
    }, 20000)

    test('bad password', async () => {
        await api
                .post("/api/users")
                .send(badPass)
                .expect(400);
    }, 20000)

    test('bad username', async () => {
        await api
                .post("/api/users")
                .send(badUsername)
                .expect(400);
    })

    test('no username', async () => {
        await api
                .post("/api/users")
                .send(noUsername)
                .expect(400);
    })

    test('no password', async () => {
        await api
                .post("/api/users")
                .send(noPassword)
                .expect(400);
    })

})