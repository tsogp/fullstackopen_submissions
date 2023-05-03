import React, {useState} from "react";
import PropTypes from 'prop-types'

const LoginForm = ({ loginUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = event => {
        event.preventDefault()
        loginUser({ username, password })

        console.log('here')

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
                <button type='submit' onClick={handleLogin}>login</button>
            </form>
        </>
    )
}

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired
}

export default LoginForm