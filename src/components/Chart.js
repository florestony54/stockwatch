import React from 'react';
import {createChart} from 'lightweight-charts';
import {priceData} from './data.js';

class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ticker: "",
            chart: null, 
            data: priceData
        }
        this._ref = React.createRef();
        this.data = priceData;
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
            candleSeries.setData( this.state.data
                // [{time: "2021-03-12", open: 2076.41, high: 2077.61, low: 2032.42, close: 2050.0}]
                // [{ time: '2018-12-19', open: 141.77, high: 170.39, low: 120.25, close: 145.72 },
                // { time: '2018-12-20', open: 145.72, high: 147.99, low: 100.11, close: 108.19 },
                // { time: '2018-12-21', open: 108.19, high: 118.43, low: 74.22, close: 75.16 },
                // { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
                // { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
                // { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
                // { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
                // { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
                // { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
                // { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
                // { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
                // { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
                // { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },]
            )
            // console.log(this.state.data)
    }

    componentDidMount(){
        
        // fetch("http://localhost:5000/").then(response => {
        //     return response.json();
        // }).then(data => this.setState({data: data}))
        // console.log(this.state.data)
        this.drawChart(this.props.ticker)
    }

    componentDidUpdate(prevProps, prevState){
        let canv = document.querySelector(".tv-lightweight-charts");
        if (prevProps.ticker !== this.props.ticker){
            canv.remove()
            this.drawChart(this.props.ticker)
        }   
    }

    // Updates state from props on initial render
    componentWillMount(){ 
        this.setState({ticker: this.props.ticker})
    }

    // Updates state from props on all render after initial
    componentWillReceiveProps(nextProps){ 
        if (nextProps.ticker !== this.state.ticker){
            this.setState({ ticker: nextProps.ticker})
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