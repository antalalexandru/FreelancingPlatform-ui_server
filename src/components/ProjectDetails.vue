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
                        Posted on {{ new Date(projectDetails.submitted) | dateFormat('DD MMMM YYYY') }}, registrations open until {{ new Date(projectDetails.endDate) | dateFormat('DD MMMM YYYY') }}
                    </p>
                    <div v-if="isLoggedIn && loggedInUserInfo.roles === 'ROLE_ADMIN'">
                        <b-button variant="danger" v-on:click="handleDeleteProject">Delete this project</b-button>
                    </div>

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

                    <h3>Applications</h3>

                    <div v-if="!isLoggedIn">
                        <b-alert show="true" variant="dark">You must authenticate in order to post a bid on this project!</b-alert>
                    </div>
                    <div v-else>
                        <div v-if="this.ableToApply">
                            <div v-if="successfulApplication">
                                <b-alert show="true" variant="success">Application sent successfully!</b-alert>
                            </div>
                            <div v-else>
                                <div class="card my-4">
                                <b-alert show="true"  v-if="applicationError" variant="danger">Error processing application!</b-alert>
                                <h5 class="card-header">Place a Bid on this Project</h5>
                                <div class="card-body">
                                    <b-form @submit.prevent="handleProjectApplication">
                                        <div class="form-group">
                                            <textarea v-model="applicationDescription" placeholder="What makes you the best candidate for this project?" class="form-control" rows="3"></textarea>
                                        </div>
                                        <button type="submit" class="btn btn-primary">Submit offer</button>
                                    </b-form>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <b-alert show="true" variant="danger">{{notAbleToApplyReason}}</b-alert>

                        </div>
                    </div>

            <b-pagination-nav
                    :link-gen="linkGen"
                    :number-of-pages="totalPages"
                    v-on:input="loadApplications"
                    use-router
                    style="margin-bottom: 40px;"
            />

            <div class="media mb-4" v-for="application in applications" :key="application.id" style="margin-top: -20px;">
                <img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">
                <div class="media-body">
                    <h5 class="mt-0">{{application.user.username}}, <span style="font-size: 13px; color: #444;">submitted on {{new Date(application.date) | dateFormat('DD MMM YYYY')}}</span> <span class="badge badge-light" style="cursor: pointer" v-on:click="handleSelectApplication(application.id)" v-if="projectDetails.selectedApplication == null && projectDetails.author.id == loggedInUserInfo.id && new Date(projectDetails.endDate) < new Date()">Selected this application</span> <span class="badge badge-success" v-if="projectDetails.selectedApplication != null && projectDetails.selectedApplication.id === application.id">Selected application</span></h5>
                    <div v-html="application.description"></div>
                    <hr>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    import {
        getProject,
        checkIfApplicationAllowed,
        applyToProject,
        getProjectApplications,
        selectApplication,
        deleteProject
    } from "@/service/api";

    import {
        isLoggedIn,
        getLoggedInUserInfo
    } from "@/service/utils";

    import {
        // eslint-disable-next-line no-unused-vars
        asString
    } from 'date-format';

    export default {
        name: "ProjectDetails",

        data() {
            return {
                projectDetails: null,
                applicationDescription: '',

                spinner: true,

                ableToApply: true,
                notAbleToApplyReason: '',

                applicationError: false,
                successfulApplication: false,

                applications: [],
                totalPages: 1,
                currentPage: 1,
                itemsPerPage: 20,

                isLoggedIn: isLoggedIn(),
                loggedInUserInfo: getLoggedInUserInfo(),
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

                checkIfApplicationAllowed(this.$route.params.project_id, (res, err) => {
                    if (err != null) {
                        this.ableToApply = false;
                        this.notAbleToApplyReason = err.response.data.message;
                    } else {
                        this.ableToApply = true;
                        this.notAbleToApplyReason = '';
                    }
                });
            },

            linkGen(pageNum) {
                return pageNum === 1 ? '?' : `?page=${pageNum}`
            },

            loadApplications() {
                this.applications = [];
                this.currentPage = (typeof this.$route.query.page === 'undefined') ? 1 : parseInt(this.$route.query.page);

                getProjectApplications(this.$route.params.project_id, this.currentPage, (res, err) => {
                    if (err == null) {
                        this.totalPages = Math.max(1, 1 + Math.floor(res.data.total / this.itemsPerPage));
                        this.applications = res.data.members;
                    }
                });
            },

            handleProjectApplication() {
                this.applicationError = false;
                this.successfulApplication = false;

                applyToProject(this.$route.params.project_id, {
                    description: this.applicationDescription
                }, (_, err) => {
                    if (err == null) {
                        this.successfulApplication = true;
                        this.loadApplications();
                    } else {
                        this.applicationError = true;
                    }
                });
            },

            handleSelectApplication(applicationId) {
                selectApplication(this.$route.params.project_id, applicationId, (res, err) => {
                    if (err == null) {
                        this.projectDetails.selectedApplication = res.data.selectedApplication;
                        this.loadApplications();
                    }
                });
            },

            handleDeleteProject() {
                deleteProject(this.$route.params.project_id, (_, err) => {
                    if (err == null) {
                        this.$router.push('/projects');
                    }
                });
            }
        },

        created() {
            this.loadProject();
            this.loadApplications();
        }
    }
</script>

<style scoped>

</style>