import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/webproject-3facc/us-centrall/api'
});

export default instance;