import axios from 'axios';
import * as Config from './../constant/Config'


const connectAPI = (page, method = "GET", body) => {
    return axios({
        method: method,
        url: `${Config.URL}${page}`,
        data: body
    })
    .catch((error) => {
        console.log(error);
    });
}

export default connectAPI;