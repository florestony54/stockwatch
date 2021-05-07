import React from 'react';
import {createChart} from 'lightweight-charts';

/*
/ Component containing the chart. Uses TradingView lightweight-charts: https://github.com/tradingview/lightweight-charts
/ Author: Tony Flores: https://github.com/florestony54
/ v3.0
*/

class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ticker: "",
            chart: null, 
            data: null,
            chartContainer:  document.getElementById('chart-container')
        }
        this._ref = React.createRef();
        this.chart = null;
        this.lineSeries = null;
        this.getSMA = this.getSMA.bind(this);
        this.getEMA = this.getEMA.bind(this);
    }

    /*
    / Main Method for drawing the chart component on the page
    / Lightweight-charts uses HTML canvas element
    */
    drawChart(tick){
        this.setState({ticker: tick})

        /* Calling the createChart() method from lightweight-charts
        /  Since the method calls for hard coding the dimensions of the chart,
        / the chartContainer.offsetWidth attributes are dynamically determined
        / based on window size
        */ 
        this.chart = createChart(document.querySelector(".tradingview-widget-container"), 
        { width: this.state.chartContainer.offsetWidth,
            height: this.state.chartContainer.offsetWidth * .625});

        // Add price candlesticks to chart and set chart style
        const candleSeries = this.chart.addCandlestickSeries();
        this.chart.applyOptions({
            layout: {
                backgroundColor: '#041b4dd6',
                textColor: 'white',
                fontSize: 12,
            },
            grid: {
                vertLines: {
                    color: 'gray',
                    style: 1,
                    visible: true,
                },
                horzLines: {
                    color: 'gray',
                    style: 1,
                    visible: true,
                },
            }
        })

        /* Defining the data for the candlesticks chart
        / This data is received as props from SearchForm.js
        / and passed to state from componentDidMount()
        */
        candleSeries.setData( 
            this.state.data
        )
            
            // Resize the chart canvas when the window gets resized
            // Canvas element doesnt auto resize with window
            var timerID;
            document.body.onresize = function() {
                this.setState({chartContainer: document.getElementById('chart-container')})
                if (timerID) clearTimeout(timerID);
                timerID = setTimeout(function() {
                    this.chart.resize(this.state.chartContainer.offsetWidth, this.state.chartContainer.offsetWidth*.625);
                }.bind(this), 200);
            }.bind(this)
}

    // Fetch the SMA data for the current stock being viewed from server
    getSMA() {
        var url = new URL("https://whispering-cliffs-51262.herokuapp.com/sma"),
            params = { 'ticker': this.state.ticker,
                        'type': this.props.chartType}; //URL params to pass to server
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        // Fetch from server URL
        fetch(url).then(response =>
            response.json()
        ).then(data => {
        // add a lineseries to the chart for SMA line
        this.lineSeries = this.chart.addLineSeries({
            color: '#3d7bff',
        })
        this.lineSeries.setData(
            data
        )})
    }

    // Fetch the EMA data for the current stock from server
    getEMA() {
        var url = new URL("https://whispering-cliffs-51262.herokuapp.com/ema"),
            params = {
                'ticker': this.state.ticker,
                'type': this.props.chartType }; //URL params to pass to server
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        // Fetch from server URL
        fetch(url).then(response =>
            response.json()
        ).then(data => {
            // add a lineseries to the chart for EMA line
            this.lineSeries = this.chart.addLineSeries({
                color: 'red',
            })
            this.lineSeries.setData(
                data
            )
        })
    }

    // Drawing the chart on the page when this component is rendered
    componentDidMount(){
       this.setState({data: this.props.data})
        this.drawChart(this.props.ticker)
    }

    // Updating state when new props are received from parent (SearchForm)
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
            <div>
                <div className="tradingview-widget-container" ref={this._ref}>
                </div>
                <button type="button" id='sma-btn' className="btn btn-primary col-3" onClick={this.getSMA} data-toggle="tooltip" data-placement="bottom" title="Display 20 day simple moving average">
                    Add SMA20
                </button>
                
                <button type="button" id='sma-btn' className="btn btn-danger col-3" onClick={this.getEMA} data-toggle="tooltip" data-placement="bottom" title="Display 20 day exponential moving average">
                    Add EMA20
                </button>
                
                <a type="button" href="https://www.investopedia.com/terms/m/movingaverage.asp" id='sma-btn' className="btn btn-warning col-3"  target="_blank" data-placement="bottom">
                    <i class="far fa-question-circle"></i>What are SMA and EMA? 
                </a>

            </div>
            )
    }
}


export default Chart;