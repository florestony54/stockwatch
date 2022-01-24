import React from 'react';

/*
/ Component for simple spinner for loading
/ Author: Tony Flores: https://github.com/florestony54
/ v3.0
*/

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div class="modal" id='loginModal' tabindex="-1">
            <div class="modal-dialog ">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title">Login</h5>
                        <button type="button" id="modal-close" class="close bg-dark" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Login coming soon!</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
            </div>

        )
    }
}


export default LoginModal;