import React from 'react';

/*
/ Component containing the Key Stats and Related panel data
/ Author: Tony Flores: https://github.com/florestony54
/ v3.0
*/

class DataPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            '52h': '...',
            '52l': '...',
            'mktcap': '...',
            'avol': '...',
            'vol': '...',
            'div': '...',
            'per': '...',
            related: [],
            relPrice: [],
            
        }
    }

    componentDidMount(){
        this.updateStats()
    }

    componentDidUpdate(prevProps){
        if(this.props.data != prevProps.data){
            this.updateStats()
        }
    }

    /* Method for updating the Key Statistics data
    /  Creates temporary variables then updates state to assure that state update
    /  occurs in sync with the rest of the updates on the page, since React setState() is asynchronus by nature
    */
    updateStats(){
        let tempArr = []
        let tempPrice = []
        let tempStats = {
            '52h': (this.props.data.summaryDetail.fiftyTwoWeekHigh != undefined ? this.props.data.summaryDetail.fiftyTwoWeekHigh.fmt: "-"),
            '52l': (this.props.data.summaryDetail.fiftyTwoWeekLow != undefined ? this.props.data.summaryDetail.fiftyTwoWeekLow.fmt: "-"),
            'mktcap': (this.props.data.price.marketCap != undefined ? this.props.data.price.marketCap.fmt: "-"),
            'avol': (this.props.data.summaryDetail.averageVolume != undefined ? this.props.data.summaryDetail.averageVolume.fmt: "-"),
            'vol': (this.props.data.summaryDetail.volume != undefined ? this.props.data.summaryDetail.volume.fmt: "-"),
            'div': (this.props.data.summaryDetail.dividendYield != undefined ? this.props.data.summaryDetail.dividendYield.fmt : "-"),
            'per': (this.props.data.summaryDetail.trailingPE != undefined ? this.props.data.summaryDetail.trailingPE.fmt : "-"),
        }
        this.setState({'52h': tempStats['52h']})
        this.setState({ '52l': tempStats['52l']})
        this.setState({'mktcap': tempStats.mktcap})
        this.setState({ 'avol':tempStats.avol})
        this.setState({ 'vol': tempStats.vol})
        this.setState({ 'div':tempStats.div})
        this.setState({ 'per': tempStats.per})

        /* YahooFinance API returns a long list of related tickers
        /  These loops pick the top 5 to display ticker and price in Related Column
        */
        for (let i = 0; i <5; i++){
            tempArr[i] = this.props.related[i].symbol
        }
        for (let i = 0; i < 5; i++) {
            tempPrice[i] = this.props.related[i].regularMarketPrice
        }
        this.setState({related: tempArr})
        this.setState({relPrice: tempPrice})
        
    }

    render(){
        console.log(this.state.related)
        return (
            <div className="" id="data-card-col">
                <div className='row data-card-container'>
                    <div className="col-6">
                    <div className='row data-row'>
                        <h4 className='data-title'>Key Stats</h4>
                        <div className='card col-12 data-card'>
                            <h5 className='card-title'>Market Cap</h5>
                            <p className='card-text stat-text'>{this.state.mktcap}</p>                    
                        </div>
                        <div className='card col-12 data-card'>
                            <h5 className='card-title'>P/E Ratio</h5>
                            <p className='card-text stat-text'>{this.state.per}</p>
                        </div>
                        <div className='card col-12 data-card'>
                            <h5 className='card-title'>Average Volume</h5>
                            <p className='card-text stat-text'>{this.state.avol}</p>
                        </div>
                    </div>
                    <div className='row data-row'>
                        <div className='card col-12 data-card'>
                            <h5 className='card-title'>Volume</h5>
                            <p className='card-text stat-text'>{this.state.vol}</p>                    
                        </div>
                        <div className='card col-12 data-card'>
                            <h5 className='card-title'>Dividend Yield</h5>
                            <p className='card-text stat-text'>{this.state.div}</p>
                        </div>
                        <div className='card col-12 data-card'>
                            <h5 className='card-title'>52 Week High</h5>
                            <p className='card-text stat-text'>{this.state['52h']}</p>
                        </div>
                        <div className='card col-12 data-card'>
                            <h5 className='card-title'>52 Week Low</h5>
                            <p className='card-text stat-text'>{this.state['52l']}</p>
                        </div>
                    </div>
                    </div>
                    <div className='col-6'>
                    <div className='row data-row'>
                        <h4 className='data-title'>Related</h4>
                        <div className='card col-12 data-card'>
                            <h5 className='card-title'>{this.state.related[0]}</h5>
                            <p className='card-text stat-text'>${this.state.relPrice[0]}</p>
                        </div>
                        <div className='card col-12 data-card'>
                            <h5 className='card-title'>{this.state.related[1]}</h5>
                            <p className='card-text stat-text'>${this.state.relPrice[1]}</p>
                        </div>
                        <div className='card col-12 data-card'>
                            <h5 className='card-title'>{this.state.related[2]}</h5>
                            <p className='card-text stat-text'>${this.state.relPrice[2]}</p>
                        </div>
                        <div className='card col-12 data-card'>
                            <h5 className='card-title'>{this.state.related[3]}</h5>
                            <p className='card-text stat-text'>${this.state.relPrice[3]}</p>
                        </div>
                        <div className='card col-12 data-card'>
                            <h5 className='card-title'>{this.state.related[4]}</h5>
                            <p className='card-text stat-text'>${this.state.relPrice[4]}</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            )
    }
}


export default DataPanel;