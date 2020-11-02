<template>
  <v-app-bar
    app
    dense
    color="dark"
    dark
  >
  <v-toolbar-title>
    <router-link to="/">
      <h2 class="logo">Notes App</h2>
    </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-list-item v-if="isLoggedIn">
        <span>
          {{ currentUser }}
        </span>
      </v-list-item>
      <v-list-item v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link>
      </v-list-item>
      <v-list-item v-if="!isLoggedIn">
        <router-link to="/register">Register</router-link>
      </v-list-item>
      <v-menu
        offset-y
        :close-on-click="closeOnClick"
      >
      <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            v-bind="attrs"
            v-on="on"
            v-if="isLoggedIn"
          >
            Notes
          <v-icon right>mdi-arrow-down-thick</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <router-link to="/pending">Show Pending Notes</router-link>
          </v-list-item>
          <v-list-item>
              <router-link to="/completed">Show Completed Notes</router-link>
          </v-list-item>
        </v-list>
      </v-menu>
    <v-btn v-if="isLoggedIn" v-on:click="logout">
      Logout
    </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import firebase from 'firebase';

  export default {
    name: 'Appbar',
    data: function() {
    return {
      isLoggedIn: false,
      currentUser: false,
    }
  },
  created: function() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.go({ path: '/login' })
      })
    },
  },
  }

</script>

<style scoped>
  .logo {
    font-weight: bold;
    color: white;
  }

  .logo {
    color: white;
  }

  .logo:hover {
    opacity: 0.8;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    opacity: 0.8;
  }

</style>