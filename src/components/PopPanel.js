import React from 'react';
import getPrices from './getPrices';
import PopPanelListItem from './PopPanelListItem';
import PopPanelMarketItem from './PopPanelMarketItem';
import PopPanelTechItem from './PopPanelTechItems';

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
           meta: "...",
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
        this.setPrices = () => {
            // Use localhost when testing on dev server, herokuapp in production
            // http://localhost:5000
            // https://whispering-cliffs-51262.herokuapp.com

            // Query the server URL for data
            getPrices("pop").then( (dat) => {  
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
                    if (trendingObj[j].quoteType == "EQUITY") { // Only Equities tested for charting
                        tempTrendingNames.push(trendingObj[j].symbol)
                        tempTrending.push(trendingObj[j].regularMarketPrice)
                        // Function to search for this ticker for charting
                        tempCallbacks[j] = (event) => this.props.callback(event, this.state.trendingNames[j]) 
                    } else {
                        tempTrendingNames.push(trendingObj[j].symbol + " (No Chart)") 
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
                    meta: "$" + quotes.META.regularMarketPrice,
                    marketName: tempMarketNames,
                    marketIdx: tempMarket,
                    trendingNames: tempTrendingNames,
                    trendingPrices: tempTrending

                })
            }).catch((err) => {
                console.log(err);
                // Heroku sleeps the server after inactivity. If server takes too long to respond this alert will show
                alert("There was a server error. Please refresh the page and try again.")
            })
        }
    }

    componentDidMount(){
        this.setPrices()
    }

    render(){
        var trendingItems = this.state.trendingNames.map((el, index) =>
            <PopPanelListItem id={"trending-item-" + index}
                              callback={this.state.callbacks[index]} 
                              itemName={this.state.trendingNames[index]} 
                              price={this.state.trendingPrices[index]} /> )

        var techList = ["aapl", "amzn", "meta", "goog", "msft"]
        var techItems = techList.map((item, index) => 
        <PopPanelTechItem id={"tech-item-" + index}
                          callback={(event) => this.props.callback(event, item)}
                          ticker={item}
                          price={this.state[item]} /> )

        var marketItems = this.state.marketName.map((el, index) => 
            <PopPanelMarketItem id={"market-item-" + index}
                              marketName={this.state.marketName[index]} 
                              marketIndex={this.state.marketIdx[index]} /> 
        )

        return (
            <div id='pop-stocks' className="card nav nav-tabs" >

                {/* Popular Tech Stocks */}
                <a href="#tech" data-toggle="collapse" aria-expanded="false" class="pop-collapse bg-dark list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-start align-items-center">
                        <span class="fas fa-laptop-code fa-fw mr-3"></span>
                        <span class="menu-collapsed">Tech</span>
                        <span class="submenu-icon ml-auto"></span>
                    </div>
                </a>
                <div className='tab-content' id='myTabcontent'>
                    <div id='tech' class="collapse sidebar-submenu" role="tabpanel" aria-labelledby="tech-tab">

                        { techItems }

                    </div>

                    {/* Trending Tickers */}
                    <a href="#trending" data-toggle="collapse" aria-expanded="false" class="pop-collapse bg-dark list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-start align-items-center">
                            <span class="fas fa-chart-line fa-fw mr-3"></span>
                            <span class="menu-collapsed">Trending Tickers</span>
                            <span class="submenu-icon ml-auto"></span>
                        </div>
                    </a>
                    <div id='trending' class="collapse sidebar-submenu" role="tabpanel" aria-labelledby="trending-tab">
                        
                        {trendingItems}

                    </div>

                    {/* Market */}
                    <a href="#market" data-toggle="collapse" aria-expanded="false" class="pop-collapse bg-dark list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-start align-items-center">
                            <span class="fas fa-coins fa-fw mr-3"></span>
                            <span class="menu-collapsed">US Market</span>
                            <span class="submenu-icon ml-auto"></span>
                        </div>
                    </a>
                    <div id='market' class="collapse sidebar-menu" role="tabpanel" aria-labelledby="market-tab">
                        
                        {marketItems}
                        
                    </div>
                </div>
            </div>
            )
    }
}


export default PopPanel;
