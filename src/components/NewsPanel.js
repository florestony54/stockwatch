import React from 'react';
import stock from '../media/stock.jpg'
import NewsPanelItem from './NewsPanelItem'

class NewsPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ticker: '',
            img: stock
        }
    }

    componentDidUpdate(){
        
    }

    render(){
        return (
            <div className='col-7'>
                <h2>In The News</h2>
                <ul class="list-group">
                    <NewsPanelItem />
                    <NewsPanelItem />
                    <NewsPanelItem />
                    <NewsPanelItem />
                    <NewsPanelItem />
                </ul>
            </div>
            )
        }
}


export default NewsPanel;