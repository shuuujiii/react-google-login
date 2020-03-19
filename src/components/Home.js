import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Home extends Component {
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
