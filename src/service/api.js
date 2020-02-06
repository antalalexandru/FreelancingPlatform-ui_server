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

export function resetAccountRequest(data, handler) {
    axios.post('/user/reset', data)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function addProject(data, handler) {
    axios.post('/project', data)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function getProjects(page, query, sort, handler) {
    axios.get('/project?page=' + page + query + sort)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function getProject(id, handler) {
    axios.get('/project/' + id)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function forgotPassword(id, handler) {
    axios.get('/user/forgotPassword?keyword=' + id)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function getTagsRequest(handler) {
    axios.get('/tag')
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function checkIfApplicationAllowed(project_id, handler) {
    axios.get(`/project/${project_id}/can_post_application`)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function applyToProject(project_id, data, handler) {
    axios.post(`/project/${project_id}/application`, data)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function getProjectApplications(project_id, page, handler) {
    axios.get(`/project/${project_id}/application?page=${page}`)
        .then(response => handler(response))
        .catch(err => handler(null, err));
}

export function getUsersCount(handler) {
    axios.get(`/statistics/users`)
    .then(response => handler(response))
    .catch(err => handler(null, err));
}

export function getProjectsCount(handler) {
    axios.get(`/statistics/projects`)
    .then(response => handler(response))
    .catch(err => handler(null, err));
}

export function getTagsStatistics(handler) {
    axios.get(`/statistics/tags`)
    .then(response => handler(response))
    .catch(err => handler(null, err));
}

export function selectApplication(project_id, application_id, handler) {
    axios.post(`/project/${project_id}/select_application/${application_id}`)
    .then(response => handler(response))
    .catch(err => handler(null, err));
}

export function deleteProject(project_id, handler) {
    axios.delete(`/project/${project_id}`)
    .then(response => handler(response))
    .catch(err => handler(null, err));
}