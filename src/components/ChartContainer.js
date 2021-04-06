import React from 'react';
import Chart from './Chart.js';

class ChartContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ticker: ''
        }
    }

    componentDidUpdate(){
        
    }

    render(){
        return (
            <div className="container">
                <Chart ticker={this.props.ticker}/>
            </div>
            )
    }
}


export default ChartContainer;