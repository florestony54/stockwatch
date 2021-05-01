import React from 'react';

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

    updateStats(){
        let tempArr = []
        let tempPrice = []
        this.setState({'52h': this.props.data['52 Week High']})
        this.setState({'52l': this.props.data['52 Week Low']})
        this.setState({'mktcap': this.props.data['Market Cap']})
        this.setState({'avol': this.props.data['Average Volume']})
        this.setState({'vol': this.props.data['Volume']})
        this.setState({'div': this.props.data['Dividend Yield']})
        this.setState({'per': this.props.data['Price-Earnings Ratio']})
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
                        <h3 className='data-title'>Key Stats</h3>
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
                        <h3 className='data-title'>Related</h3>
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