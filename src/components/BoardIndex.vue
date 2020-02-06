<template>
    <div>

        <div class="card-columns" style="margin: 20px 0;">
            <div class="card">
                <div class="card-body" style="text-align: center">
                    <h3>{{totalUsers}}</h3>
                    <div>Total number of registered users</div>
                </div>
            </div>
            <div class="card">
                <div class="card-body" style="text-align: center">
                    <h3>{{totalProjects}}</h3>
                    <div>Total number of projects</div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 style="text-align: center; margin-bottom: 30px;">Most popular tags:</h5>
                    <div style="font-size: 15px;">
                        <div v-for="tag in tagsStatistics" :key="tag.name">
                            <div class="d-flex justify-content-between" style="margin: -10px 0;">
                                <div>
                                    <strong>{{tag.name}}</strong>
                                </div>
                                <div>
                                    {{tag.count}} projects
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>

    import {
        getUsersCount,
        getProjectsCount,
        getTagsStatistics,
    } from "@/service/api";

    export default {
        name: "BoardIndex",
        data: () => {
            return {
                totalUsers: 0,
                totalProjects: 0,
                tagsStatistics: []
            }
        },

        mounted() {
            getUsersCount((res, err) => {
                if (err == null) {
                    this.totalUsers = res.data;
                }
            });

            getProjectsCount((res, err) => {
                if (err == null) {
                    this.totalProjects = res.data;
                }
            });

            getTagsStatistics((res, err) => {
                if (err == null) {
                    this.tagsStatistics = res.data;
                }
            });
        }
    }
</script>

<style scoped>

</style>