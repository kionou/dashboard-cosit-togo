<template >

<Loading v-if="loading" style="z-index: 99999;"></Loading>
    <div>
      <div class="row">
       
        <div class="containerr">
    
     
       <div class="content">
        <div class="search-box">
  <input class="search-input" type="text" placeholder="Search something..">
  <button class="search-btn"   ><i class="bi bi-search"></i></button>
</div>
        <div class="icon"  @click="$router.push({ path: '/projets/ajouter' })" >
            <i class="fa-solid fa-plus"></i>
        </div>
       </div>
    </div>
     
    </div>

    <section class="aplpg-blog-section">
		<div class="container">
			<div class="row">
				<div class="col-lg-8 offset-lg-2">
					<div class="aplpg-title-area text-center wow fadeInUp">
						<div class="aplpg-headline">
							<h3>Liste des Projets</h3>
						</div>
					</div>
				</div>
			</div>
			<div class="aplpg-blog-content">
				<div class="aplpg-blog-slider">
          <div v-if="paginatedItems.length === 0" class="noresul">
      <span> Vous n'avez pas encore de projet, vous pouvez également en ajouter un !! </span>
    </div>

          <div class="col-lg-3" v-for="actualite in paginatedItems" :key="actualite.id" >
						<div class="aplpg-blog-column">
							<div class="aplpg-img-wrapper">
                <img :src="actualite.Images" alt="">
							</div>
							<div class="aplpg-blog-meta">
								
                <span>
                  <div class="sci">
          <span style="--i:1"  class="dow">
            <i class="bi bi-eye"  @click="$router.push({ path:  '/projets/detail/'+ actualite.id })"></i>
           
          </span>
          <span style="--i:1" class="update">
            <i class="bi bi-pen" @click="$router.push({ path:  '/projets/update/'+ actualite.id })"></i>
           
          </span>
          <span style="--i:2" @click="hamdledeletedoc(actualite.id)" class="delete">
            <i class="bi bi-trash"></i>
          </span>

          <span style="--i:1" class="opens" v-if="actualite.publish === 0" >
            <i class="bi bi-power" @click="publish(actualite.id )" ></i>
          </span>
          <span style="--i:1" class="open" v-else>
            <i class="bi bi-power" @click="publish(actualite.id )"></i>
          </span>

        </div>
                </span>
							</div>
							<div class="aplg-blog-column-txt">
								<div class="aplpg-headline">
									<h6>{{ actualite.Name }}</h6>
								</div>
								
							</div>
							
						</div>
					</div>

				</div>
			</div>
   
		</div>
   
	</section>
  <div class="container_pagination">
  <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
</div>
  <MazDialog v-model="isdeletedoc" title="Suppression du projet">
      <p>
        Êtes-vous sûr de vouloir supprimer ce projet ?
      </p>
      <template #footer="{ close }">

        <div class="supp" @click="close" style="background-color: red; "> Non</div>

        <div class="supp" @click="confirmDeletedoc" style="background-color: var(--color-primary);"> Oui</div>

      </template>
    </MazDialog>

    <MazDialog v-model="confirmdeletedoc" title="projet supprimé">
      <p>
        Projet supprimé avec succès !!
      </p>
      <template #footer="{ close }">

        <div class="supp" @click="close" style="background-color: blue; "> Ok</div>



      </template>
    </MazDialog>

    <MazDialog v-model="publishDoc" title="Actualité mise à jour">
      <p>
        {{  publier }}
      
      </p>
      <template #footer="{ close }">

        <div class="supp" @click="close" style="background-color: blue; "> Ok</div>



      </template>
    </MazDialog>
    </div>
