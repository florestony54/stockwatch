import React from 'react';

/*
/ List Item for Pop Panel Side nav
/ Author: Tony Flores: https://github.com/florestony54
/ v3.0
*/

class PopPanelListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <li class="list-group-item" onClick={this.props.callback}>
                <div className='row align-items-center'>
                    <div className='col-8' >{this.props.itemName} <div className='pop-price'>${this.props.price}</div></div>
                </div>
            </li>

        )
    }
}


export default PopPanelListItem;