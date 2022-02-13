import React from 'react';
import Chart from './Chart';
import PopPanel from './PopPanel';
import DataPanel from './DataPanel';
import NewsPanelItem from './NewsPanelItem';
import SummaryPanel from './SummaryPanel';
import CompanyHeader from './CompanyHeader';
import Spinner from './Spinner';
import logo from '../media/logo1.png';

/*
/ Component containing the Parent component for all other components of the app
/ This component also is responsible for most of the queries sent to the server
/ Author: Tony Flores: https://github.com/florestony54
/ v3.0
*/


class SearchForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataLoaded: false,
            requestLoading: false,
            input:'',
            ticker: null,
            chart: null,
            newsFeed: null,
            newsItems: [],
            stats: null,
            summary: null,
            company: null,
            errormsg: null,
            chartType: null
        }
        this.requestLoading = false;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitFromLink = this.submitFromLink.bind(this);
        this.handleIntradaySubmit = this.handleIntradaySubmit.bind(this);
        this.handleDailySubmit = this.handleDailySubmit.bind(this);
    }

    // Allows the form to dynamically update based on user input
    // Buttons still must be clicked for form to be submitted
    handleChange(event){
        this.setState({input: event.target.value})
    }

    /* Method to submit a query to the server for the Ticker symbol item that is clicked
    /  When an item in Tech or Trending Tickers is clicked,
    /  this method will submit a query to the server as if 
    /  the user typed this ticker symbol into the input and
    /  clicked the Get Daily Chart button.
    /  This method calls handleSubmit and passes the symbol as an argument
    */
    submitFromLink(event, sym){
        // This method will always render a Daily chart on the page
        // if 'daily' is changed to 'intra' it will render an intraday chart
        this.handleSubmit(event, sym, 'daily') 
    }

    // Calls handleSubmit() for an intraday chart rendering
    handleIntradaySubmit(event){
        this.handleSubmit(event, this.state.input, 'intra')
    }

    // Calls handleSubmit() for a daily chart rendering
    handleDailySubmit(event){
        this.handleSubmit(event, this.state.input, 'daily')
    }


    /* Main function of the application
    /  Will query the server for data on the ticker symbol: (sym)
    / and will render a chart of type: (chartType) [daily/intra]
    */
    handleSubmit(event, sym, chartType){
            this.requestLoading = true
            
            var type = chartType;
            // Setting the chart as 'daily' or 'intra'
            this.setState({chartType: type})

            // Use localhost when testing on dev server, herokuapp in production
            // "https://whispering-cliffs-51262.herokuapp.com/"
            // "http://localhost:5000/"
            this.setState({dataLoaded: false});
            this.setState({errormsg: null})

            // Server routes to query: '/', '/news', and '/summary'
            var url = new URL("https://whispering-cliffs-51262.herokuapp.com/"),
                params = {'ticker': sym,
                            'type': type}; // URL params to pass to server
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            var newsUrl = new URL("https://whispering-cliffs-51262.herokuapp.com/news"),
                params = {'ticker': sym}; // URL params to pass to server
            Object.keys(params).forEach(key => newsUrl.searchParams.append(key, params[key]));

            var sumUrl = new URL("https://whispering-cliffs-51262.herokuapp.com/summary"),
                params = {'ticker': sym}; // URL params to pass to server
            Object.keys(params).forEach(key => sumUrl.searchParams.append(key, params[key]));

            // Get Chart and Stats from server
           this.setState({chart: <Spinner />});

            // Query the server URL for charting, stats, and related data
            fetch(url).then(response => 
                    response.json()
            ).then(dat => {
                // dat[2] is the index in the response data that returns related stocks for DataPanel
                let relArray = JSON.parse(dat[2]).finance.result[0].quotes  

                // dat[0] is the index that contains the data for the Chart component
                this.setState({chart: <Chart ticker={sym}
                    data={dat[0]} 
                    chartType={type}
                    />}) 

                // dat[1] is the index that contains the key statistics data for DataPanel
                this.setState({stats: <DataPanel data={JSON.parse(dat[1])} related={relArray} />}) // dat[1] for stats
                this.setState({ticker: sym.toUpperCase() })
                }).catch((err) => {
                    console.log(err);
                    this.setState({errormsg: 
                        <div class="alert alert-danger" role="alert">
                            Please enter a valid Ticker symbol. Note: The site is currently incompatible with Cryptocurrencies.
                        </div>})
                })

            // News
            this.setState({newsFeed:null})
            // Query the server '/news' route
            fetch(newsUrl).then(response =>
                response.json()
                ).then(data => 
                    this.setState({ 
                        // Map 9 NewsPanelItems from the response data 
                        newsFeed: data.items.result.slice(0,9).map((item, index) =>{ 
                        if (item.main_image == undefined){ // some articles dont have an image
                        return <NewsPanelItem key={index} 
                                                title={item.title}
                                                url={item.link}
                                                provider={item.publisher} 
                                                date={item.published_at}/>
                        } else {  
                            return <NewsPanelItem key={index} 
                                                title={item.title}
                                                url={item.link}
                                                provider={item.publisher}
                                                img={item.main_image.original_url}
                                                date={item.published_at}
                                                />
                        }
                                    
                    })
                }),
            ).catch((err) => {
                    console.log(err)
                })

                // Query the server '/summary' route
                fetch(sumUrl).then(response =>
                    response.json()
                    ).then(data =>{
                        this.setState({
                            // Set this.state.company to render a CompanyHeader component
                            company: <CompanyHeader name={data.quoteType.longName} ticker={sym.toUpperCase()} />
                        })
                        // Set this.state.summary to render a SummaryPanel component
                        this.setState({ summary: <SummaryPanel company={data.quoteType.longName} summary={data.summaryProfile.longBusinessSummary} /> })
                    }
                    ).catch((err) => {
                        console.log(err)
                    })
                    
                event.preventDefault();
            this.setState({ dataLoaded: true })
        }

    componentDidMount(){
        
    }

    render(){
        const loaded = this.state.dataLoaded;
        let dashboard;

        // Once the server query returns data and the promises go from pending to fulfilled
        // loaded is set to true so components can render with data.
        // If there is no data for the child components, they wont render.
        if (loaded == true) {
            dashboard =
                <div id='main-dash' className='col'>
                    <div id='dash-row' className='row'>
                        {this.state.company}

                        <div id='chart-container' className="col-6 d-flex justify-content-center">
                            {this.state.chart}
                        </div>
                        <div className='col-3'>
                            {this.state.stats}
                            
                        </div>
                    </div>

                    <div id='news-row' className='row justify-content-end'>
                        <div className='col-6'>
                            <ul id="news-list" class="list-group">
                                <li id="news-title" class="list-group-item news-list-item">   
                                    <div className='row'>
                                        <i id="news-icon" class="fas fa-newspaper"></i>
                                        <div class='col-9 news-item'>
                                            <h2 >Related News </h2> 
                                        </div>
                                    </div>    
                                </li>
                                {this.state.newsFeed}
                            </ul>
                        </div>
                        <div className='col-3'>
                            {this.state.summary}
                            
                        </div>
                    </div>
                </div>
        } 

        return ( 
            <div >
                <div className='col-2' id='side-nav'>
                    <a class="navbar-brand" href="/">
                        <img src={logo} id="logo-img" width="100%" height="12%" alt=""/>
                    </a>
                    <form id='ticker-form'> 
                        <div className="">
                            <div id="ticker-form-floating" className='form-floating'>
                                <input input={this.state.input} 
                                        type="text" className="form-control" 
                                        id="ticker-input" 
                                        aria-describedby="searchHelp"
                                        onChange={this.handleChange}
                                        placeholder='SPY'></input>
                                    <label id="ticker-input-label" for="ticker-input" >Ticker Symbol</label>
                            </div>
                            <div id="searchHelp" className="form-text">Enter a ticker symbol to search</div>
                        </div>
                        <button onClick={this.handleDailySubmit} id="btn-search-daily" className="btn btn-primary" > 
                            Daily Chart
                        </button>
                        <button onClick={this.handleIntradaySubmit} id="btn-search-intra" className="btn btn-success">
                            Intraday Chart
                        </button>
                        <PopPanel callback={this.submitFromLink}/>
                    </form>
                </div>
               
                {dashboard}
                {this.state.errormsg}

            </div>
            )
    }
}


export default SearchForm;