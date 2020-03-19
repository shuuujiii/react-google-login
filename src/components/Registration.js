import React, { Component } from 'react';
import axios from 'axios';
import { API_SERVER } from '../env';
export default class Registration extends Component {
    render() {
        const signup = () => {
            // alert('aaa')
            const URL = `${API_SERVER}/rest-auth/registration`
            axios
                .post(URL, {})

        }
        return (
            <div>
                aaa
                <button onClick={signup}>Sign Up</button>
            </div>
        )
    }
}
