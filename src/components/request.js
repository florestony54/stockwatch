import axios from "axios";

// https://whispering-cliffs-51262.herokuapp.com
const baseURL = "https://whispering-cliffs-51262.herokuapp.com/"

function requestData(path){
    let urlStr = baseURL + path;
    let fullURL = new URL(urlStr);
    return axios.get(fullURL).then(res => 
            res.data
        )

}

export default requestData;