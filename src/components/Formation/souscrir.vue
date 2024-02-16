<template >
    <div>
      

        	<!-- Blog Section -->
	<section class="aplpg-blog-section">
		<div class="container">
			<div class="row">
				<div class="col-lg-8 offset-lg-2">
					<div class="aplpg-title-area text-center wow fadeInUp">
						
						<div class="saas_two_section_title saas2-headline text-center">
        			
						<p>				
                        Voici la liste des formations auxquelles vous
                         vous êtes inscrit(e) et que vous pouvez maintenant payer.
						</p>
        			</div>
					</div>
				</div>
			</div>
			<div class="aplpg-blog-content">
				<div class="aplpg-blog-slider">
					<div class="col-lg-3">
						<div class="aplpg-blog-column card">
							<div class="aplpg-img-wrapper">
								<img src="@/assets/img/app-landing-2/blog/01.jpg" alt="">
							</div>
							<div class="aplpg-blog-meta" style="background-color:red;">
							
								<span style="Color:#fff !important">Ternimer</span>
							</div>
							<div class="aplg-blog-column-txt">
								<div class="aplpg-headline">
									<a href="#"><h6>Aerial Photograhpy of Snowy Mountain Ranges</h6></a>
								</div>
								
							</div>
                            <p  @click="handleCodeQr" class="codeQR">Plus de detail</p>
        							<div class="nws-button  text-capitalize">
                                        <button class="hover-btn" @click="ajouterAuPanier(course.id)"> S'inscrir</button>
                                    </div>
							
						</div>
					</div>

                    <div class="col-lg-3">
						<div class="aplpg-blog-column card">
							<div class="aplpg-img-wrapper">
								<img src="@/assets/img/app-landing-2/blog/01.jpg" alt="">
							</div>
							<div class="aplpg-blog-meta" style="background-color:rgb(250, 186, 9);">
							
								<span style="Color:#fff !important">Debuter</span>
							</div>
							<div class="aplg-blog-column-txt">
								<div class="aplpg-headline">
									<a href="#"><h6>Aerial Photograhpy of Snowy Mountain Ranges</h6></a>
								</div>
								
							</div>
                            
							
						</div>
					</div>

                    <div class="col-lg-3">
						<div class="aplpg-blog-column card">
							<div class="aplpg-img-wrapper">
								<img src="@/assets/img/app-landing-2/blog/01.jpg" alt="">
							</div>
							<div class="aplpg-blog-meta" style="background-color:rgb(21, 255, 0);">
							
								<span style="Color:#fff !important">A venir</span>
							</div>
							<div class="aplg-blog-column-txt">
								<div class="aplpg-headline">
									<a href="#"><h6>Aerial Photograhpy of Snowy Mountain Ranges</h6></a>
								</div>
								
							</div>
							
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</section>
	<!-- Blog Section End --> 
    </div>
</template>
<script>
import axios from '@/lib/axiosConfig';
export default {
    data() {
		return {
			
		}
	},
	computed: {
    
    loggedInUser() {
      return this.$store.getters['user/loggedInUser'];
    },
  },
	async mounted() {
	  await	 this.fetchCourse();
	  console.log('eeee',this.loggedInUser.id);
	},
	methods: {
		async fetchCourse(){

			try {
				const response = await axios.get('/orders', {
				params: {  auth_user: this.loggedInUser.id,},
				headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
				});
      			  console.log('Réponse du téléversement :', response);
					const allUserData = response.data.data.data;
                   console.log(allUserData);
        
      } catch (error) {
        console.error('Erreur lors du téléversement :', error);
		if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
			await this.$store.dispatch('user/clearLoggedInUser');
			this.$router.push("/connexion");  //a revoir
			}
         
    }
		}
	},
}
</script>
<style lang="css" scoped>

.page-header {
  
    /* background-image: url('@/assets/img/img1.webp');  */
   

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

.codeQR:hover{
	
    color: rgb(114, 194, 248);
   
}
    
</style>