import React, { Component } from 'react';
import axios from 'axios';
import { API_SERVER } from '../env';
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            auth:
            {
                username: "",
                email: "",
            }
        }
    }
    handleOnChange(e) {
        console.log(this.state)
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }
    render() {
        const login = () => {
            const URL = `${API_SERVER}/rest-auth/login/`
            const { username, email, password } = this.state
            axios
                .post(URL, {
                    username: username,
                    email: email,
                    password: password,
                })
                .then((res) => {
                    console.log(res)
                    localStorage.setItem('token', res.data.key)
                    authentication()
                })
                .catch(() => { console.log('login failed') })
        }

        const authentication = () => {
            const URL = `${API_SERVER}/rest-auth/user/`
            let token = localStorage.getItem('token')
            axios
                .get(URL, {
                    headers: {
                        AUthorization: `Token ${token}`,
                    }
                })
                .then((res) => {
                    console.log(res)
                    this.setState({
                        ...this.state,
                        auth: {
                            username: res.data.username,
                            email: res.data.email,
                        }
                    })
                })
                .catch(() => { console.log('token authentication failed') })
        }
        return (
            <div>
                username:<input type='text' name='username' onChange={this.handleOnChange.bind(this)} value={this.state.username}></input>
                <br />
                email:<input type='email' name='email' onChange={this.handleOnChange.bind(this)} value={this.state.email}></input>
                <br />
                password<input type='password' name='password' onChange={this.handleOnChange.bind(this)} value={this.state.password}></input>
                <br />
                <button onClick={login}>send</button>
                <br />
                auth>username:{this.state.auth.username}
                <br />
                auth>email:{this.state.auth.email}
            </div>
        )
    }
}
