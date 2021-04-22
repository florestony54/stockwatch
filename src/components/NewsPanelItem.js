import React from 'react';
import stock from '../media/stock.jpg'

class NewsPanelItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: 'NEWS TITLE ABOUT THIS THING YOU SEARCHED',
            provider: 'Yahoo Finance',
            date: '4/22/2021',
            url: '',
            img: stock,
            published: ""
        }
    }

    componentDidMount(){
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
                    <a class="news-url" href={this.state.url}>
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