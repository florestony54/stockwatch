import React from 'react';
import Chart from './Chart';

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
        var url = new URL("http://localhost:5000/"), // Update url when app gets deployed
            params = {'ticker': this.state.input};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        console.log('Searching Ticker Symbol: ' + this.state.input)

        fetch(url).then(response => 
                // console.log(response.json())
            response.json()
        ).then(dat => this.setState({chart: <Chart ticker={this.state.input}
            data={dat} />}))

        event.preventDefault();
    }

    componentDidMount(){
        
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
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
                <div id='chart-container' className="container">
                    {this.state.chart}
                </div>
                
            </div>
            )
    }
}


export default SearchForm;