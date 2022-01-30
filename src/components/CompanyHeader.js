import React from 'react';

/*
/ Component containing the Header information for the company that is searched for
/ Author: Tony Flores: https://github.com/florestony54
/ v3.0
*/

class CompanyHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: null,
            name: null
        }
    }

    // React lifecycle methods will just update name and ticker in state 
    // when the component renders/updates.
    updateHeader(){
        this.setState({ticker: this.props.ticker})
        this.setState({name: this.props.name})
    }

    componentDidMount(){
        this.setState({ ticker: this.props.ticker })
        this.setState({ name: this.props.name })
    }

    componentDidUpdate(prevProps) {
        if(this.props.ticker != prevProps.ticker && this.props.name != prevProps.name){
            this.updateHeader()
        }
        
    }

    render() {
        return (
            <div className='row justify-content-end'>
                <h1 id='company-name' className='card col-9 '>
                    <span id="comp-name-span">
                        {this.state.name}
                        <span class="badge bg-danger">{this.state.ticker}</span>
                    </span>
                </h1>
            </div>
        )
    }
}


export default CompanyHeader;



