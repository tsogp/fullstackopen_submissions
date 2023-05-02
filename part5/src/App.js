import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [message, setMessage] = useState('')
	const [user, setUser] = useState(null)

	const hideBlogRef = useRef();
	const hideLoginRef = useRef();

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)  
	}, [])

	useEffect(() => {
		const userJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (userJSON !== null) {
			const user = JSON.parse(userJSON)
			setUser(user)
			blogService.setToken(user.token)
		} 
	}, [])

	const handleLogin = async credentials => {
		hideLoginRef.current.toggleVisibility()

		try {
			const user = await loginService.login(credentials)

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user)
		} catch (exception) {
			setMessage('wrong credentials lol')
			setTimeout(() => {
				setMessage("")
			}, 5000)
		}
		
	}

	const handleCreateBlog = newObject => {
		hideBlogRef.current.toggleVisibility()

		blogService
			.create(newObject)
			.then(returnedBlog => {
				setBlogs(blogs.concat(returnedBlog))
			})
	}
	
	const handleLogout = (event) => {
		event.preventDefault();
		
		window.localStorage.removeItem('loggedBlogAppUser')
		blogService.setToken('')
		setUser(null)
	}
	
	const createBlogForm = () => (
		<Toggable buttonLabel='create blog' ref={hideBlogRef}>
			<BlogForm addBlog={handleCreateBlog}></BlogForm>
		</Toggable>
	)

	const loginForm = () => (
		<Toggable buttonLabel='login' ref={hideLoginRef}>
			<LoginForm loginUser={handleLogin}></LoginForm>
		</Toggable>
	)

	const handleLike = async (b, index) => {
		const newBlog = { ...b, likes: b.likes + 1 }
		
		let newBlogs = [...blogs]
		newBlogs[index] = newBlog; 

		await blogService.like(newBlog)
		setBlogs(newBlogs)
	}

	const handleDelete = async (b, index) => {	
		await blogService.del(b._id)

		setBlogs(blogs.filter(blog => blog !== b))
	}

	const sortLikes = () => {
		setBlogs([...blogs].sort((a, b) => a.likes - b.likes))
	}

	if (user === null) {
		return loginForm();
	}

	return (
		<div>
			<Notification message={message}></Notification>
			<h2>blogs</h2>
			{createBlogForm()}
			<button onClick={sortLikes}>sort with likes</button>
			{blogs.map((blog, index) =>
				<>
					<Blog key={blog.id} blog={blog} />
					<button onClick={() => handleLike(blog, index)}>like</button>
					<button onClick={() => handleDelete(blog, index)}>delete</button>
				</>
			)}
			<button onClick={handleLogout}>logout</button>
		</div>
	)
}

export default App