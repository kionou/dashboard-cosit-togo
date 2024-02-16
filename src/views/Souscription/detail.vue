<template>
    <Loading v-if="loading" style="z-index: 999999;"></Loading>
    <div>
          <div class="row">  
        </div>
    
  

        <section id="ximsa-it-team" class="ximsa-it-team-section">
          <div class="" style="text-align: center; padding: 20px 0;">
                                <h3>Liste des clients</h3>
                            </div>

                            <div v-if="paginatedItems.length === 0" class="noresul">
      <span> Vous n'avez pas encore de formation, vous pouvez également en ajouter une !! </span>
    </div>                      
		<div v-else class="container" style="    display: flex; justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;">
			
			<div class="ximsa-it-team-content position-relative"  v-for="user in paginatedItems" :key="user.id">
						<div class="ximsa-it-team-item position-relative">
							<div class="inner-img">
								<img  v-if="user.order.user.profile === null" src="@/assets/site/logo1.jpeg"  alt="user1">
               <img  v-else :src="user.order.user.profile" alt="user1">
							</div>
							<div class="inner-text xis-it-main-headline text-center pera-content">
								<h3>{{ user.order.user.Prenoms }} {{ user.order.user.Nom }}</h3>
								<p>{{ user.order.user.email }}</p>
								<p>{{ user.order.user.Whatsapp }}</p>
							</div>
						</div>
			</div>
	
		</div>
	</section>

      <div class="container_pagination">
      <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
    </div>
        </div>
  
</template>

<script>
import axios from '@/lib/axiosConfig';
import QrcodeVue from 'qrcode.vue';
import Loading from '@/components/Loyout/loading.vue';
import MazDialog from 'maz-ui/components/MazDialog'
import moment from 'moment';
import Pag from '@/components/Loyout/pag.vue';


export default {
   name: 'DNPMECLFormulaire',
   components: {QrcodeVue ,Loading ,MazDialog , Pag},
   props:['id'],
   data() {
       return {
			CourseOptions:[],
			CourseDetails: {},
      isOpen:false,
      loading:true,
      selectedCourseId: null,
      Payement:false,
      validerpay:'',
      currentPage: 1,
      itemsPerPage: 12,
      totalPageArray: [], 


       };
   },
   computed: {
    
    loggedInUser() {
      return this.$store.getters['user/loggedInUser'];
    },
    totalPages() {
return Math.ceil(this.CourseOptions.length / this.itemsPerPage);
},
paginatedItems() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.CourseOptions.slice(startIndex, endIndex);
},
  },

  async mounted() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    await  this.fetchCourse() 
    
    
	
 const selectHeader = document.querySelector('.class1');
 console.log(this.id);


if (selectHeader) {
 let headerOffset = selectHeader.offsetTop;
 let nextElement = selectHeader.nextElementSibling;
 console.log('headerOffset',headerOffset);
 console.log('headerOffset222',nextElement);

 const headerFixed = () => {
   if ((headerOffset - window.scrollY) <= 0) {
     selectHeader.classList.add('sticked');
     if (nextElement) nextElement.classList.add('sticked-header-offset');
   } else {
     selectHeader.classList.remove('sticked');
     if (nextElement) nextElement.classList.remove('sticked-header-offset');
   }
 }
 window.addEventListener('load', headerFixed);
 document.addEventListener('scroll', headerFixed);
}

   },

   methods: {
		async fetchCourse(){

			try {
				const response = await axios.get(`/courses/detail/${this.id}`, {
				headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
				});
      			  console.log('Réponse du téléversement :', response.data.data.subscriptions);
					const allUserData = response.data.data.subscriptions;
					this.CourseOptions = allUserData
          this.loading = false
                   
        
      } catch (error) {
        console.error('Erreur lors du téléversement :', error);
        if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
              this.$router.push("/");  //a revoir
            }
         
    }
		},
    formatCreatedAt(createdAt) {
      return moment(createdAt).format('DD/MM/YY');
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
      return this.CourseOptions.slice(startIndex, endIndex);
    },
	

	},

 
};
</script>

<style lang="css" scoped>
.fade:not(.show) {
   display: none;
   opacity: 0;
}
.class1{
background-color: #d9d9d9;
height: 50px;

}
.btns{

   padding: 0 33px;
   font-weight: 500;
   color: #fff;
   border: none;
   cursor: pointer;
   outline: none;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;

}
.btns.active{
background: var(--color-primary);


}

@media (max-width: 768px) {
 .sticked-header-offset {
   margin-top: 0 !important;
    

 }

 .class1{

   margin-top:70px;
 }
}


.aplpg-blog-column{
    -webkit-box-shadow: none !important;
    box-shadow: none !important;

}
.codeQR{
	text-align: center;
    padding: 0px 5px;
    color: var(--color-primary);
    cursor: pointer;
	margin-bottom: 0;
}


.qr{
	height: 200px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
    flex-wrap: wrap;
}

.qr img{
	 height: 100%;

}



.codeQR:hover{
	
    color: rgb(114, 194, 248);
   
}

.aider {
  text-align: center;
  color: var(--color-primary);
  cursor: pointer;
  margin-bottom: 0 !important;
  font-weight: bold;
}

.aider:hover {
  color: var(--color-secondary);
}

</style>