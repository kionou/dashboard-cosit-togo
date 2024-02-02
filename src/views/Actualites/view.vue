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
                                        <img  class="img-fluid" alt=" actualite" :src="selectedActualites.images">
                                    </div>
                                </div>
                               
                               
                           </div>
                       </div>
                       <div class="col-md-7">
                           <div class="saasio-blog-details-content">
                               
                               <div class="blog-details-text dia-headline">
                                   <h2>{{  selectedActualites.titre}}</h2>
                                   
                                   
                                   <article v-html="selectedActualites.content"></article>
                                   <!-- <article v-html="content">
                                       {{  selectedActualites.content}}
                                   </article> -->
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

   mounted() {
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
       await this.$store.dispatch('fetchActualites');
       const actualites = JSON.parse(JSON.stringify(this.$store.getters.getActualites));
       const selectedActualites = actualites.find(service => service.id === parseInt(this.id));
       this.selectedActualites = selectedActualites
       console.log(selectedActualites);
       // Trier les actualités par date (du plus récent au plus ancien)
       actualites.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

       // Récupérer les 3 dernières actualités
       this.actualites = actualites.slice(0, 3);
       console.log(this.actualites);
       this.loading = false;


   } catch (error) {
       console.error("Erreur lors de la récupération des actualités :", error.message);
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