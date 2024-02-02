import axios from '@/lib/axiosConfig.js'
export default{

    async fetchPublishedCourses({ commit }) {
        try {
          const response = await axios.get('/no-auth/courses');
          console.log(response);
          commit('setPublishedCourses', response.data.data);
          // Vous pouvez également effectuer d'autres traitements ici si nécessaire
        } catch (error) {
          console.error(error);
          // Gestion des erreurs
        }
      },

      async fetchCategories({ commit }) {
        try {
          const response = await axios.get('/no-auth/categories');
          console.log(response);
          commit('setCategories', response.data.data);
          // Vous pouvez également effectuer d'autres traitements ici si nécessaire
        } catch (error) {
          console.error(error);
          // Gestion des erreurs
        }
      },

      async fetchServices({ commit }) {
        try {
          const response = await axios.get('/no-auth/services');
          console.log(response);
          commit('setServices', response.data.data);
          // Vous pouvez également effectuer d'autres traitements ici si nécessaire
        } catch (error) {
          console.error(error);
          // Gestion des erreurs
        }
      },

      async fetchProjects({ commit }) {
        try {
          const response = await axios.get('/no-auth/projects');
          console.log(response);
          commit('setProjects', response.data.data);
          // Vous pouvez également effectuer d'autres traitements ici si nécessaire
        } catch (error) {
          console.error(error);
          // Gestion des erreurs
        }
      },
      async fetchTestimonials({ commit }) {
        try {
          const response = await axios.get('/no-auth/testimonials');
          console.log(response);

          commit('setTestimonials', response.data.data);
          // Vous pouvez également effectuer d'autres traitements ici si nécessaire
        } catch (error) {
          console.error(error);
          // Gestion des erreurs
        }
      },

      async fetchTeams({ commit }) {
        try {
          const response = await axios.get('/teams/experts');
          console.log(response);
          commit('setTeams', response.data.data);
          // Vous pouvez également effectuer d'autres traitements ici si nécessaire
        } catch (error) {
          console.error(error);
          // Gestion des erreurs
        }
      },
      async fetchActualites({ commit }) {
        try {
          const response = await axios.get('/actualites');
          console.log(response);
          commit('setActualites', response.data.data.data);
          // Vous pouvez également effectuer d'autres traitements ici si nécessaire
        } catch (error) {
          console.error(error);
          // Gestion des erreurs
        }
      },

}