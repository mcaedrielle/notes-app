import Vue from 'vue';
import firebase from 'firebase';
import Router from 'vue-router';
import Register from '../components/Register.vue';
import Login from '../components/Login';
import AddNotes from '../components/AddNotes';
import NotesMain from '../components/NotesMain';
import CompletedNotes from '../components/CompletedNotes';
import PendingNotes from '../components/PendingNotes';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Notes',
      component: NotesMain,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresGuest: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/add-notes',
      name: 'AddNotes',
      component: AddNotes,
      // meta: { requiresGuest: true }
    },
    {
      path: '/add-notes/:id',
      name: 'EditNotes',
      component: AddNotes,
      // meta: { requiresGuest: true }
    },
    {
      path: '/completed',
      name: 'CompletedNotes',
      component: CompletedNotes,
      // meta: { requiresGuest: true }
    },
    {
      path: '/pending',
      name: 'PendingNotes',
      component: PendingNotes,
      // meta: { requiresGuest: true }
    },
  ]
});

router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      console.log('one',!firebase.auth().currentUser)
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;