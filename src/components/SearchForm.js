import React from 'react';
import Chart from './Chart';
import PopPanel from './PopPanel';
import DataPanel from './DataPanel';
import InfoPanel from './InfoPanel';


class SearchForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input:'',
            chart: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({input: event.target.value})
    }

    handleSubmit(event){
        var url = new URL("https://stockwatch-team12-server.herokuapp.com/"), // Update url when app gets deployed
            params = {'ticker': this.state.input}; //URL params to pass to server
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        console.log('Searching Ticker Symbol: ' + this.state.input)

        fetch(url).then(response => 
            response.json()
        ).then(dat => this.setState({chart: <Chart ticker={this.state.input}
            data={dat} />})).catch((err) => {
                console.log(err);
                alert("Invalid. Please use a valid ticker symbol.")
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
                
            </div>
            )
    }
}


export default SearchForm;