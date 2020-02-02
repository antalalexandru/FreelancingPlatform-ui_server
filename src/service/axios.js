// noinspection SpellCheckingInspection
import axios from 'axios';

// const API_URL = 'https://php-mock-api.herokuapp.com/'; // process.env.API_URL || 'http://localhost:3000';

const API_URL = 'http://localhost:8030';

let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

if (localStorage.accessToken && new Date().getTime() < localStorage.expirationDate) {
    headers = {
        ...headers,
        'Authorization': `Bearer ${localStorage.accessToken}`,
    };
}

export default axios.create({
    baseURL: API_URL,
    headers
})