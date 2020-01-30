<template>
    <div>
        <Header/>
        <b-container>
          <router-view></router-view>
        </b-container>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    export default {
        name: 'App',
        components: { Header },
    };
</script>