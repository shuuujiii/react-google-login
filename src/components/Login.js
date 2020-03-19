import React, { Component } from 'react';
import axios from 'axios';
import { API_SERVER } from '../env';
export default class Login extends Component {
    render() {
        const URL = `${API_SERVER}/rest-auth/login/`
        const login = () => {
            axios
                .post(URL, {
                    username: 'nabemi',
                    password: 'nabeminabemi',
                    email: 'nabemi@gmail.com'
                })
                .then((res) => {
                    console.log(res)
                })
                .catch(() => { console.log('login failed') })
        }
        return (
            <div>
                <input></input>
                <button onClick={login}>send</button>
            </div>
        )
    }
}
