import React, { useState } from "react";

const BlogForm = ({
    addBlog
}) => {
    const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

    const handleCreateBlog = (event) => {
		event.preventDefault();

		addBlog({ title, author, url })

        setTitle('')
        setAuthor('')
        setUrl('')
	}

    return (
        <>
            <h2>create new</h2>
			<form onSubmit={event => handleCreateBlog(event)}>
				<div>
					title
					<input
						type='text'
						value={title}
						name='Title'
						onChange={(event) => setTitle(event.target.value)}
					></input>
				</div>
				<div>
					author
					<input
						type='text'
						value={author}
						name='Author'
						onChange={(event) => setAuthor(event.target.value)}
					></input>
				</div>
				<div>
					url
					<input
						type='text'
						value={url}
						name='Url'
						onChange={(event) => setUrl(event.target.value)}
					></input>
				</div>
				<button type='submit' onClick={handleCreateBlog}>create</button>
			</form>
        </>
    )
}

export default BlogForm;