import React from 'react';

/*
/ Component containing company summary
/ Author: Tony Flores: https://github.com/florestony54
/ v3.0
*/

class SummaryPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: null,
            summary: null
        }
    }

    // Lifecycle methods to update the summary and company name when the component updates
    updateSummary(){
        this.setState({company: this.props.company})
        this.setState({summary: this.props.summary})
    }

    componentDidMount(){
        this.updateSummary()
    }

    componentDidUpdate(prevProps) {
        if (this.props.company != prevProps.company) {
            this.updateSummary()
        }
    }

    render() {
        return (
            <div class="card" id='summary-panel'>
                <div class="card-body" id="summary-panel-container">
                    <h5 class="card-title">About {this.state.company}</h5>
                    <p class="card-text">{this.state.summary}</p>
                </div>
            </div>
        )
    }
}


export default SummaryPanel;