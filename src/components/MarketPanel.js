import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

class MarketPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goog: "...",
            aapl: "...",
            amzn: "...",
            msft: "...",
            fb: "..."
        }
        // this.getPrices = () => {
        //     var url = new URL("http://localhost:5000/pop");
        //     fetch(url).then(response =>
        //         response.json()
        //     ).then(dat =>
        //         this.setState({
        //             aapl: "$" + dat.aapl,
        //             goog: "$" + dat.goog,
        //             amzn: "$" + dat.amzn,
        //             msft: "$" + dat.msft,
        //             fb: "$" + dat.fb,
        //         })
        //     ).catch((err) => {
        //         console.log(err);
        //         alert("Error with scraping fxn.")
        //     })

        //     // setTimeout(this.getPrices, 5000);
        // }
    }



    componentDidMount() {
        // this.getPrices()

    }

    render() {
        return (
            <div id='pop-stocks' className="card col-2" >
                <div class="card-header">
                    Market
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div className='row align-items-center'>
                            <i class="fab fa-google col-1"></i>
                            <div className='col-8'>GOOG <div className='pop-price'>{this.state.goog}</div></div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div className='row align-items-center'>
                            <i class="fab fa-apple col-1"></i>
                            <div className='col-8'>AAPL <div className='pop-price'>{this.state.aapl}</div></div>
                        </div>

                    </li><li class="list-group-item">
                        <div className='row align-items-center'>
                            <i class="fab fa-amazon col-1"></i>
                            <div className='col-8'>AMZN <div className='pop-price'>{this.state.amzn}</div></div>
                        </div>

                    </li><li class="list-group-item">
                        <div className='row align-items-center'>
                            <i class="fab fa-microsoft col-1"></i>
                            <div className='col-8'>MSFT <div className='pop-price'>{this.state.msft}</div></div>
                        </div>

                    </li><li class="list-group-item">
                        <div className='row align-items-center'>
                            <i class="fab fa-facebook col-1"></i>
                            <div className='col-8'>FB <div className='pop-price'>{this.state.fb}</div></div>
                        </div>

                    </li>

                </ul>
            </div>
        )
    }
}


export default MarketPanel;