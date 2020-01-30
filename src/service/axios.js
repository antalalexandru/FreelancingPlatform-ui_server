// noinspection SpellCheckingInspection
import axios from 'axios';

// const API_URL = 'https://php-mock-api.herokuapp.com/'; // process.env.API_URL || 'http://localhost:3000';

const API_URL = 'http://localhost:3000';

let headers = {
    'Content-Type': 'application/json'
};

if (localStorage.user && JSON.parse(localStorage.user) != null) {
    headers = {
        ...headers,
        'Authorization': JSON.parse(localStorage.user).token,
    };
}

export default axios.create({
    baseURL: API_URL,
    headers
})