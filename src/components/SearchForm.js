import React from 'react';
import Chart from './Chart';
import PopPanel from './PopPanel';
import DataPanel from './DataPanel';
import NewsPanelItem from './NewsPanelItem';
import SummaryPanel from './SummaryPanel';


class SearchForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input:'',
            ticker: null,
            chart: null,
            newsFeed: null,
            newsItems: [],
            stats: null,
            summary: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({input: event.target.value})
    }

    handleSubmit(event){
        // "https://whispering-cliffs-51262.herokuapp.com/"
        var now = new Date()
        var url = new URL("https://whispering-cliffs-51262.herokuapp.com/"), // Update url when app gets deployed
            params = {'ticker': this.state.input}; //URL params to pass to server
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        var newsUrl = new URL("https://whispering-cliffs-51262.herokuapp.com/news"), // Update url when app gets deployed
            params = {'ticker': this.state.input}; //URL params to pass to server
        Object.keys(params).forEach(key => newsUrl.searchParams.append(key, params[key]));

        console.log('Searching Ticker Symbol: ' + this.state.input)

        fetch(url).then(response => 
                response.json()
        ).then(dat => {
            this.setState({chart: <Chart ticker={this.state.input}
                data={dat[0]} />}) //[0] for chart data
            this.setState({stats: <DataPanel data={dat[1]} />}) //[1] for stats
            this.setState({summary: <SummaryPanel />})
            this.setState({ ticker: this.state.input.toUpperCase() })
            }).catch((err) => {
                console.log(err);
                alert("Invalid. Please use a valid ticker symbol.")
            })
        this.setState({newsFeed: null})
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
            event.preventDefault();
        
    }

    componentDidMount(){
        
    }

    render(){
        return (
            <div >
                <div className='col-2' id='side-nav'>
                    <form id='ticker-form' onSubmit={this.handleSubmit}>
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
                        <button  type="submit" className="btn btn-primary">Get Data</button>
                        <PopPanel />
                    </form>
                </div>

                <div id='main-dash' className='col'>
                    <div id='dash-row' className='row'>
                    <div className='row justify-content-end'>
                        <h1 id='company-name' className='card col-10 '>
                                COMPANY NAME
                            <span class="badge bg-danger">{this.state.ticker }</span>
                        </h1>
                            
                    </div>
                        
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
                
            </div>
            )
    }
}


export default SearchForm;