</template>
<script>
import Loading from '@/components/Loyout/loading.vue';
import axios from '@/lib/axiosConfig.js'
import MazDialog from 'maz-ui/components/MazDialog'
import Pag from '@/components/Loyout/pag.vue';
export default {
  components: {
       Loading , MazDialog , Pag
  }, 

  data() {
    return {
      ActualitesOptions:[],
      loading:true,
      ToDeleteId:'',
      isdeletedoc:false,
      confirmdeletedoc:false,
      publier:'',
      publishDoc:false,
      currentPage: 1,
      itemsPerPage: 12,
      totalPageArray: [], 
      
    }
  },
  computed: {
  
  loggedInUser() {
    return this.$store.getters['user/loggedInUser'];
  },

  totalPages() {
return Math.ceil(this.ActualitesOptions.length / this.itemsPerPage);
},
paginatedItems() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.ActualitesOptions.slice(startIndex, endIndex);
},
},
  mounted() {
    console.log("datadossiers", this.loggedInUser);

    this.fetchActualites()
  },
  methods: {
    async fetchActualites() {
        try {
          const response = await axios.get('/projects', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            
          },

        });
          console.log(response.data.data);
          this.ActualitesOptions = response.data.data
          this.loading= false
        
        } catch (error) {
          console.error(error);
          if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
          this.$router.push("/");  //a revoir
        }
        }
      },

      hamdledeletedoc(itemId) {
      console.log(itemId);
      this.ToDeleteId = itemId;
      this.isdeletedoc = true

    },

    async confirmDeletedoc() {
      this.loading = true
      console.log('gggg', this.ToDeleteId);
      this.isdeletedoc = false
      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/projects/${this.ToDeleteId}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            'Content-Type': 'multipart/form-data',

          },


        });
        console.log('Réponse de suppression:', response);
        if (response.data.status === 'success') {
          this.confirmdeletedoc = true
          this.fetchActualites();
          this.loading = false

        } else {
          console.log('error', response.data)
          this.loading = false
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        
      }

    },

  async publish(id ){
    this.loading = true
    
  //   let statutTraitement;
  // if (statut === 1) {
  //   statutTraitement = false;
  // } else if (statut === 0) {
  //   statutTraitement = true;
  // } else {
    
  //   statutTraitement = null; // Ou une autre valeur par défaut si nécessaire
  // }

  let dataMpme = {
    code: id,
    
  };
console.log('dataMpme',dataMpme);

    try {
        const response = await axios.post('/actualites/publish-actualite', dataMpme, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          
          }
        });
        console.log('Réponse du téléversement :', response.data.message);
        if (response.data.status === 'success') {
         if (response.data.message === "Unpublished") {
          console.log('rrrrr');
          this.publier = await 'Votre actualité a été retirée de la liste avec succès.'

         } else {
          console.log('rrrrr2222');
          this.publier = await 'Votre actualité a été publiée avec succès !'

          
         }
            this.loading = false
            this.publishDoc = true
           await this.fetchActualites()

          
        }else{
          
        }
      } catch (error) {
        console.error('Erreur lors du téléversement :', error);
        if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
          this.$router.push("/");  //a revoir
        }
       
    }
    },

    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Utilisez 'auto' pour un défilement instantané
      });
    },
    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
     
      const endIndex = startIndex + this.itemsPerPage;
      return  this.ActualitesOptions.slice(startIndex, endIndex);
    },
    

  },
    
}
</script>
<style lang="css">

.containerr{
/* border: 1Px solid red; */
/* background-color:var(--color-default); */
border-radius: var(--box-shadow);
width: 97%;
height: 60px;
display: flex;
justify-content: flex-end;
align-items: center;
padding:10px;
position: relative;
margin: 30px 4px 0;

}
.containerr p{
    font-weight: 900;


}

.form-containerr {
  width: 510px;
  border-radius: 0.75rem;
  color: black;
  z-index: 100;

}
.title {
  display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.title img{
  width: 90px;
  height: ç0px;

}


.containerr .content{
    /* border:1px solid blue; */
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

}
.search-box {
  width: 350px;
  position: relative;
  display: flex;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}

.search-input {
  width: 100%;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  padding: 5px 45px 5px 15px;
 border: 1px solid var(--color-primary);
    color: var(--color-default);
    border-radius: 6px;
    transition: all .4s;
}

.search-input:focus {
  border:none;
  outline:none;
  box-shadow: var(--box-shadow);
}

.search-btn {
  background-color: transparent;
  font-size: 18px;
  padding: 6px 9px;
  margin-left:-45px;
  border:none;
  color: #6c6c6c;
  transition: all .4s;
  z-index: 10;
  display: flex;
}

.search-btn:hover {
  transform: scale(1.2);
  cursor: pointer;
  color:var(--color-primary);
}

.search-btn:focus {
  outline:none;
  color:black;
}
.containerr .content .icon{
    /* border: 1px solid red; */
    width: 35px;
    height: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 25px;
    background-color: var(--color-primary);
    color: #fff;
    margin-left: 10px;

}
.containerr .content .icon:hover{
    color: var(--color-primary);
    background-color: #fff;
    border: 1px solid var(--color-primary);
    cursor: pointer;

}

    
</style>