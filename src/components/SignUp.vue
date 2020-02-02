<template>
    <div>
        <b-form @submit.prevent="handleSignup" style="max-width: 500px; margin: 20px auto">
            <!-- No idea why it is not shown without "show" attribute -->
            <b-alert show="true" variant="danger" v-if="registerError !== ''">
                Error: {{registerError}}
            </b-alert>

            <b-alert show="true" variant="success" v-if="registerSuccess">
                Successful sign up! Check your email for account activation details
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
                    id="input-group-3"
                    label="Email:"
                    label-for="input-2"
            >
                <b-form-input
                        id="input-3"
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


            <b-button type="submit" variant="secondary">Register</b-button>
        </b-form>
    </div>
</template>

<script>
    import { signup } from "@/service/api";

    export default {
        name: "SignUp",

        data: () => {
            return {
                username: '',
                password: '',
                email: '',

                registerSuccess: false,
                registerError: '',
            }
        },

        methods: {
            handleSignup() {
                this.registerError = '';
                this.registerSuccess = false;
                signup({
                    username: this.username,
                    password: this.password,
                    email: this.email
                }, (res, err) => {
                    if (err == null) {
                        this.username = '';
                        this.password = '';
                        this.email = '';
                        this.registerSuccess = true;
                    } else {
                        this.registerError = 'Generic error :/'; // TODO
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>