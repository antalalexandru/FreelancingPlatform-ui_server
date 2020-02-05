<template>
    <div>
        <b-form @submit.prevent="forgotPassword" style="max-width: 500px; margin: 20px auto">
            <b-alert show="true" variant="danger" v-if="actionError">
                Error !
            </b-alert>

            <b-alert show="true" variant="success" v-if="actionSuccess">
                An email was sent to your email address with information regarding resetting your account. Please check
                your inbox
            </b-alert>

            <b-form-group
                    id="input-group-1"
                    label="Username or Email:"
                    label-for="input-1"
            >
                <b-form-input
                        id="input-1"
                        v-model="keyword"
                        type="text"
                        required
                        placeholder="Enter username / email "
                ></b-form-input>
            </b-form-group>


            <b-button type="submit" variant="secondary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>

    import {
        forgotPassword
    } from "@/service/api";

    export default {
        name: "ForgotPassword",

        data: function () {
            return {
                actionError: false,
                actionSuccess: false,
                keyword: ''
            }
        },

        methods: {
            forgotPassword() {
                const {
                    keyword
                } = this;

                this.actionError = false;
                this.actionSuccess = false;

                forgotPassword(keyword, (res, err) => {
                    if (err == null) {
                        this.actionSuccess = true
                    } else {
                        this.actionError = true;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>