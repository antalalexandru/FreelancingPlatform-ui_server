<template>
    <div>
        <b-jumbotron style="margin: 20px 0">
            <template v-slot:header>Best Freelancing Site Ever</template>

            <template v-slot:lead>
                I have no idea what I'm doing here.
            </template>

            <hr class="my-4">

            <p>
                It uses utility classes for typography and spacing to space content out within the larger
                container.
            </p>

            <b-button variant="primary" href="#">Do Something</b-button>&nbsp;
            <b-button variant="success" href="#">Do Something Else</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
    export default {
        name: "BoardIndex",

        data: () => {
            return {
                isLoggedIn: localStorage.username && JSON.parse(localStorage.username) != null,
            }
        },
    }
</script>

<style scoped>

</style>