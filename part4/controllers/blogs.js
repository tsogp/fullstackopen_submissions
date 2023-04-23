const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
	const authorization = request.get('authorization');
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '');
	}
	return null;
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
		.populate('user', { username: 1, name: 1, id: 1 })
  	response.json(blogs).end();
})
  
blogsRouter.post('/', async (request, response) => {
	const body = request.body;

	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
	if (!decodedToken) {
		return response.status(401).json({ error: 'token invalid' });
	}

	const user = await User.findById(decodedToken.id);

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
	await Blog.findByIdAndDelete(request.params.id);
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

