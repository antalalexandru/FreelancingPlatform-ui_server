<template>

    <b-row style="margin-top: 20px">
        <b-col md="3">
            <b-button v-if="isLoggedIn" style="width: 100%; margin-bottom: 10px;" to="/add_project">
                Add new project
            </b-button>

            <hr>

            <h4>Filter projects</h4>

            <hr>

            <h5>Payment (USD)</h5>

            <b-row class="my-1" align-v="center">
                <b-col sm="2">
                    <label >From</label>
                </b-col>
                <b-col sm="10">
                    <b-form-input v-model="filters.paymentLowerBound" @change="onChangeFilters" id="min_price" type="number" min="0" step="0.01"></b-form-input>
                </b-col>
            </b-row>

            <b-row class="my-1" align-v="center">
                <b-col sm="2">
                    <label>To</label>
                </b-col>
                <b-col sm="10">
                    <b-form-input v-model="filters.paymentUpperBound" @change="onChangeFilters" id="max_price" type="number" min="0" step="0.01"></b-form-input>
                </b-col>
            </b-row>

            <hr>

            <h5>Tags</h5>

            <b-badge
                     v-for="tag in filters.tags"
                     v-bind:key="tag.name"
                     style="margin-right: 5px; cursor: pointer"
                     v-bind:variant="tag.selected ? 'success' : 'secondary'"
                     v-on:click="handleTagClick(tag)"
            >
                {{tag.name}}
            </b-badge>

            <hr>

            <b-form-checkbox
                    id="checkbox-2"
                    name="checkbox-2"
                    v-model="onlyMyProjects"
                    v-on:input="onChangeFilters"
                    v-if="isLoggedIn"
            >
                Show only my projects
            </b-form-checkbox>


        </b-col>
        <b-col md="9">

            <b-row>
                <b-col md="6">
                    <b-pagination-nav
                            :link-gen="linkGen"
                            :number-of-pages="totalPages"
                            v-on:input="loadProjects"
                            use-router
                    />
                </b-col>
                <b-col md="6" style="text-align: right">
                    <b-dropdown right variant="light" v-bind:text="sortText">
                        <b-dropdown-item v-on:click="onChangeSort('submitted:desc', 'Latest')"><font-awesome-icon icon="check" v-if="sort === 'submitted:desc'" /> Latest</b-dropdown-item>
                        <b-dropdown-item v-on:click="onChangeSort('submitted:asc', 'Oldest')"><font-awesome-icon icon="check" v-if="sort === 'submitted:asc'" /> Oldest</b-dropdown-item>
                    </b-dropdown>
                </b-col>
            </b-row>

            <div>
            </div>

            <div v-if="spinner" style="text-align: center">
                <b-spinner style="width: 3rem; height: 3rem; margin: 50px;" label="Large Spinner" variant="secondary"></b-spinner>
            </div>
            <div v-else>
                <div v-for="project in projects" :key="project.id">
                    <b-card footer-tag="footer" style="margin-bottom: 15px;">

                        <b-row>
                            <b-col md="9">
                                <router-link :to="{ name: 'view_project', params: { project_id: project.id } }">
                                    <h4 style="color: #444">{{project.name}}</h4>
                                </router-link>
                            </b-col>
                            <b-col md="3" style="text-align: right">
                                <div v-if="project.paymentUpperBound === 0">
                                    <h5>+${{project.paymentLowerBound}}</h5>
                                </div>
                                <div v-else>
                                    <h5>${{project.paymentLowerBound}} - ${{project.paymentUpperBound}}</h5>
                                </div>
                            </b-col>

                        </b-row>

                        <b-card-text>
                            {{project.description.slice(0, 300) | striphtml}}...
                            <div v-if="project.tags.length" style="margin-top: 10px;">
                                <b-badge variant="secondary"
                                         v-for="tag in project.tags"
                                         v-bind:key="tag.name"
                                         style="margin-right: 5px;"
                                >
                                    {{tag.name}}
                                </b-badge>
                            </div>
                        </b-card-text>

                        <template v-slot:footer>
                            <div class="d-flex justify-content-between">
                                <div>
                                    Applications until: {{formatDateTime(project.endDate)}}
                                </div>
                                <div>
                                    Posted on {{formatDateTime(project.submitted)}}, {{project.enrolled}} applicants
                                </div>
                            </div>
                        </template>
                    </b-card>
                </div>
            </div>
        </b-col>
    </b-row>
