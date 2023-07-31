<template>
    <the-header></the-header>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
import TheHeader from "@/layout/TheHeader.vue";
    export default {
        name: 'App',
        components: {
            TheHeader,
        },
    }
</script>
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body {
        background: #eeeee4;
    }

    #app {
      /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
      /*-webkit-font-smoothing: antialiased;*/
      /*-moz-osx-font-smoothing: grayscale;*/
      /*text-align: center;*/
    }

    .container {
        background: #eeeee4;
        margin: 0 50px;
    }
</style>
