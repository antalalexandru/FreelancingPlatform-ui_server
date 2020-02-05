<template>
    <div>
        <b-form @submit.prevent="resetAccount" style="max-width: 500px; margin: 20px auto">
            <b-alert show="true" variant="danger" v-if="resetError">
                Error !
            </b-alert>

            <b-alert show="true" variant="success" v-if="resetSuccess">
                Account was reseted ! You may proceed to login.
            </b-alert>

            <b-form-group
                    id="input-group-1"
                    label="User id:"
                    label-for="input-1"
            >
                <b-form-input
                        id="input-1"
                        v-model="userId"
                        type="text"
                        required
                        placeholder="Enter id"
                />
            </b-form-group>


            <b-form-group
                    id="input-group-2"
                    label="Token:"
                    label-for="input-2"
            >
                <b-form-input
                        id="input-2"
                        v-model="token"
                        type="text"
                        required
                        placeholder="Enter token"
                />
            </b-form-group>

            <b-form-group
                    id="input-group-3"
                    label="Password:"
                    label-for="input-3"
            >
                <b-form-input
                        id="input-3"
                        v-model="password"
                        type="password"
                        required
                        placeholder="Enter new password:"
                />
            </b-form-group>


            <b-button type="submit" variant="secondary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>

    import {
        resetAccountRequest
    } from "@/service/api";

    export default {
        name: "AccountReset",

        data: function() {
            return {
                resetError: false,
                resetSuccess: false,
                userId: this.$route.query.userId || '',
                token: this.$route.query.token,
                password: ''
            }
        },

        methods: {
            resetAccount() {
                const {
                    userId,
                    token,
                    password
                } = this;

                this.resetError = false;
                this.resetSuccess = false;

                resetAccountRequest({
                    userId,
                    token,
                    password
                }, (_, err) => {
                    this.resetSuccess = (err == null);
                    this.resetError = !this.resetSuccess;
                });
            }
        }
    }
</script>

<style scoped>

</style>