import axios from 'axios';

export default axios.create({
    baseURL: 'https://shelby-backend-services.vercel.app/api/'
});
