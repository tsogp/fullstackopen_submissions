import React, {useState} from "react";

const LoginForm = ({ loginUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = event => {
        event.preventDefault()
        loginUser({ username, password })

        setUsername('')
        setPassword('')
    }

    return (
        <>
            <p>bro login pls</p>
            <form onSubmit={event => handleLogin(event)}>
                <div>
                    username
                    <input
                        type='text'
                        value={username}
                        name="Username"
                        onChange={event => setUsername(event.target.value)}
                    ></input>
                </div>
                <div>
                    password
                    <input
                        type='password'
                        value={password}
                        name="Password"
                        onChange={event => setPassword(event.target.value)}
                    ></input>
                </div>
                <button type='submit'>login</button>
            </form>
        </>
    )
}

export default LoginForm