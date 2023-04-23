const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
		.populate('user', { username: 1, name: 1, id: 1 })
  	response.json(blogs).end();
})
  
blogsRouter.post('/', async (request, response) => {
	const user = await User.findOne({});
	console.log(user);
	const blog = new Blog({...request.body, user: user.id })

	user.blogs = user.blogs.concat(blog.id);
	await user.save();
	
	const result = await blog.save();
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

