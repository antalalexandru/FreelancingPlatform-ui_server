<template>

    <b-row style="margin-top: 20px">
        <b-col md="3">
            <!-- TODO hide button if not logged in -->
            <b-button style="width: 100%; margin-bottom: 10px;" to="/add_project">
                Add new project
            </b-button>

            <hr>

            <h4>Filter projects</h4>

            <hr>

            <h5>Price</h5>

            <b-row class="my-1" align-v="center">
                <b-col sm="2">
                    <label for="input-small">From</label>
                </b-col>
                <b-col sm="10">
                    <b-form-input v-model="filters.minPrice" @change="onChangeFilters" id="min_price" type="number"  min="0" step="0.01"></b-form-input>
                </b-col>
            </b-row>

            <b-row class="my-1" align-v="center">
                <b-col sm="2">
                    <label for="input-small">To</label>
                </b-col>
                <b-col sm="10">
                    <b-form-input v-model="filters.maxPrice" @change="onChangeFilters" id="max_price" type="number" min="0" step="0.01"></b-form-input>
                </b-col>
            </b-row>

            <h5>Tags</h5>

            <b-badge
                     v-for="tag in filters.tags"
                     v-bind:key="tag.value"
                     style="margin-right: 5px; cursor: pointer"
                     v-bind:variant="tag.selected ? 'success' : 'secondary'"
                     v-on:click="handleTagClick(tag)"
            >
                {{tag.value}}
            </b-badge>

        </b-col>
        <b-col md="9">
            <b-pagination-nav
                    :link-gen="linkGen"
                    :number-of-pages="totalPages"
                    v-on:input="loadProjects"
                    use-router
            />
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
                                <div v-if="project.payment.upperBound === 0">
                                    <h5>+${{project.payment.lowerBound}}</h5>
                                </div>
                                <div v-else>
                                    <h5>${{project.payment.lowerBound}} - ${{project.payment.upperBound}}</h5>
                                </div>
                            </b-col>

                        </b-row>

                        <b-card-text>
                            {{project.description.slice(0, 200)}}...
                            <div v-if="project.tags.length" style="margin-top: 10px;">
                                <b-badge variant="secondary"
                                         v-for="tag in project.tags"
                                         v-bind:key="tag"
                                         style="margin-right: 5px;"
                                >
                                    {{tag}}
                                </b-badge>
                            </div>
                        </b-card-text>

                        <template v-slot:footer>
                            <div class="d-flex justify-content-between">
                                <div>
                                    Applications until: {{project.endDate}}
                                </div>
                                <div>
                                    Posted on {{formatTimeStamp(project.submittedTimestamp)}}, {{project.enrolled}} applicants
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
    import { getProjects, } from "@/service/api";

    export default {
        name: "Projects",
        data() {
            return {
                projects: [],
                totalPages: 1,
                currentPage: 1,

                spinner: true,

                filters: {
                    minPrice: 0,
                    maxPrice: 0,

                    tags: [
                        { value: 'PHP', selected: false },
                        { value: 'HTML', selected: false },
                        { value: 'MySQL', selected: false },
                        { value: 'C', selected: false },
                        { value: 'C++', selected: false },
                        { value: 'C#', selected: false },
                        { value: 'Java', selected: false },
                        { value: 'Python', selected: false },
                        { value: 'SEO', selected: false },
                        { value: 'Linux', selected: false },
                        { value: 'PostgreSQL', selected: false },
                        { value: 'React', selected: false },
                    ]

                },

                filterQuery: '',
            }
        },

        methods: {

            // TODO move this in util
            formatTimeStamp(timeStamp) {
                const date = new Date(timeStamp * 1000);
                const hours = date.getHours();
                const minutes = "0" + date.getMinutes();
                const formattedTime = hours + ':' + minutes.substr(-2);

                const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                const year = date.getFullYear();
                const month = months[date.getMonth()];
                const day = date.getDate();

                return `${year}-${month}-${day}, ${formattedTime}`
            },

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
                getProjects(this.currentPage, this.filterQuery, (res, err) => {
                    this.hideSpinner()
                    if (err == null) {
                        this.totalPages = res.data.totalPages;
                        this.projects = res.data.items;
                    }
                });
            },

            linkGen(pageNum) {
                return pageNum === 1 ? '?' : `?page=${pageNum}`
            },

            onChangeFilters() {
                // eslint-disable-next-line no-console
                console.log(this.filters);

                const filtersList = [];

                if (this.filters.minPrice !== 0) {
                    filtersList.push(`minPrice=${this.filters.minPrice}`)
                }

                if (this.filters.maxPrice !== 0) {
                    filtersList.push(`maxPrice=${this.filters.maxPrice}`)
                }

                if (this.filters.tags.some(tag => tag.selected)) {
                    const tagsList = this.filters.tags
                        .filter(tag => tag.selected)
                        .map(tag => tag.value.replace('#', '%23'))
                        .join(',');
                    filtersList.push(`tags=${tagsList}`)
                }

                if (filtersList.length > 0) {
                    this.filterQuery = '&' + filtersList.join('&');
                } else {
                    this.filterQuery = '';
                }

                this.totalPages = 1;
                this.currentPage = 1;

                this.loadProjects();
            },

            handleTagClick(tag) {
                tag.selected = !tag.selected;
                this.onChangeFilters();
            }
        },

        mounted() {
            this.loadProjects();
        }
    }
</script>

<style scoped>

</style>