import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://smarthomeplatform-5d036.firebaseio.com/'
});

export default instance;