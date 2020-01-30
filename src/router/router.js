import Vue from 'vue'
import Router from 'vue-router'

import LogIn from "@/components/LogIn";
import SignUp from "@/components/SignUp";
import BoardIndex from "@/components/BoardIndex";
import AddProject from "@/components/AddProject";
import Projects from "@/components/Projects";
import ProjectDetails from "@/components/ProjectDetails";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: BoardIndex
        },
        {
            path: '/login',
            name: 'login',
            component: LogIn
        },
        {
            path: '/signup',
            name: 'sign_up',
            component: SignUp
        },
        {
            path: '/add_project',
            name: 'add_project',
            component: AddProject
        },
        {
            path: '/projects',
            name: 'projects',
            component: Projects
        },
        {
            path: '/view_project/:project_id',
            name: 'view_project',
            component: ProjectDetails
        },

    ]
})