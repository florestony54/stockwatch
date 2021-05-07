import React from 'react';
import stock from '../media/stock.jpg'

/*
/ Component containing a List Item containing a News article-- Multiple rendered on page
/ Author: Tony Flores: https://github.com/florestony54
/ v3.0
*/

class NewsPanelItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '', 
            provider: '',
            date: '',
            url: '',
            img: stock, //stock img if no image is returned from API
            published: ""
        }
    }

    componentDidMount(){
        // Calculate the difference in hours between when the Item renders 
        // and when the article was published
        var now = new Date()
        var pub = new Date(this.props.date * 1000)
        var diff = Math.round((now - pub) / 3600000)
        this.setState({title: this.props.title});
        if (this.props.img){
            this.setState({img: this.props.img})
        }
        
        this.setState({url: this.props.url})
        this.setState({provider: this.props.provider})
        this.setState({published: diff + " hours ago"})
    }

    componentDidUpdate(){
        
    }

    render(){
        return (
                
                <li class="list-group-item news-list-item">   
                    <a class="news-url" href={this.state.url} target="_blank">
                        <div className='row'>
                            <img class="col-2 news-img" src={this.state.img} alt=""></img>
                            <div class='col-9 news-item'>
                                <p class='news-text-secondary'>{this.state.provider} - {this.state.published}</p>
                                <h5 >{this.state.title} </h5> 
                            </div>
                        </div>    
                    </a>
                </li>  
            )
    }
}


export default NewsPanelItem;