import React from 'react';

/*
/ List Item for Pop Panel Side nav
/ Author: Tony Flores: https://github.com/florestony54
/ v3.0
*/

class PopPanelTechItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        var icons = {
            goog: "fab fa-google",
            aapl: "fab fa-apple",
            amzn: "fab fa-amazon",
            msft: "fab fa-microsoft",
            fb: "fab fa-facebook"
        }
        return (
            <li class="list-group-item" id={this.props.id} onClick={(event) => this.props.callback(event, this.props.ticker)}>
                <div className='row align-items-center'>
                    <i className={icons[this.props.ticker] + " col-1" }></i>
                    <div className='col-8' >{this.props.ticker.toUpperCase()} <div className='pop-price'>{this.props.price}</div></div>
                </div>
            </li>

        )
    }
}


export default PopPanelTechItem;