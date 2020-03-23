import React, { Component } from 'react';
import axios from 'axios';
import { API_SERVER, GOOGLE_CLIENT_ID } from '../env';
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

    componentDidMount() {
        this.downloadGoogleScript(this.initSignInButton)
    }

    downloadGoogleScript = (callback) => {
        const element = document.getElementsByTagName('script')[0];
        const js = document.createElement('script');
        js.id = 'google-platform';
        js.src = '//apis.google.com/js/platform.js';
        js.async = true;
        js.defer = true;
        element.parentNode.insertBefore(js, element);
        js.onload = () => callback(window.gapi);
    }

    initSignInButton = (gapi) => {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: GOOGLE_CLIENT_ID,
                scope: 'email',
            })
                .then((res) => {
                    console.log('res', res);
                    console.log('accesstoken', res.access_token);
                    console.log('idtoken', res.id_token);
                    gapi.signin2.render('google-signin-button', {
                        'onsuccess': this.onSignIn,
                        'onfailure': (err) => console.error(err)
                    })
                })
        })
    }
    onSignIn = (googleUser) => {
        const GOOGLE_LOGIN_URL = `${API_SERVER}/rest_auth/google/`
        axios
            .post(GOOGLE_LOGIN_URL, {
                access_token: googleUser.getAuthResponse().access_token
            })
            .then((res) => {
                localStorage.setItem('token', res.data.key)
                this.authentication()
                console.log(res)
            })
            .catch(() => { console.log('google login error') })
    }
    handleOnChange(e) {
        console.log(this.state)
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    authentication() {
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
                    this.authentication()
                })
                .catch(() => { console.log('login failed') })
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
                <br />
                <div id='google-signin-button'></div>

            </div>
        )
    }
}
