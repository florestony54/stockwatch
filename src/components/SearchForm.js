import React from 'react';
import Chart from './Chart';
import PopPanel from './PopPanel';
import DataPanel from './DataPanel';
import NewsPanelItem from './NewsPanelItem';


class SearchForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input:'',
            chart: null,
            newsFeed: null,
            newsItems: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({input: event.target.value})
    }

    handleSubmit(event){
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
        ).then(dat => this.setState({chart: <Chart ticker={this.state.input}
            data={dat} />})).catch((err) => {
                console.log(err);
                alert("Invalid. Please use a valid ticker symbol.")
            })
        this.setState({newsFeed: null})
        fetch(newsUrl).then(response =>
            response.json()
            ).then(data =>
                this.setState({
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
                <form id='ticker-form' onSubmit={this.handleSubmit}>
                    <div className="container mb-3 col-2">
                        <label for="exampleInputEmail1" className="form-label">Ticker Symbol</label>
                        <input input={this.state.input} 
                                type="text" className="form-control" 
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp"
                                onChange={this.handleChange}></input>
                        <div id="emailHelp" className="form-text">Enter a ticker symbol to search.</div>
                    </div>
                    <button  type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div id='dash-row' className='row'>
                    <PopPanel />
                    <div id='chart-container' className="col-6 d-flex justify-content-center">
                        {this.state.chart}
                    </div>
                    <DataPanel />
                    {/* <InfoPanel /> */}
                </div>
                <div id='news-row' className='row justify-content-center'>
                    <div className='col-7'>
                        <ul id="news-list" class="list-group">
                            {this.state.newsFeed}

                        </ul>
                    </div>
                </div>
                
            </div>
            )
    }
}


export default SearchForm;