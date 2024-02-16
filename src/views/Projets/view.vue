<template >
    <Loading v-if="loading" style="z-index: 999999;"></Loading>
   <div>
       

         <!-- Start of blog page section
       ============================================= -->
       <section id="news-feed" class="news-feed-section">
           <div class="container">
               <div class="blog-feed-content">
                   <div class="row">
                    <div class="col-md-5">
                           <div class="saasio-blog-sidebar" style="margin-top: 90px;">
                               
                            <div  class="article-p">
                                    <div  class="image">
                                        <img  class="img-fluid" alt=" actualite" :src="selectedActualites.Images">
                                    </div>
                                </div>
                               
                               
                           </div>
                       </div>
                       <div class="col-md-7">
                           <div class="saasio-blog-details-content">
                               
                               <div class="blog-details-text dia-headline">
                                   <h2>{{  selectedActualites.Name}}</h2>
                                   
                                   
                                   <article v-html="selectedActualites.Description"></article>
                               </div>
                           </div>
                       </div>
                       
                   </div>
               </div>
           </div>
       </section>
   <!-- End of blog section
       ============================================= --> 
       
   </div>
</template>
<script>
import Loading from '@/components/Loyout/loading.vue';
import axios from '@/lib/axiosConfig.js'


export default {
   props:['id'],
   components: {
        Loading

   },

   data() {
       return {
           selectedActualites: '',
           services: [],
           actualites: [],
           loading: true, 
       }
   },
   computed: {
  
  loggedInUser() {
    return this.$store.getters['user/loggedInUser'];
  },


},

   mounted() {
    console.log("datadossiers", this.loggedInUser);
       console.log(this.id);
       this.fetchActualites();
       this.fetchServices();
   },
   methods: {
       async fetchServices() {
     try {
       await this.$store.dispatch('fetchServices');
       const services = JSON.parse(JSON.stringify(this.$store.getters.getServices));
       this.services = services
       console.log(services);
       
     } catch (error) {
       console.error("Erreur lors de la récupération des services :", error.message);
     }
   },
   async fetchActualites() {
    try {
       const response = await axios.get(`/projects/detail/${this.id}/`, {
         headers: {
          
           Authorization: `Bearer ${this.loggedInUser.token}`,
         },
       });
       console.log("Réponse du téléversement :", response);
       if (response.data.status === "success") {
        const selectedActualites = response.data.data;
        this.selectedActualites = selectedActualites
       console.log(selectedActualites);
         this.loading =false
       } 
     } catch (error) {
       console.error("Erreur lors du téléversement :", error);
       if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
          this.$router.push("/");  //a revoir
        }
     }
},


formatDate(dateString) {
       const options = { day: 'numeric', month: 'long', year: 'numeric' };
       const dateObject = new Date(dateString);
       return dateObject.toLocaleDateString('fr-FR', options);
   },
   },
}
</script>
<style lang="css" scoped>

   
</style>