<template>
    <div>
        <b-form @submit.prevent="activateAccount" style="max-width: 500px; margin: 20px auto">
            <b-alert show="true" variant="danger" v-if="activationError">
                Error !
            </b-alert>

            <b-alert show="true" variant="success" v-if="activationSuccess">
                Account activated ! You may proceed to login.
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
                ></b-form-input>
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
                ></b-form-input>
            </b-form-group>


            <b-button type="submit" variant="secondary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>

    import {
        activateAccountRequest
    } from "@/service/api";

    export default {
        name: "AccountActivation",

        data: function() {
            return {
                activationError: false,
                activationSuccess: false,
                userId: this.$route.query.userId || '',
                token: this.$route.query.token
            }
        },

        methods: {
            activateAccount() {
                const {
                    userId,
                    token
                } = this;

                this.activationError = false;
                this.activationSuccess = false;

                activateAccountRequest({
                    userId,
                    token
                }, (_, err) => {
                    this.activationSuccess = (err == null);
                    this.activationError = !this.activationSuccess;
                });
            }
        }
    }
</script>

<style scoped>

</style>