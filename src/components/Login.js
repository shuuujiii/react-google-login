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
                    localStorage.setItem('token', res.data.key)
                })
                .catch(() => { console.log('login failed') })
        }

        const authentication = () => {
            const URL = `${API_SERVER}/rest-auth/user/`
            const TOKEN = 'da7fa020eca55cb80bdcbbca9575436da5f8cdbe'
            axios
                .get(URL, {
                    headers: {
                        AUthorization: `Token ${TOKEN}`,
                    }
                })
                .then((res) => { console.log(res) })
                .catch(() => { console.log('token authentication failed') })
        }
        return (
            <div>
                <input></input>
                <button onClick={login}>send</button>
                <button onClick={authentication}>auth</button>
            </div>
        )
    }
}
