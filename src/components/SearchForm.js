import React from 'react';
import Chart from './Chart';
import PopPanel from './PopPanel';
import DataPanel from './DataPanel';
import NewsPanelItem from './NewsPanelItem';
import SummaryPanel from './SummaryPanel';
import CompanyHeader from './CompanyHeader';
import Spinner from './Spinner';


class SearchForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataLoaded: false,
            input:'',
            ticker: null,
            chart: null,
            newsFeed: null,
            newsItems: [],
            stats: null,
            summary: null,
            company: null,
            // related: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitFromLink = this.submitFromLink.bind(this);
    }

    handleChange(event){
        this.setState({input: event.target.value})
    }

    submitFromLink(event, sym){
        var val = event.target.firstChild.data
        this.handleSubmit(event, sym)
    }

    handleSubmit(event, sym){
        // "https://whispering-cliffs-51262.herokuapp.com/"
        // "http://localhost:5000/"
        this.setState({dataLoaded: false});
        var url = new URL("https://whispering-cliffs-51262.herokuapp.com/"),
            params = {'ticker': sym}; //URL params to pass to server
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        var newsUrl = new URL("https://whispering-cliffs-51262.herokuapp.com/news"),
            params = {'ticker': sym}; //URL params to pass to server
        Object.keys(params).forEach(key => newsUrl.searchParams.append(key, params[key]));

        var sumUrl = new URL("https://whispering-cliffs-51262.herokuapp.com/summary"),
            params = { 'ticker': sym }; //URL params to pass to server
        Object.keys(params).forEach(key => sumUrl.searchParams.append(key, params[key]));

        // Get Chart and Stats from server
        this.setState({chart: <Spinner />})
        fetch(url).then(response => 
                response.json()
        ).then(dat => {
            let relArray = JSON.parse(dat[2]).finance.result[0].quotes  // [2] for related stocks
            this.setState({chart: <Chart ticker={sym}
                data={dat[0]} />})                                      // [0] for chart data
            this.setState({stats: <DataPanel data={dat[1]} related={relArray} />}) // [1] for stats
            this.setState({ticker: sym.toUpperCase() })
            // this.setState({related: relArray})
            }).catch((err) => {
                console.log(err);
                alert("Invalid. Please use a valid ticker symbol.")
            })

        // Get News
        this.setState({newsFeed:null})
        fetch(newsUrl).then(response =>
            response.json()
            ).then(data =>
                this.setState({ //Mapping News Items 
                    newsFeed: data.items.result.slice(0,9).map((item, index) =>{ 
                    if (item.main_image == undefined){
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

            // Get Company Summary
            // this.setState({company: null})
            fetch(sumUrl).then(response =>
                response.json()
                ).then(data =>{
                    this.setState({
                        company: <CompanyHeader name={data.quoteType.longName} ticker={sym.toUpperCase()} />
                    })
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
        if (loaded == true) {
            dashboard =
                <div id='main-dash' className='col'>
                    <div id='dash-row' className='row'>
                        {this.state.company}

                        <div id='chart-container' className="col-7 d-flex justify-content-center">
                            {this.state.chart}
                        </div>
                        <div className='col-3'>
                            {this.state.stats}

                        </div>
                    </div>

                    <div id='news-row' className='row justify-content-end'>
                        <div className='col-7'>
                            <ul id="news-list" class="list-group">
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
                    <form id='ticker-form' onSubmit={(event) => this.handleSubmit(event, this.state.input)}>
                        <div className="">
                            <div className='form-floating'>
                                <input input={this.state.input} 
                                        type="text" className="form-control" 
                                        id="ticker-input" 
                                        aria-describedby="searchHelp"
                                        onChange={this.handleChange}
                                        placeholder='SPY'></input>
                                    <label for="ticker-input" >Ticker Symbol</label>
                            </div>
                            <div id="searchHelp" className="form-text">Enter a ticker symbol to search</div>
                        </div>
                        <button  type="submit" className="btn btn-primary">
                            Get Data
                        </button>
                        <PopPanel callback={this.submitFromLink}/>
                    </form>
                </div>

                {dashboard}

            </div>
            )
    }
}


export default SearchForm;