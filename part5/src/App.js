import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [message, setMessage] = useState('')
	const [password, setPassword] = useState('')
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const [user, setUser] = useState(null)

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

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({ username, password })

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user)
			setUsername('');
			setPassword('')
		} catch (exception) {
			setMessage('wrong credentials lol')
			setTimeout(() => {
				setMessage("")
			}, 5000)
		}
	}

	const handleCreateBlog = async (event) => {
		event.preventDefault();

		try {
			const blog = await blogService.create({ title, author, url })

			setTitle('')
			setAuthor('')
			setUrl('')
			setBlogs(blogs.concat(blog))

			setMessage(blog.title + " created!")
			setTimeout(() => {
				setMessage("")
			}, 5000)
		} catch (exception) {
			console.log('wrong credentials or no title or author i guess')
		}

	}
	
	const handleLogout = (event) => {
		event.preventDefault();
		
		window.localStorage.removeItem('loggedBlogAppUser')
		blogService.setToken('')
		setUser(null)
	}
	
	const createBlogForm = () => (
		<>
			<h2>create new</h2>
			<form>
				<div>
					title
					<input
						type='text'
						value={title}
						name='Title'
						onChange={({ target }) => setTitle(target.value)}
					></input>
				</div>
				<div>
					author
					<input
						type='text'
						value={author}
						name='Author'
						onChange={({ target }) => setAuthor(target.value)}
					></input>
				</div>
				<div>
					url
					<input
						type='text'
						value={url}
						name='Url'
						onChange={({ target }) => setUrl(target.value)}
					></input>
				</div>
				<button type='submit' onClick={handleCreateBlog}>create</button>
			</form>
		</>
	)

	const loginForm = () => (
		<>
			<p>bro login pls</p>
			<form>
				<div>
					username
					<input
						type='text'
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					></input>
				</div>
				<div>
					password
					<input
						type='password'
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					></input>
				</div>
				<button type='submit' onClick={handleLogin}>login</button>
			</form>
		</>
	)

	if (user === null) {
		return loginForm();
	}

	return (
		<div>
			<Notification message={message}></Notification>
			<h2>blogs</h2>
			{createBlogForm()}
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
			<button onClick={handleLogout}>logout</button>
		</div>
	)
}

export default App