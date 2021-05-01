import React from 'react';

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