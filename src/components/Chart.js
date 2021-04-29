import React from 'react';
import {createChart} from 'lightweight-charts';


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

    }

    drawChart(tick){
        this.setState({ticker: tick})
        const chart = createChart(document.querySelector(".tradingview-widget-container"), 
        { width: this.state.chartContainer.offsetWidth,
            height: this.state.chartContainer.offsetWidth * .625});
        const candleSeries = chart.addCandlestickSeries();
        chart.applyOptions({
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
            candleSeries.setData( 
                this.state.data
            )
            
            var timerID;
            document.body.onresize = function() {
                this.setState({chartContainer: document.getElementById('chart-container')})
                if (timerID) clearTimeout(timerID);
                timerID = setTimeout(function() {
                    chart.resize(this.state.chartContainer.offsetWidth, this.state.chartContainer.offsetWidth*.625);
                }.bind(this), 200);
            }.bind(this)
}

    componentDidMount(){
        // console.log("Props data: " + this.props.data)
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