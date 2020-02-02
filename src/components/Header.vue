<!--suppress SpellCheckingInspection -->
<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-container style="padding-top: 0; padding-bottom: 0">
            <b-navbar-brand to="/">FreeLancing</b-navbar-brand>

            <b-navbar-nav>
                <b-nav-item to="/projects">Projects</b-nav-item>
            </b-navbar-nav>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">

                    <b-nav-item to="/login" v-if="!isLoggedIn"><font-awesome-icon icon="sign-in-alt" /> Log In</b-nav-item>
                    <b-nav-item to="/signup" v-if="!isLoggedIn"><font-awesome-icon icon="user-plus" /> Sign Up</b-nav-item>


                    <b-nav-item-dropdown right v-if="isLoggedIn">
                        <template v-slot:button-content>
                            {{loggedInUsername}}
                        </template>
                        <b-dropdown-item @click="logOut">Log Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
    export default {
        name: "Header",

        data: () => ({
            isLoggedIn: typeof localStorage.username !== "undefined",
            loggedInUsername: localStorage.username,
        }),

        methods: {
            logOut: () => {
                delete localStorage.accessToken;
                delete localStorage.refreshToken;
                delete localStorage.expirationDate;
                delete localStorage.username;
                document.location.href = '/';
            }
        }
    }
</script>u

<style>
</style>