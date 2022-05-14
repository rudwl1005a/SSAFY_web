import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true // default: false -> sessionid를 매번 신규로 발급
});