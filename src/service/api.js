import axios from "@/service/axios";

/* eslint-disable no-console */

export function login(data, handler) {
    axios.post('/oauth/login', data)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function addProject(data, handler) {
    axios.post('/project', data)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function getProjects(page, query, handler) {
    axios.get('/project?page=' + page + query)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function getProject(id, handler) {
    axios.get('/project/' + id)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}