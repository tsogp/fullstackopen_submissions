import React, { useState } from "react"

const Blog = ({blog}) => {
	const [visible, setVisible] = useState(false)

	const showWhenVisible = { display: visible ? '' : 'none' }
	const hideWhenVisible = { display: visible ? 'none' : '' }


	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	return (
		<div style={blogStyle}>
			{blog.title}
			<button style={hideWhenVisible} onClick={toggleVisibility}>show</button>
			<div style={showWhenVisible}>
				Author: {blog.author}<br></br>
				Url: {blog.url}<br></br>
				Likes: {blog.likes}<br></br>
				<button onClick={toggleVisibility}>hide</button>
			</div>
		</div>  
	)
}

export default Blog