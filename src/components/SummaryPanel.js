import React from 'react';

class SummaryPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            company: 'Company',
            summary: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.'
        }
    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div class="card" id='summary-panel'>
                <div class="card-body">
                    <h5 class="card-title">About {this.state.company}</h5>
                    <p class="card-text">{this.state.summary}</p>
                </div>
            </div>
        )
    }
}


export default SummaryPanel;