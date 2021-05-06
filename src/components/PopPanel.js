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
           fb: "...",
            marketName: ["", "", "", "", ""],
            marketIdx: ["", "", "", "", ""]
        }
        this.getPrices = () => {
            // http://localhost:5000
            // https://whispering-cliffs-51262.herokuapp.com
            var url = new URL("https://whispering-cliffs-51262.herokuapp.com/pop");
            fetch(url).then(response =>
                // console.log(response.json())
                response.json()
            ).then(dat =>{
                let tempMarket = []
                let tempMarketNames = []
                let quotes = JSON.parse(dat.tech).finance.result[0].quotes
                let marketObj = JSON.parse(dat.market).marketSummaryAndSparkResponse.result

                for (let i = 0; i < 5; i++){
                    tempMarketNames.push(marketObj[i].shortName)
                    tempMarket.push(marketObj[i].spark.close[0])
                }
                this.setState({
                    aapl: "$" + quotes.AAPL.regularMarketPrice,
                    goog: "$" + quotes.GOOG.regularMarketPrice,
                    amzn: "$" + quotes.AMZN.regularMarketPrice,
                    msft: "$" + quotes.MSFT.regularMarketPrice,
                    fb: "$" + quotes.FB.regularMarketPrice,
                    marketName: tempMarketNames,
                    marketIdx: tempMarket

                })}
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
                                <div className='col-8'>{this.state.marketName[0]}<div className='pop-price'>{this.state.marketIdx[0]}</div></div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div className='row align-items-center'>
                                <div className='col-8'>{this.state.marketName[1]}<div className='pop-price'>{this.state.marketIdx[1]}</div></div>
                            </div>

                        </li><li class="list-group-item">
                            <div className='row align-items-center'>
                                <div className='col-8'>{this.state.marketName[2]}<div className='pop-price'>{this.state.marketIdx[2]}</div></div>
                            </div>

                        </li><li class="list-group-item">
                            <div className='row align-items-center'>
                                <div className='col-8'>{this.state.marketName[3]}<div className='pop-price'>{this.state.marketIdx[3]}</div></div>
                            </div>

                        </li><li class="list-group-item">
                            <div className='row align-items-center'>
                                <div className='col-8'>{this.state.marketName[4]}<div className='pop-price'>{this.state.marketIdx[4]}</div></div>
                            </div>

                        </li>

                    </div>
                </div>
            </div>
            )
    }
}


export default PopPanel;