</template>

<script>
    import { getProjects, getTagsRequest } from "@/service/api";

    import {
        formatDateTime
    } from "@/service/utils";

    export default {
        name: "Projects",
        data() {
            return {
                projects: [],
                totalPages: 1,
                currentPage: 1,

                spinner: true,

                filters: {
                    paymentLowerBound: 0,
                    paymentUpperBound: 0,
                    tags: []
                },

                filterQuery: '',
                sort: 'submitted:desc',
                sortText: 'Sort by: Latest',

                itemsPerPage: 20,

                excludedProjects: true,
                onlyMyProjects: false,

                isLoggedIn: typeof localStorage.username !== "undefined",
            }
        },

        methods: {
            // eslint-disable-next-line vue/no-dupe-keys
            showSpinner() {
                this.spinner = true;
            },

            hideSpinner() {
                this.spinner = false
            },

            loadProjects() {
                this.showSpinner();
                this.currentPage = (typeof this.$route.query.page === 'undefined') ? 1 : parseInt(this.$route.query.page);
                getProjects(this.currentPage, this.filterQuery, '&sort=' + this.sort, (res, err) => {
                    this.hideSpinner();
                    if (err == null) {
                        this.totalPages = Math.max(1, 1 + Math.floor(res.data.total / this.itemsPerPage));
                        this.projects = res.data.members;
                    }
                });
            },

            linkGen(pageNum) {
                return pageNum === 1 ? '?' : `?page=${pageNum}`
            },

            onChangeSort(sortValue, text) {
                // eslint-disable-next-line no-console
                console.log(sortValue);
                this.sort = sortValue;
                this.sortText = `Sort by: ${text}`;
                this.loadProjects();
            },

            onChangeFilters() {
                // eslint-disable-next-line no-console
                console.log(this.filters);

                const filtersList = [];

                if (parseInt(this.filters.paymentLowerBound) !== 0) {
                    filtersList.push(`paymentLowerBound>${this.filters.paymentLowerBound}`)
                }

                if (parseInt(this.filters.paymentUpperBound) !== 0) {
                    filtersList.push(`paymentUpperBound<${this.filters.paymentUpperBound}`)
                }

                if (this.filters.tags.some(tag => tag.selected)) {
                    const tagsList = this.filters.tags
                        .filter(tag => tag.selected)
                        .map(tag => tag.name.replace('#', '%23'))
                        .join(',');
                    filtersList.push(`tags:${tagsList}`)
                }

                if (this.onlyMyProjects) {
                    filtersList.push(`authorName:${localStorage.username}`);
                }

                if (filtersList.length > 0) {
                    this.filterQuery = '&query=' + filtersList.join(';');
                } else {
                    this.filterQuery = '';
                }

                this.totalPages = 1;
                this.$route.query.page = 1;
                this.currentPage = 1;

                this.loadProjects();
            },

            handleTagClick(tag) {
                tag.selected = !tag.selected;
                this.onChangeFilters();
            },

            stripTags(text) {
                return text.replace(/<\/?[^>]+(>|$)/g, "");
            },

            formatDateTime: formatDateTime
        },

        mounted() {
            getTagsRequest((res, err) => {
                if (err == null) {
                    const filters = res.data;
                    this.filters.tags = filters.map(filter => {
                        return {
                            ...filter,
                            selected: false
                        }
                    });
                    // eslint-disable-next-line no-console
                    console.log(this.filters.tags);
                }
            })
        }
    }
</script>

<style scoped>

</style>