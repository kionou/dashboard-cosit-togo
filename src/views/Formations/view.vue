<template >
   <div>
       
    <Loading v-if="loading" style="z-index: 999999;"></Loading>

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
                                        <img  class="img-fluid" alt=" actualite" :src="selectedActualites.Photo">
                                    </div>
                                    <div  class="texte" style="margin-left: 18px;">
                                                <p  class="texte-content ">
                                                  <span class="cs1">Date de début:</span>
                                                 <span style="font-weight: bolder;">{{selectedActualites.StartDate }}</span>
                                                </p>
                                                <p  class="texte-content ">
                                                    <span class="cs1">Date de fin:</span>
                                                    <span style="font-weight: bolder;" >{{selectedActualites.EndDate }}</span>
                                                </p>

                                                <p  class="texte-content ">
                                                    <span class="cs1">Prix:</span>
                                                    <span style="font-weight: bolder;" >{{selectedActualites.Cost }}</span>
                                                </p>
                                                <p  class="texte-content ">
                                                    <span class="cs1">Type de Formation:</span>
                                                    <span style="font-weight: bolder;" >{{selectedActualites.category?.Name }}</span>
                                                </p>
                                             
                                            </div>
                                </div>
                               
                               
                           </div>
                       </div>
                       <div class="col-md-7">
                           <div class="saasio-blog-details-content">
                               
                               <div class="blog-details-text dia-headline">
                                   <h2>{{  selectedActualites.Name}}</h2>
                                   
                                   
                                   
                                   <article>
                                       {{  selectedActualites.Description}}
                                   </article>
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
       console.log(this.id);
       this.fetchActualites();
   },
   methods: {
     
   async fetchActualites() {
    
    try {
       const response = await axios.get(`/courses/detail/${this.id}/`, {
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
.texte-content {
 
 margin-bottom: 0!important;
}

.cs1 {

 margin-right: 14px;
}


   
</style>