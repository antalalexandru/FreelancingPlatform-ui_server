<template>
    <div>
        <b-form @submit.prevent="login" style="max-width: 500px; margin: 20px auto">
            <!-- No idea why it is not shown without "show" attribute -->
            <b-alert show="true" variant="danger" v-if="wrongCredentials">
                Wrong Credentials
            </b-alert>

            <b-form-group
                    id="input-group-1"
                    label="Username:"
                    label-for="input-1"
            >
                <b-form-input
                        id="input-1"
                        v-model="username"
                        type="text"
                        required
                        placeholder="Enter username"
                ></b-form-input>
            </b-form-group>


            <b-form-group
                    id="input-group-2"
                    label="Password:"
                    label-for="input-2"
            >
                <b-form-input
                        id="input-2"
                        v-model="password"
                        type="password"
                        required
                        placeholder="Enter password"
                ></b-form-input>
            </b-form-group>


            <b-button type="submit" variant="secondary">Submit</b-button>
<br><br>
            If you forgot your password, click <router-link to="/forgot_password"> here</router-link>
        </b-form>

    </div>
</template>

<script>
    import {
        login
    } from "@/service/api";

    export default {
        name: "LogIn",
        data: () => {
            return {
                username: '',
                password: '',

                wrongCredentials: false,
            }
        },

        methods: {
            login () {
                this.wrongCredentials = false;
                login({
                    username: this.username,
                    password: this.password
                }, (res, err) => {
                    if (err == null) {
                        localStorage.accessToken = res.data['access_token'];
                        localStorage.refreshToken = res.data['refresh_token'];
                        localStorage.expirationDate = new Date().getTime() + 1000 * res.data['expires_in'];
                        localStorage.username = this.username;
                        localStorage.userId = res.data['user_id'];
                        localStorage.roles = res.data['roles'];

                        document.location.href = '/';
                    } else {
                        this.wrongCredentials = true;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>