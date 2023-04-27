import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
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
			console.log('wrong credentials lol');
		}
	}

	const handleLogout = (event) => {
		event.preventDefault();

		window.localStorage.removeItem('loggedBlogAppUser')
		blogService.setToken('')
		setUser(null)
	}

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
			<h2>blogs</h2>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
			<button onClick={handleLogout}>logout</button>
		</div>
	)
}

export default App