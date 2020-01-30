<template>
    <div>
        <div v-if="spinner" style="text-align: center">
            <b-spinner style="width: 3rem; height: 3rem; margin: 50px;" label="Large Spinner" variant="secondary"></b-spinner>
        </div>
        <div v-else>
            <b-row>
                <b-col md="8" sm="12">
                    <h1 style="margin: 10px 0;">{{projectDetails.name}}</h1>
                    <!-- Author -->
                    <p class="lead">
                        offer submitted by
                        <!-- TODO remove link, replace with user details component -->
                        <a href="#">{{ projectDetails.author.name }}</a>
                    </p>

                    <hr>

                    <!-- Date/Time https://www.npmjs.com/package/vue-filter-date-format -->
                    <p>
                        Posted on {{ new Date(projectDetails.submitted * 1000) | dateFormat('DD MMMM YYYY') }}, registrations open until {{ new Date(projectDetails.endDate * 1000) | dateFormat('DD MMMM YYYY') }}</p>
                    <hr>

                    <div v-html="projectDetails.description"></div>

                    <hr>
                    <div v-if="projectDetails.tags.length" style="margin-top: 10px;">
                        <b-badge variant="secondary"
                                 v-for="tag in projectDetails.tags"
                                 v-bind:key="tag"
                                 style="margin-right: 5px;"
                        >
                            {{tag}}
                        </b-badge>
                    </div>

                    <hr>

                    <!-- Single Comment -->
                    <div class="media mb-4">
                        <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
                        <div class="media-body">
                            <h5 class="mt-0">Commenter Name</h5>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                    </div>

                    <!-- Comment with nested comments -->
                    <div class="media mb-4">
                        <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
                        <div class="media-body">
                            <h5 class="mt-0">Commenter Name</h5>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.

                            <div class="media mt-4">
                                <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
                                <div class="media-body">
                                    <h5 class="mt-0">Commenter Name</h5>
                                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                </div>
                            </div>

                            <div class="media mt-4">
                                <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
                                <div class="media-body">
                                    <h5 class="mt-0">Commenter Name</h5>
                                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                </div>
                            </div>

                        </div>
                    </div>

                </b-col>
                <b-col md="4" sm="12">
                    <!-- Search Widget -->
                    <div class="card my-4">
                        <h5 class="card-header">Search</h5>
                        <div class="card-body">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search for...">
                                <span class="input-group-btn">
                <button class="btn btn-secondary" type="button">Go!</button>
              </span>
                            </div>
                        </div>
                    </div>

                    <!-- Categories Widget -->
                    <div class="card my-4">
                        <h5 class="card-header">Categories</h5>
                        <div class="card-body">
                            <div class="row">
                                121
                            </div>
                        </div>
                    </div>

                    <!-- Side Widget -->
                    <div class="card my-4">
                        <h5 class="card-header">Side Widget</h5>
                        <div class="card-body">
                            You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
                        </div>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>

    import {
        getProject
    } from "@/service/api";

    import {
        // eslint-disable-next-line no-unused-vars
        asString
    } from 'date-format';

    export default {
        name: "ProjectDetails",

        data() {
            return {
                projectDetails: null,

                spinner: true
            }
        },

        methods: {
            showSpinner() {
                this.spinner = true;
            },

            hideSpinner() {
                this.spinner = false
            },

            loadProject() {
                this.showSpinner();
                getProject(this.$route.params.project_id, (res, err) => {
                    this.hideSpinner();
                    if (err == null) {
                        this.projectDetails = res.data;
                    }
                });
            }
        },

        created() {
            this.loadProject()
        }
    }
</script>

<style scoped>

</style>