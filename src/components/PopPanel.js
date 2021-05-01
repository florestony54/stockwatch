// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

class PopPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           goog: "...",
           aapl: "...",
           amzn: "...",
           msft: "...",
           fb: "..."
        }
        this.getPrices = () => {
            var url = new URL("https://whispering-cliffs-51262.herokuapp.com/pop");
            fetch(url).then(response =>
                // console.log(response.json())
                response.json()
            ).then(dat =>
                this.setState({
                    aapl: "$" + dat.aapl,
                    goog: "$" + dat.goog,
                    amzn: "$" + dat.amzn,
                    msft: "$" + dat.msft,
                    fb: "$" + dat.fb,
                    sp500: dat.sp500,
                    dow: dat.dow,
                    nasdaq: dat.nasdaq,
                    russel: dat.russel,
                    vix: dat.vix,
                })
            ).catch((err) => {
                console.log(err);
                alert("Error with scraping fxn.")
            })
            // Call the function every 5 sec to update prices
            // setTimeout(this.getPrices, 5000);
        }
    }

    

    componentDidMount(){
        this.getPrices()

        // event.preventDefault();
    }

    render(){
        return (
            <div id='pop-stocks' className="card nav nav-tabs" >
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="tech-tab" data-toggle="tab" href="#tech" role="tab" aria-controls="tech" aria-selected="true">Tech</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="market-tab" data-toggle="tab" href="#market" role="tab" aria-controls="market" aria-selected="false">US Market</a>
                    </li>
                </ul>

                {/* Popular Tech Stocks */}
                <div className='tab-content' id='myTabcontent'>
                
                    {/* Tech */}
                    <div id='tech' class="tab-pane fade show active list-group list-group-flush " role="tabpanel" aria-labelledby="tech-tab">
                        <li class="list-group-item"  onClick={(event) => this.props.callback(event, "GOOG")}>
                            <div className='row align-items-center'>
                                <i class="fab fa-google col-1"></i>
                                <div className='col-8' >GOOG <div className='pop-price'>{this.state.goog}</div></div>
                            </div>
                        </li>
                        <li class="list-group-item" onClick={(event) => this.props.callback(event, "AAPL")}>
                            <div className='row align-items-center'>
                                <i class="fab fa-apple col-1"></i>
                                <div className='col-8'>AAPL <div className='pop-price'>{this.state.aapl}</div></div>
                            </div>
                            
                        </li><li class="list-group-item" onClick={(event) => this.props.callback(event, "AMZN")}>
                            <div className='row align-items-center'>
                                <i class="fab fa-amazon col-1"></i>
                                <div className='col-8'>AMZN <div className='pop-price'>{this.state.amzn}</div></div>
                            </div>
                            
                        </li><li class="list-group-item" onClick={(event) => this.props.callback(event, "MSFT")}>
                            <div className='row align-items-center'>
                                <i class="fab fa-microsoft col-1"></i>
                                <div className='col-8'>MSFT <div className='pop-price'>{this.state.msft}</div></div>
                            </div>
                            
                        </li><li class="list-group-item" onClick={(event) => this.props.callback(event, "FB")}>
                            <div className='row align-items-center'>
                                <i class="fab fa-facebook col-1"></i>
                                <div className='col-8'>FB <div className='pop-price'>{this.state.fb}</div></div>
                            </div>
                            
                        </li>

                    </div>

                    {/* Market */}
                    <div id='market' class="tab-pane fade list-group list-group-flush " role="tabpanel" aria-labelledby="market-tab">
                        <li class="list-group-item">
                            <div className='row align-items-center'>
                                <div className='col-8'>Dow<div className='pop-price'>{this.state.dow }</div></div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div className='row align-items-center'>
                                <div className='col-8'>S&P 500<div className='pop-price'>{ this.state.sp500}</div></div>
                            </div>

                        </li><li class="list-group-item">
                            <div className='row align-items-center'>
                                <div className='col-8'>Nasdaq <div className='pop-price'>{this.state.nasdaq }</div></div>
                            </div>

                        </li><li class="list-group-item">
                            <div className='row align-items-center'>
                                <div className='col-8'>Russel <div className='pop-price'>{this.state.russel }</div></div>
                            </div>

                        </li><li class="list-group-item">
                            <div className='row align-items-center'>
                                <div className='col-8'>VIX <div className='pop-price'>{this.state.vix }</div></div>
                            </div>

                        </li>

                    </div>
                </div>
            </div>
            )
    }
}


export default PopPanel;