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
        }
    }

    componentDidMount(){
        console.log(this.props.data)
        this.updateStats()

    }

    componentDidUpdate(prevProps){
        if(this.props.data != prevProps.data){
            this.updateStats()
        }
    }

    updateStats(){
        this.setState({'52h': this.props.data['52 Week High']})
        this.setState({'52l': this.props.data['52 Week Low']})
        this.setState({'mktcap': this.props.data['Market Cap']})
        this.setState({'avol': this.props.data['Average Volume']})
        this.setState({'vol': this.props.data['Volume']})
        this.setState({'div': this.props.data['Dividend Yield']})
        this.setState({'per': this.props.data['Price-Earnings Ratio']})
    }

    render(){
        return (
            <div className="col-3">
                <div className='row'>
                    <div className='card col-12 data-card'>
                        <h6 className='card-title'>Market Cap</h6>
                        <p className='card-text stat-text'>{this.state.mktcap}</p>                    
                    </div>
                    <div className='card col-12 data-card'>
                        <h6 className='card-title'>P/E Ratio</h6>
                        <p className='card-text stat-text'>{this.state.per}</p>
                    </div>
                    <div className='card col-12 data-card'>
                        <h6 className='card-title'>Average Volume</h6>
                        <p className='card-text stat-text'>{this.state.avol}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='card col-12 data-card'>
                        <h6 className='card-title'>Volume</h6>
                        <p className='card-text stat-text'>{this.state.vol}</p>                    
                    </div>
                    <div className='card col-12 data-card'>
                        <h6 className='card-title'>Dividend Yield</h6>
                        <p className='card-text stat-text'>{this.state.div}</p>
                    </div>
                    <div className='card col-12 data-card'>
                        <h6 className='card-title'>52 Week High</h6>
                        <p className='card-text stat-text'>{this.state['52h']}</p>
                    </div>
                    <div className='card col-12 data-card'>
                        <h6 className='card-title'>52 Week Low</h6>
                        <p className='card-text stat-text'>{this.state['52l']}</p>
                    </div>
                </div>
            </div>
            )
    }
}


export default DataPanel;