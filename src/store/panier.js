
// // panier.js
// export default {
//   namespaced: true,
//   state: {
//     items: [],
//   },
//   mutations: {
//     addToCart(state, payload) {
//       state.items.push(payload);
//     },
//     // Add other mutations like removeItem, clearCart, etc. if needed
//   },
//   actions: {
//     addToCart({ commit }, payload) {
//       commit('addToCart', payload);
//     },
//     // Add other actions as needed
//   },
//   getters: {
//     cartItems(state) {
//       return state.items;
//     },
//     // Add other getters as needed
//   },
// };


// panier.js
export default {
  namespaced: true,
  state: {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    alertMessage:'',
  },
  mutations: {
    addToCart(state, payload) {
      // Vérifier si le produit existe déjà dans le panier
      const existingItem = state.items.find(item => item.id === payload.id);

      if (existingItem) {
        // existingItem.quantity += payload.quantity || 1;
        console.log('eee');
        state.alertMessage = 'Cette formation est déjà dans le panier.';
      } else {
        state.items.push(payload);
        // state.alertMessage = null;
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart(state, index) {
      state.items.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    // Add other mutations like removeItem, clearCart, etc. if needed
  },
  actions: {
    addToCart({ commit }, payload) {
      commit('addToCart', payload);
    },
    removeFromCart({ commit }, index) {
      commit('removeFromCart', index);
    },
    // Add other actions as needed
  },
  getters: {
    cartItems(state) {
      return state.items;
    },
    // Add other getters as needed
  },
};


  