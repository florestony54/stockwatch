import React from 'react';

/*
/ Component for simple spinner for loading
/ Author: Tony Flores: https://github.com/florestony54
/ v3.0
*/

class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>

        )
    }
}


export default Spinner;