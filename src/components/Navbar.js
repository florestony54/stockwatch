import React from 'react';
import logo from '../media/logo1.png';


/*
/ Component for simple spinner for loading
/ Author: Tony Flores: https://github.com/florestony54
/ v3.0
*/

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
                <nav class="navbar sticky-top navbar-dark bg-dark">
                    <div className='container'>
                    <a class="navbar-brand" href="/">
                        <img src={logo} id="logo-img" width="30%" height="30%" alt=""/>
                    </a>
                        <div className='justify-content-end'>
                            <button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#loginModal" type="submit">Login</button>
                        </div>
                    </div>
                </nav>

        )
    }
}


export default Navbar;


