import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Loyout from '../views/Loyout.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Accueil.vue'

import ActualitesListe from '../views/Actualites/liste.vue'
import ActualitesAdd from '../views/Actualites/add.vue'
import ActualitesUpdate from '../views/Actualites/update.vue'
import ActualitesView from '../views/Actualites/view.vue'

import ServicesListe from '../views/Services/liste.vue'
import ServicesAdd from '../views/Services/add.vue'
import ServicesUpdate from '../views/Services/update.vue'
import ServicesView from '../views/Services/view.vue'

import FormationsListe from '../views/Formations/liste.vue'
import FormationsAdd from '../views/Formations/add.vue'
import FormationsUpdate from '../views/Formations/update.vue'
import FormationsView from '../views/Formations/view.vue'

import CathegoriesListe from '../views/Cathegories/liste.vue'

import Types_payementListe from '../views/TYPES_PAYEMENTS/liste.vue'

import ProjetsListe from '../views/Projets/liste.vue'
import ProjetsAdd from '../views/Projets/add.vue'
import ProjetsUpdate from '../views/Projets/update.vue'
import ProjetsView from '../views/Projets/view.vue'

import UsersListe from '../views/Users/liste.vue'


import Test from '../views/test.vue'





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: Loyout,
      children:[
        { path: '/', name: 'connexion', component: Login},
        {path: '/admin', name: 'accueil',component: Dashboard },

        { path: '/actualites', name: 'actualites', component: ActualitesListe,  meta: { requiresAuth: true }},
        { path: '/actualites/ajouter', name: 'actualites-add', component: ActualitesAdd,  meta: { requiresAuth: true }},
        { path: '/actualites/update/:id', name: 'actualites-update', component: ActualitesUpdate , props:true,  meta: { requiresAuth: true }},
        { path: '/actualites/detail/:id', name: 'actualites-detail', component: ActualitesView , props:true,  meta: { requiresAuth: true }},

        { path: '/services', name: 'services', component: ServicesListe,  meta: { requiresAuth: true }},
        { path: '/services/ajouter', name: 'services-add', component: ServicesAdd,  meta: { requiresAuth: true }},
        { path: '/services/update/:id', name: 'services-update', component: ServicesUpdate , props:true,  meta: { requiresAuth: true }},
        { path: '/services/detail/:id', name: 'services-detail', component: ServicesView , props:true,  meta: { requiresAuth: true }},

        { path: '/formations', name: 'formations', component: FormationsListe,  meta: { requiresAuth: true }},
        { path: '/formations/ajouter', name: 'formations-add', component:FormationsAdd,  meta: { requiresAuth: true }},
        { path: '/formations/update/:id', name: 'formations-update', component: FormationsUpdate , props:true,  meta: { requiresAuth: true }},
        { path: '/formations/detail/:id', name: 'formations-detail', component: FormationsView , props:true,  meta: { requiresAuth: true }},

        { path: '/cathegories', name: 'cathegories', component: CathegoriesListe,  meta: { requiresAuth: true }},

        { path: '/type-payement', name: 'type-payement', component: Types_payementListe,  meta: { requiresAuth: true }},

        { path: '/projets', name: 'projets', component: ProjetsListe,  meta: { requiresAuth: true }},
        { path: '/projets/ajouter', name: 'projets-add', component:ProjetsAdd,  meta: { requiresAuth: true }},
        { path: '/projets/update/:id', name: 'projets-update', component: ProjetsUpdate , props:true,  meta: { requiresAuth: true }},
        { path: '/projets/detail/:id', name: 'projets-detail', component: ProjetsView , props:true,  meta: { requiresAuth: true }},

        { path: '/utilisateurs', name: 'utilisateurs', component: UsersListe,  meta: { requiresAuth: true }},


        { path: '/test', name: 'test', component: Test},


       

        
       

      ]
    },
   
   
  ]
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const isLoggedIn = store.getters['user/isLoggedIn'];
console.log('isLoggedIn',isLoggedIn);
  if (requiresAuth && !isLoggedIn) {
    // Si la route nécessite une authentification et l'utilisateur n'est pas connecté,
    // redirigez-le vers la page de connexion
    next('/');
  } else if (( to.name === 'connexion') && isLoggedIn) {
    // Si l'utilisateur est connecté et essaie d'accéder aux pages d'inscription ou de connexion,
    // redirigez-le vers la page mon_espace
    next('/admin');
  }
  else {
    next();
  }
});

export default router
