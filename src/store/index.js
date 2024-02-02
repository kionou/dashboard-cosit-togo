import { createStore } from 'vuex'

import state from './state'
import getters from './getters'
import  mutations from './mutations.js'
import  actions from './actions.js'
import panier from './panier'
import verification from './verification'
import user from './user'



const store = createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    panier,
    verification,
    user
  },
})

export default store;