const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
  	response.json(blogs).end();
})
  
blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	
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

