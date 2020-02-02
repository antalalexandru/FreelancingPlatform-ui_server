import axios from "@/service/axios";

/* eslint-disable no-console */

export function login(data, handler) {
    axios.post('/user/login', data)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function signup(data, handler) {
    axios.post('/user', data)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function activateAccountRequest(data, handler) {
    axios.post('/user/activate', data)
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

export function getTagsRequest(handler) {
    axios.get('/tag')
        .then(response => handler(response))
        .catch(err => handler(null, err));
}