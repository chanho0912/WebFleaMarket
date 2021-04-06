import axios from 'axios';
export default axios.create(
    {
        baseURL:'https://webproject-3facc-default-rtdb.firebaseio.com/'
    }
)