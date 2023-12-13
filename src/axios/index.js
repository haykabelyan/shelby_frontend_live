import axios from 'axios';

export default axios.create({
    baseURL: 'https://shelby-backend-live.vercel.app/api/'
});
