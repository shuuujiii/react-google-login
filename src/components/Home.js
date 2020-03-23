import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_SERVER } from '../env';
import axios from 'axios';

export default class Home extends Component {
    componentDidMount() {
        // let token = localStorage.getItem('token')
        this.authentication()
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
                // this.setState({
                //   ...this.state,
                //   auth: {
                //     username: res.data.username,
                //     email: res.data.email,
                //   }
                // })
                this.props.history.push('/user')
            })
            .catch((error) => {
                console.log('token authentication failed');
                console.log(error);
                this.props.history.push('/login')
            })
    }
    render() {
        return (
            <div>
                Home
                <Link to='/login'>login</Link>
                <Link to='/registration'>Sign Up</Link>
            </div>
        )
    }
}
