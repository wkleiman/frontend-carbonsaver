import axios from 'axios';
import { URL_ROOT } from './urls';

export default axios.create({
    baseURL: URL_ROOT,
});