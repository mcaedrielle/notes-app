<template>
  <div id="app">
    <v-app>
        <v-main>
          <Appbar />
          <ContentTop />
          <router-view />
        </v-main>
    </v-app>
  </div>
</template>

<script>
import ContentTop from "./components/ContentTop";
import Appbar from "./components/Appbar";

export default {
  name: 'App',
  components: {
    Appbar,
    ContentTop,
  },
};
</script>

<style scoped>
  #header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #521751;
    padding: 0 20px;
  }


  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #804fad;
  }
</style>
