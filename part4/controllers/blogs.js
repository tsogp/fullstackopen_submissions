const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
		.populate('user', { username: 1, name: 1, id: 1 })
  	response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
	const body = request.body;
	const user = request.user;

	console.log(user)

	if (user === null) {
		response.status(401).json({ error: "invalid token" })
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes, 
		user: user.id 
	});
	const result = await blog.save();

	user.blogs = user.blogs.concat(result._id);
	await user.save();
	
	response.status(201).json(result);
})

blogsRouter.delete('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	const user = request.user;

	if (blog === null || user.id.toString() != blog.user._id.toString()) {
		return response.status(401).json({ error: 'invalid blog id' });
	}

	await blog.delete();

	response.status(204).end();
})

blogsRouter.put('/:id', async (request, response) => {
	const blog = {
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes 
	}

	const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
	response.status(201).json(result);
})

module.exports = blogsRouter

