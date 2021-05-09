import React from 'react';

/*
/ Component that contains data for Tech Stocks, Trending tickers, and Market conditions
/ Author: Tony Flores: https://github.com/florestony54
/ v3.0
*/

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
            marketIdx: ["", "", "", "", ""],
            trendingNames: ["", "", "", "", ""],
            trendingPrices: ["", "", "", "", ""],
            callbacks: [(event) => this.props.callback(event, this.state.trendingNames[0]),
                        (event) => this.props.callback(event, this.state.trendingNames[1]),
                        (event) => this.props.callback(event, this.state.trendingNames[2]),
                        (event) => this.props.callback(event, this.state.trendingNames[3]),
                        (event) => this.props.callback(event, this.state.trendingNames[4])]
        }

        // Method to Fetch Symbols, Prices, and Market data from server
        // Component renders on page load, and this method is called
        this.getPrices = () => {
            // Use localhost when testing on dev server, herokuapp in production
            // http://localhost:5000
            // https://whispering-cliffs-51262.herokuapp.com
            var url = new URL("http://localhost:5000/pop");

            // Query the server URL for data
            fetch(url).then(response =>
                response.json()
            ).then(dat =>{
                
                let tempMarket = []
                let tempMarketNames = []
                let tempTrending = []
                let tempTrendingNames = []
                let tempCallbacks = [];

                
                let quotes = JSON.parse(dat.tech).finance.result[0].quotes
                let marketObj = JSON.parse(dat.market).marketSummaryAndSparkResponse.result
                let trendingObj = JSON.parse(dat.trending).finance.result[0].quotes
                
                // Get top 5 indexes from the Market response
                for (let i = 0; i < 5; i++){
                    if (marketObj[i].spark.close != null){
                    tempMarketNames.push(marketObj[i].shortName);
                    tempMarket.push(marketObj[i].spark.close[0]);
                }
                    
                }

                // Get the first 5 trending tickers
                for (let j = 0; j < 5; j++) {
                    if (trendingObj[j].quoteType != "CRYPTOCURRENCY") { // Crypto incompatible with charting
                        tempTrendingNames.push(trendingObj[j].symbol)
                        tempTrending.push(trendingObj[j].regularMarketPrice)
                        // Function to search for this ticker 
                        tempCallbacks[j] = (event) => this.props.callback(event, this.state.trendingNames[j]) 
                    } else {
                        tempTrendingNames.push(trendingObj[j].symbol + " (CRYPTO)") 
                        tempTrending.push(trendingObj[j].regularMarketPrice)
                        tempCallbacks[j] = [console.log("")] // Remove function to search for ticker
                    }
                }

                // Push the change to state so elements get updated
                this.setState({trendingNames: tempTrendingNames})
                this.setState({trendingPrices: tempTrending})
                this.setState({callbacks: tempCallbacks});
                

                // Set prices for tech ticker symbols and market index values
                this.setState({
                    aapl: "$" + quotes.AAPL.regularMarketPrice,
                    goog: "$" + quotes.GOOG.regularMarketPrice,
                    amzn: "$" + quotes.AMZN.regularMarketPrice,
                    msft: "$" + quotes.MSFT.regularMarketPrice,
                    fb: "$" + quotes.FB.regularMarketPrice,
                    marketName: tempMarketNames,
                    marketIdx: tempMarket,
                    trendingNames: tempTrendingNames,
                    trendingPrices: tempTrending

                })}
            ).catch((err) => {
                console.log(err);
                // Heroku sleeps the server after inactivity. If server takes too long to respond this alert will show
                alert("There was a server error. Please refresh the page and try again.")
            })
        }
    }

    

    componentDidMount(){
        this.getPrices()
    }

    render(){
        return (
            <div id='pop-stocks' className="card nav nav-tabs" >
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    
                    <li class="nav-item">
                        <a class="nav-link active" id="tech-tab" data-toggle="tab" href="#tech" role="tab" aria-controls="tech" aria-selected="true">Tech</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="trending-tab" data-toggle="tab" href="#trending" role="tab" aria-controls="trending" aria-selected="false">Trending Tickers</a>
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

                    {/* Trending Tickers */}
                    <div id='trending' class="tab-pane fade list-group list-group-flush " role="tabpanel" aria-labelledby="trending-tab">
                        <li class="list-group-item" onClick={this.state.callbacks[0]}>
                            <div className='row align-items-center'>
                                <div className='col-8' >{this.state.trendingNames[0]} <div className='pop-price'>${this.state.trendingPrices[0]}</div></div>
                            </div>
                        </li>
                        <li class="list-group-item" onClick={this.state.callbacks[1]}>
                            <div className='row align-items-center'>
                                <div className='col-8'>{this.state.trendingNames[1]} <div className='pop-price'>${ this.state.trendingPrices[1] }</div></div>
                            </div>

                        </li><li class="list-group-item" onClick={this.state.callbacks[2]}>
                            <div className='row align-items-center'>
                                <div className='col-8'>{this.state.trendingNames[2]} <div className='pop-price'>${this.state.trendingPrices[2]}</div></div>
                            </div>

                        </li><li class="list-group-item" onClick={this.state.callbacks[3]}>
                            <div className='row align-items-center'>
                                <div className='col-8'>{this.state.trendingNames[3]} <div className='pop-price'>${this.state.trendingPrices[3]}</div></div>
                            </div>

                        </li><li class="list-group-item" onClick={this.state.callbacks[4]}>
                            <div className='row align-items-center'>
                                <div className='col-8'>{this.state.trendingNames[4]} <div className='pop-price'>${this.state.trendingPrices[4]}</div></div>
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