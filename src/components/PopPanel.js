import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

class PopPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           
        }
    }

    componentDidUpdate(){
        
    }

    render(){
        return (
            <div id='pop-stocks' className="card col-2" >
                <div class="card-header">
                    Popular Tech Stocks
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div className='row align-items-center'>
                            <i class="fab fa-google col-1"></i>
                            <div className='col-8'>GOOG <div className='pop-price'>$2254.79</div></div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div className='row align-items-center'>
                            <i class="fab fa-apple col-1"></i>
                            <div className='col-8'>AAPL <div className='pop-price'>$131.03</div></div>
                        </div>
                        
                    </li><li class="list-group-item">
                        <div className='row align-items-center'>
                            <i class="fab fa-amazon col-1"></i>
                            <div className='col-8'>AMZN <div className='pop-price'>$3390.00</div></div>
                        </div>
                        
                    </li><li class="list-group-item">
                        <div className='row align-items-center'>
                            <i class="fab fa-microsoft col-1"></i>
                            <div className='col-8'>MSFT <div className='pop-price'>$255.95</div></div>
                        </div>
                        
                    </li><li class="list-group-item">
                        <div className='row align-items-center'>
                            <i class="fab fa-facebook col-1"></i>
                            <div className='col-8'>FB <div className='pop-price'>$311.41</div></div>
                        </div>
                        
                    </li>

                </ul>
            </div>
            )
    }
}


export default PopPanel;