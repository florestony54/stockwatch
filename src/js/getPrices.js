import requestData from '../js/request';

//component argument should be "pop", "sma/ema", "news", or "summary"
var getPrices = (component) =>{
    return new Promise(function(resolve, reject){
        let retData = requestData(component);
        if(retData) {
            resolve( retData)
        } else {
            reject("No data")
        }
    })
}



export default getPrices;