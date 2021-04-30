import React from 'react';

class CompanyHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: null,
            name: null
        }
    }

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
                <h1 id='company-name' className='card col-10 '>
                    {this.state.name}
                    <span class="badge bg-danger">{this.state.ticker}</span>
                </h1>
            </div>
        )
    }
}


export default CompanyHeader;



