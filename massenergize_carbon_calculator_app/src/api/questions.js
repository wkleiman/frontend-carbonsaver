import axios from 'axios';

export default axios.create({
    baseURL: 'http://api.massenergize.com'
});