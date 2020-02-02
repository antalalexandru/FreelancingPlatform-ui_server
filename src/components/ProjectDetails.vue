<template>
    <div>
        <div v-if="spinner" style="text-align: center">
            <b-spinner style="width: 3rem; height: 3rem; margin: 50px;" label="Large Spinner" variant="secondary"></b-spinner>
        </div>
        <div v-else>
                    <h1 style="margin: 10px 0;">{{projectDetails.name}}</h1>
                    <!-- Author -->
                    <p class="lead">
                        project submitted by
                        <!-- TODO remove link, replace with user details component -->
                        <a href="#">{{ projectDetails.author.username }}</a>
                    </p>

                    <hr>

                    <!-- Date/Time https://www.npmjs.com/package/vue-filter-date-format -->
                    <p>
                        Posted on {{ new Date(projectDetails.submitted) | dateFormat('DD MMMM YYYY') }}, registrations open until {{ new Date(projectDetails.endDate) | dateFormat('DD MMMM YYYY') }}</p>
                    <hr>

                    <div v-html="projectDetails.description"></div>

                    <hr>
                    <div v-if="projectDetails.tags.length" style="margin-top: 10px;">
                        <b-badge variant="secondary"
                                 v-for="tag in projectDetails.tags"
                                 v-bind:key="tag.name"
                                 style="margin-right: 5px;"
                        >
                            {{tag.name}}
                        </b-badge>
                    </div>

                    <hr>

                    <div class="card my-4">
                        <h5 class="card-header">Place a Bid on this Project</h5>
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <textarea placeholder="What makes you the best candidate for this project?" class="form-control" rows="3"></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit offer</button>
                            </form>
                        </div>
                    </div>

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