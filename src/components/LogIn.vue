<template>
    <div>
        <b-form @submit.prevent="login" style="max-width: 500px; margin: 20px auto">
            <!-- No idea why it is not shown without "show" attribute -->
            <b-alert show="true" variant="danger" v-if="wrongCredentials">
                Wrong Credentials
            </b-alert>

            <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
            >
                <b-form-input
                        id="input-1"
                        v-model="email"
                        type="email"
                        required
                        placeholder="Enter email"
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
                email: '',
                password: '',

                wrongCredentials: false,
            }
        },

        methods: {
            login () {
                this.wrongCredentials = false;
                login({
                    email: this.email,
                    password: this.password
                }, (res, err) => {
                    if (err == null) {
                        localStorage.user = JSON.stringify(res.data);
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