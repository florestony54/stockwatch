import React from 'react';

class InfoPanel extends React.Component{
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
            <div className="col-2">
                <div className='row'>
                    <div className='card col-12 data-card'>
                        <h6 className='card-title'>Price</h6>
                        <p className='card-text'>$142.35</p>                    
                    </div>
                    <div className='card col-12 data-card'>
                        <h6 className='card-title'>Open</h6>
                        <p className='card-text'>$140.78</p>
                    </div>
                    <div className='card col-12 data-card'>
                        <h6 className='card-title'>Prev. Close</h6>
                        <p className='card-text'>$139.97</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='card col-12 data-card'>
                        <h6 className='card-title'>Volume</h6>
                        <p className='card-text'>91,419,983</p>                    
                    </div>
                    <div className='card col-12 data-card'>
                        <h6 className='card-title'>P/E</h6>
                        <p className='card-text'>35.60</p>
                    </div>
                    <div className='card col-12 data-card'>
                        <h6 className='card-title'>Market Cap</h6>
                        <p className='card-text'>2.203T</p>
                    </div>
                </div>
            </div>
            )
    }
}


export default InfoPanel;