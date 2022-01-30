import React from 'react';

/*
/ Market Item for Pop Panel Side nav
/ Author: Tony Flores: https://github.com/florestony54
/ v3.0
*/

class PopPanelMarketItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <li class="list-group-item">
                <div className='row align-items-center'>
                    <div className='col-8'>{this.props.marketName}<div className='pop-price'>{this.props.marketIndex}</div></div>
                </div>
            </li>

        )
    }
}


export default PopPanelMarketItem;

