import React from 'react';
import {createChart} from 'lightweight-charts';
import {rawData} from './data.js';

class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ticker: "",
            chart: null, 
            data: null//rawData
        }
        this._ref = React.createRef();
        this.data = rawData;
    }

    drawChart(tick){
        this.setState({ticker: tick})
        const chart = createChart(document.querySelector(".tradingview-widget-container"), { width: 800, height: 600 });
        const candleSeries = chart.addCandlestickSeries();
        chart.applyOptions({
            layout: {
                backgroundColor: '#161b22',
                textColor: '#c9d1d9',
                fontSize: 12,
            },
            watermark: {
                text: this.state.ticker.toUpperCase(),
                color: 'white',
                visible: true
            }
        })
            candleSeries.setData( 
                this.state.data
            )
    }

    componentDidMount(){
        console.log("Props data: " + this.props.data)
       this.setState({data: this.props.data})
        this.drawChart(this.props.ticker)
    }

    componentDidUpdate(prevProps, prevState){
        let newTicker = this.props.ticker;
        let newData = this.props.data;
        let canv = document.querySelector(".tv-lightweight-charts");
        if (prevProps.ticker !== newTicker && prevState.data !== newData)  {
            canv.remove();
            this.setState({data: newData});
            this.drawChart(newTicker);
    }
}

    // Updates state from props on initial render
    componentWillMount(){ 
        this.setState({ticker: this.props.ticker})
        this.setState({data: this.props.data})
    }

    // Updates state from props on all render after initial
    componentWillReceiveProps(nextProps){ 
        if (nextProps.ticker !== this.state.ticker &&
            nextProps.data !== this.state.data){
            this.setState({ ticker: nextProps.ticker})
            this.setState({data: nextProps.data})
        }
    }

    render(){
        return (
            <div className="tradingview-widget-container" ref={this._ref}>
                {/* <div  className="tradingview-widget-container__widget"></div> */}
            </div>
            )
    }
}


export default Chart;