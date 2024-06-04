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
            <div class="icon"  @click="OpenAddCathegorie()" >
                <i class="fa-solid fa-plus"></i>
            </div>
           </div>
        </div>
         
        </div>
    
        <section id="applghu-service" class="applghu-service-area" data-background="assets/img/studio-img-32/service-bg.jpg">
			<div class="container">

				<!-- Section Heading Start -->
				<div class="row">
					<div class="col-xl-12 text-center">
						<div class="saas_two_section_title saas2-headline text-center">
        			
                            <div class="aplpg-headline">
                                <h3>Liste des membres</h3>
                            </div>
				</div>
					</div>
				</div>
				<!-- Section Heading End -->
				<div v-if="paginatedItems.length === 0" class="noresul">
                      <span> Il n'y a aucun membre disponible </span>
                      </div> 
				<div class="row justify-content-center" v-else>
					<div v-for="membre in paginatedItems" :key="membre.id" class="col-xl-3 col-md-4">
						<div class="applghu-single-service wow fadeInUp" data-wow-delay="0.2s">
							<div class="applghu-service-icon-box">
								<!-- <img :src="membre.Photo" alt=""> -->
                <img v-if="isValidImage(membre.MemberPhoto)" :src="membre.MemberPhoto" alt="">
                <img v-else src="@/assets/site/logo1.jpeg" alt="">
							</div>
							<h3>{{ membre.MemberNames }}</h3>
							<p> {{ membre.MemberPosition }} </p>
							<p> {{ membre.MemberPhone }} </p>
							<p> {{ membre.MemberAddress }} </p>
							<p v-if=" membre.Sexe === 'M'"> Masculin </p>
							<p v-else> Feminin </p>
                            <div class="aplpg-blog-meta">
								
                                <span>
                                  <div class="sci">

                          <span style="--i:1" class="update">
                            <i class="bi bi-pen" @click="updatedoc(membre.id)"></i>
                          </span>
                          <span style="--i:2" @click="hamdledeletedoc(membre.id)" class="delete">
                            <i class="bi bi-trash"></i>
                          </span>
                          <span style="--i:1" class="opens" v-if="membre.Publish === 0" >
                            <i class="bi bi-power" @click="HandlePublish(membre.id )" ></i>
                          </span>
                          <span style="--i:1" class="open" v-else>
                            <i class="bi bi-power" @click="HandlePublish(membre.id )"></i>
                          </span>
                
                        </div>
                                </span>
                                            </div>
							
						</div>
					</div>

					
					

					
					
				
				</div>
			</div>
		</section>
      <div class="container_pagination">
      <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
    </div>
    
    
    <MazDialog v-model="AddCathegorie" title="Ajouté un membre"  width="600px">
        <div class="container my-auto  bg-white" id="container">
                            <div class="row">
                                <div class="col-11 col-lg-11 mx-auto">
                                    
                                    <small>{{ error }}</small>
                                    <form data-request="onSignin" class="login_form">
                                        <div class="row mb-3 mt-3 content-group">
                                        <div class="col">
                                        <div class="input-groupe">
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Nom complet</label>
                                            <MazInput v-model="step1.nom"  no-radius color="warning" type="text"/>
                                             <small v-if="v$.step1.nom.$error">{{v$.step1.nom.$errors[0].$message}}</small>
                                        </div>
                                        

                                        </div>
                                        <div class="col">
                                        <div class="input-groupe">
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Fonction</label>
                                            <MazInput v-model="step1.fonction"  no-radius color="warning" type="text"/>
                                            <small v-if="v$.step1.fonction.$error">{{v$.step1.fonction.$errors[0].$message}}</small>

                                        </div>
                                        

                                        </div>
                                         </div>
                                        
                                         <div class="row mb-3 mt-3 content-group">
                                        <div class="col">
                                        <div class="input-groupe">
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Adresse Email </label>
                                            <MazInput v-model="step1.email"  no-radius color="warning" type="email"/>
                                            <small v-if="v$.step1.email.$error">{{v$.step1.email.$errors[0].$message}}</small>

                                        </div>
                                        

                                        </div>
                                        <div class="col">
                                        <div class="input-groupe">
                                           
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Numéro Téléphonique </label>
                                            <MazPhoneNumberInput v-model="step1.phoneNumber" show-code-on-list no-radius color="warning" defaultCountryCode="TG"
                                            :ignored-countries="['AC']" @update="results = $event" :success="results?.isValid"  country-locale="fr-FR" noFlags="true" />
                                            <small v-if="v$.step1.phoneNumber.$error">{{v$.step1.phoneNumber.$errors[0].$message}}</small>
                                        </div>
                                        </div>
                                         </div>

                                         <div class="row mb-3 mt-3 content-group">
                                        <div class="col">
                                        <div class="input-groupe">
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Genre</label>
                                            <MazSelect v-model="step1.sexe" :options="sexes" no-radius color="warning" search />
                                            <small v-if="v$.step1.sexe.$error">{{v$.step1.sexe.$errors[0].$message}}</small>
                                        </div>
                                        

                                        </div>
                                        <div class="col">
                                        <div class="input-groupe">
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Est-il un expert ?</label>
                                            <MazSelect v-model="step1.expert" :options="choix" no-radius color="warning" search />
                                            <small v-if="v$.step1.expert.$error">{{v$.step1.expert.$errors[0].$message}}</small>
                                        </div>
                                        

                                        </div>
                                         </div>

                                         <div class="row mb-3 mt-3 content-group">
            <div class="col mt-4" style="display: flex; flex-direction: column; justify-content: flex-end;">
                   
                      <input type="file" name="file" id="file" class="inputfile"  ref="fileInput"
                        accept="image/*"
                        @change="handleFileChange" />
                      <label for="file">
                        <i class="bi bi-cloud-arrow-down"></i>
                      Joindre une image
                      </label>
                  </div>
                 
       
          </div>
                                         <div class="btn">
                                                <button class="sign" @click.prevent="submit">Soumettre</button>
                                              
                                              </div>
                                    </form>
                                 
                                </div>
                            </div>
         </div>
        
    </MazDialog>
    
    <MazDialog v-model="UpdateCathegorie" title="Mise à d'un personnel"  width="700px">
        <div class="container my-auto  bg-white" id="container">
                            <div class="row">
                                <div class="col-11 col-lg-11 mx-auto">
                                    
                                    <small>{{ error }}</small>
                                    <form data-request="onSignin" class="login_form">
                                        <div class="row mb-3 mt-3 content-group">
                                        <div class="col">
                                        <div class="input-groupe">
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Nom complet</label>
                                            <MazInput v-model="step2.nom"  no-radius color="warning" type="text"/>
                                             <!-- <small v-if="v$.step2.nom.$error">{{v$.step2.nom.$errors[0].$message}}</small> -->
                                        </div>
                                        

                                        </div>
                                        <div class="col">
                                        <div class="input-groupe">
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Fonction</label>
                                            <MazInput v-model="step2.fonction"  no-radius color="warning" type="text"/>
                                            <small v-if="v$.step2.fonction.$error">{{v$.step2.fonction.$errors[0].$message}}</small>

                                        </div>
                                        

                                        </div>
                                         </div>
                                        
                                         <div class="row mb-3 mt-3 content-group">
                                        <div class="col">
                                        <div class="input-groupe">
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Adresse Email </label>
                                            <MazInput v-model="step2.email"  no-radius color="warning" type="email"/>
                                            <small v-if="v$.step2.email.$error">{{v$.step2.email.$errors[0].$message}}</small>

                                        </div>
                                        

                                        </div>
                                        <div class="col">
                                        <div class="input-groupe">
                                           
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Numéro Téléphonique </label>
                                            <MazPhoneNumberInput v-model="step2.phoneNumber" show-code-on-list no-radius color="warning" defaultCountryCode="TG"
                                            :ignored-countries="['AC']" @update="results = $event" :success="results?.isValid"  country-locale="fr-FR" noFlags="true" />
                                            <small v-if="v$.step2.phoneNumber.$error">{{v$.step2.phoneNumber.$errors[0].$message}}</small>
                                        </div>
                                        </div>
                                         </div>

                                         <div class="row mb-3 mt-3 content-group">
                                        <div class="col">
                                        <div class="input-groupe">
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Genre</label>
                                            <MazSelect v-model="step2.sexe" :options="sexes" no-radius color="warning" search />
                                            <small v-if="v$.step2.sexe.$error">{{v$.step2.sexe.$errors[0].$message}}</small>
                                        </div>
                                        

                                        </div>
                                        <div class="col">
                                        <div class="input-groupe">
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Est-il un expert ?</label>
                                            <MazSelect v-model="step2.expert" :options="choix" no-radius color="warning" search />
                                            <small v-if="v$.step2.expert.$error">{{v$.step2.expert.$errors[0].$message}}</small>
                                        </div>
                                        

                                        </div>
                                         </div>

                                         <div class="row mb-3 mt-3 content-group">
            <div class="col mt-4" style="display: flex; flex-direction: column; justify-content: flex-end;">
                   
                      <input type="file" name="file" id="file" class="inputfile"  ref="fileInput"
                        accept="image/*"
                        @change="handleFileChangeUpdate" />
                      <label for="file">
                        <i class="bi bi-cloud-arrow-down"></i>
                      Joindre une image
                      </label>
                  </div>
                 
       
          </div>
                                         <div class="btn">
                                                <button class="sign" @click.prevent="submitUpdate">Soumettre</button>
                                              
                                              </div>
                                    </form>
                                 
                                </div>
                            </div>
         </div>
        
    </MazDialog>
    
    
      <MazDialog v-model="isdeletedoc" title="Suppression d'un personnel">
          <p>
            Êtes-vous sûr de vouloir supprimer ce membre ?
          </p>
          <template #footer="{ close }">
    
            <div class="supp" @click="close" style="background-color: red; "> Non</div>
    
            <div class="supp" @click="confirmDeletedoc" style="background-color: var(--color-primary);"> Oui</div>
    
          </template>
        </MazDialog>
    
    
    
        <MazDialog v-model="confirmdeletedoc" title="personnel supprimé">
          <p>
            membre supprimé avec succès !!
          </p>
          <template #footer="{ close }">
    
            <div class="supp" @click="close" style="background-color: blue; "> Ok</div>
    
    
    
          </template>
        </MazDialog>
    
        <MazDialog v-model="publishDoc" title="Cathegorie ">
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
    import MazTextarea from 'maz-ui/components/MazTextarea'
    import Pag from '@/components/Loyout/pag.vue';
    import MazSwitch from 'maz-ui/components/MazSwitch'
    import useVuelidate from '@vuelidate/core';
    import { require, lgmin, lgmax } from '@/functions/rules'
    import moment from 'moment';

    export default {
      components: {
           Loading , MazDialog , Pag , MazSwitch , MazTextarea
      }, 
    
      data() {
        return {
          ActualitesOptions:[],
          selectedActualites:'',
          AddCathegorie:false,
          UpdateCathegorie:false,
          loading:true,
          ToDeleteId:'',
          isdeletedoc:false,
          confirmdeletedoc:false,
          publier:'',
          publishDoc:false,
          currentPage: 1,
          itemsPerPage: 12,
          totalPageArray: [], 
          switchValue: {},
          v$: useVuelidate(),
          publish:'',
          error:'',
          step1:{
                nom: '',
                fonction: '',
                email: '',
                phoneNumber: '',
                sexe: '',
                expert: '',
                selectedFile: '',
               
            },
          step2:{
                nom: '',
                fonction: '',
                email: '',
                phoneNumber: '',
                sexe: '',
                expert: '',
                selectedFile: '',
               
            },
        sexes: [
        { label: "Masculin", value: "M" },
        { label: "Féminin", value: "F" },
      ],
      choix: [
        { label: "Oui", value: 1 },
        { label: "Non", value: 0 },
      ],
        
          
          
        }
      },
      validations: {
    
        step1:{
    
    nom: {
      require,
      lgmin: lgmin(2),
      lgmax: lgmax(20),
    },
    fonction: {
      require,
      lgmin: lgmin(2),
      lgmax: lgmax(20),
    },
    email: {
            require,
    },
    phoneNumber: {
      require,
    },
    sexe: {
      require,
    },
    expert: {
      require,
    },
   
   
        },
        step2:{
    
    nom: {
      require,
      lgmin: lgmin(2),
      lgmax: lgmax(20),
    },
    fonction: {
      require,
      lgmin: lgmin(2),
      lgmax: lgmax(20),
    },
    email: {
            require,
    },
    phoneNumber: {
      require,
    },
    sexe: {
      require,
    },
    expert: {
      require,
    },
   
   
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
        handleFileChange(event) {
      console.log("File input change");
      const file = event.target.files[0];
      console.log("Selected fileImage:", file);
      this.step1.selectedFile = file

    },
    handleFileChangeUpdate(event) {
      console.log("File input change");
      const file = event.target.files[0];
      console.log("Selected fileImage:", file);
      this.step2.selectedFile = file
    },
        formatCreatedAt(createdAt) {
      return moment(createdAt).format('DD/MM/YY');
    },
    validatePasswordsMatch() {
      return this.password === this.confirmer_password;
    },
        async fetchActualites() {
            try {
              const response = await axios.get('/teams', {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
                
              },
    
            });
              console.log(response.data.data.data);
              const nonStudentUsers = response.data.data.data
               this.ActualitesOptions = nonStudentUsers;
              console.log(nonStudentUsers);

                  this.loading = false;
            
            } catch (error) {
              console.error('errorqqqqq',error);
            
              if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                await this.$store.dispatch('user/clearLoggedInUser');
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
            const response = await axios.delete(`/teams/${this.ToDeleteId}`, {
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
            if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
          this.$router.push("/");  //a revoir
        }
            
          }
    
        },
    
      async HandlePublish(id){
        this.loading = true
        
      let dataMpme = {
        code: id,};
         console.log('dataMpme',dataMpme);
    
        try {
            const response = await axios.post('/teams/publish', dataMpme, {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
              
              }
            });
            console.log('Réponse du téléversement :', response);
            if (response.data.status === 'success') {
             if (response.data.data.Publish === 0) {
              console.log('rrrrr');
              this.publier = await "Votre membre n'est plus considéré comme un expert maintenant !"
    
             } else {
              console.log('rrrrr2222');
              this.publier = await "Votre membre est un expert maintenant !"
    
              
             }
                this.loading = false
                this.publishDoc = true
               await this.fetchActualites()
    
              
            }else{
              
            }
          } catch (error) {
            console.error('Erreur lors du téléversement :', error);
            if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
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
    
      
    
      OpenAddCathegorie(){
        this.AddCathegorie = true
       
    
      },
      async submit(){
    
        this.v$.step1.$touch();
          console.log("bonjour");
    
          if (this.v$.$errors.length == 0) {
            console.log("bonjour");
             this.loading = true;
             const formData = new FormData();
            formData.append("MemberNames", this.step1.nom);
            formData.append("MemberPosition", this.step1.fonction);
            formData.append("Photo", this.step1.selectedFile);
            formData.append("MemberPhone", this.step1.phoneNumber);
            formData.append("IsExpert", this.step1.expert);
            formData.append("Publish", 1);
            formData.append("MemberAddress", this.step1.email);
            formData.append("Sexe", this.step1.sexe);
       
       
        
        console.log(formData);
        console.log(
          this.step1.nom,this.step1.fonction ,  this.step1.phoneNumber, this.step1.expert,
          this.step1.email, this.step1.sexe,
          this.step1.selectedFile,
        );
           
            try {
              const response = await axios.post("/teams", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${this.loggedInUser.token}`,
                },
              });
              console.log("Réponse du téléversement :", response);
              if (response.data.status === "success") {
               await this.fetchActualites()
               this.AddCathegorie = false
               this.publier = " Votre membre a été crée avec succès !"
                this.publishDoc = true
                this.loading = false
                
              } 
            } catch (error) {
              console.error("Erreur lors du téléversement :", error);
              if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                await this.$store.dispatch('user/clearLoggedInUser');
              this.$router.push("/");  //a revoir
            }
            }
          } else {
            console.log("cest pas bon ", this.v$.$errors);
          }
      },
    
     async updatedoc(id){
      this.UpdateCathegorie = true
      this.loading = true
    
        try {
           const response = await axios.get(`/teams/detail/${id}`, {
             headers: {
              
               Authorization: `Bearer ${this.loggedInUser.token}`,
             },
           });
           console.log("Réponse du téléversement :", response);
           if (response.data.status === "success") {
            const selectedActualites = response.data.data;
            this.selectedActualites = selectedActualites
           console.log(selectedActualites);
            this.step2.nom = selectedActualites.MemberNames;
            this.step2.fonction = selectedActualites.MemberPosition;
            this.step2.expert = selectedActualites.IsExpert
            this.step2.phoneNumber = selectedActualites.MemberPhone
            this.step2.email = selectedActualites.MemberAddress
            this.step2.sexe = selectedActualites.Sexe
            this.publish = selectedActualites.Publish
            this.ToDeleteId = id
             this.loading =false
            //  MemberPhoto
           } 
         } catch (error) {
          if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
          this.$router.push("/");  //a revoir
        }       console.error("Erreur lors du téléversement :", error);
      
         }
      },
    async  submitUpdate(){
    
      this.v$.step2.$touch();
       console.log("bonjour");
    
       if (this.v$.$errors.length == 0) {
         console.log("bonjour");
          this.loading = true;
       
             const formData = new FormData();
            formData.append("MemberNames", this.step2.nom);
            formData.append("MemberPosition", this.step2.fonction);
            formData.append("Photo", this.step2.selectedFile);
            formData.append("MemberPhone", this.step2.phoneNumber);
            formData.append("IsExpert", this.step2.expert);
            formData.append("Publish", this.publish);
            formData.append("MemberAddress", this.step2.email);
            formData.append("Sexe", this.step2.sexe);
            formData.append("id", this.ToDeleteId);
            console.log(formData);
        console.log(
          this.step2.nom,this.step2.fonction ,  this.step2.phoneNumber, this.step2.expert,
          this.step2.email, this.step2.sexe, this.publish, this.ToDeleteId,
          this.step2.selectedFile,
        );
    
         try {
           const response = await axios.post(`/teams/update/${this.ToDeleteId}`,formData, {
             headers: {
              
               Authorization: `Bearer ${this.loggedInUser.token}`,
               "Content-Type": "multipart/form-data",
             },
           });
           console.log("Réponse du téléversement :", response);
           if (response.data.status === "success") {
             this.UpdateCathegorie = false
             await this.fetchActualites()
             this.publier = " Votre cathégorie a été mise avec succès !"
             this.loading = false
             this.publishDoc = true
             
           } 
         } catch (error) {
           console.error("Erreur lors du téléversement :", error);
           if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
          this.$router.push("/");  //a revoir
        }
         }
       } else {
         console.log("cest pas bon ", this.v$.$errors);
       }
      },
      isValidImage(src) {
      console.log(src);
      
      return src && src.indexOf('.') !== -1;
    },
        
    
      },
        
    }
    </script>
    <style lang="css" scoped>
     @import url("@/assets/css/flaticon-32.css");
		/* import "@/assets/css/rs6-32.css"
		import "@/assets/css/revulation-arrow-32.css" */
	
     @import url("../../assets/css/style-32.css");

     .applghu-service-area .applghu-single-service .applghu-service-icon-box img{
	width: 100%;
	height: 100%;

}
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
    
    
    
    
    
    #main-wrapper.oxyy-login-register {
      background: #fff;
    }
    
    .oxyy-login-register .hero-wrap {
      position: relative;
      overflow: hidden;
    }
    
    .oxyy-login-register .hero-wrap .hero-mask {
      z-index: 1;
    }
    
    .oxyy-login-register .hero-wrap .hero-mask, .oxyy-login-register .hero-wrap .hero-bg, .oxyy-login-register .hero-wrap .hero-bg-slideshow {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    .oxyy-login-register .bg-secondary {
      background-color: #fff !important;
    }
    .oxyy-login-register .opacity-4 {
      opacity: 0.4;
    }
    
    .oxyy-login-register .hero-wrap .hero-bg.hero-bg-scroll {
      background-attachment: scroll;
    }
    
    .oxyy-login-register .hero-wrap .hero-bg {
      z-index: 0;
      background-attachment: fixed;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      transition: background-image 300ms ease-in 200ms;
    }
    .oxyy-login-register .hero-wrap .hero-mask, .oxyy-login-register .hero-wrap .hero-bg, .oxyy-login-register .hero-wrap .hero-bg-slideshow {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    
    .oxyy-login-register .hero-wrap .hero-content {
      position: relative;
      z-index: 2;
    }
    
    .oxyy-login-register .font-weight-700 {
      font-weight: 700 !important;
    }
    
    .oxyy-login-register .text-5 {
      font-size: 21px !important;
      font-size: 1.3125rem !important;
    }
    
    .oxyy-login-register .font-weight-600 {
      font-weight: 600 !important;
    }
    
    .oxyy-login-register .text-9 {
      font-size: 36px !important;
      font-size: 2.25rem !important;
    }
    .text-color-orange {
      color: var(--color-primary);
    }
    
    .oxyy-login-register .text-primary, .oxyy-login-register .btn-link {
      color: #007bff !important;
    }
    
    form {
      padding: 0;
      margin: 0;
      display: inline;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    .oxyy-login-register .font-weight-600 {
      font-weight: 600 !important;
    }
    
    .text-color-orange {
      color: var(--color-primary);
    }
    
    .oxyy-login-register .form-control:not(.form-control-sm) {
      padding: 0.81rem 0.96rem;
      height: inherit;
    }
    
    .oxyy-login-register .form-control, .oxyy-login-register .custom-select {
      border-color: #dae1e3;
      font-size: 16px;
      color: var(--color-defaut);
    }
    
    .oxyy-login-register .btn:not(.btn-link) {
      -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
    }
    
    .btn:not(:disabled):not(.disabled) {
      cursor: pointer;
    }
    .oxyy-login-register .btn {
      padding: 0.8rem 2.6rem;
      font-weight: 500;
      -webkit-transition: all 0.5s ease;
      transition: all 0.5s ease;
    }
    .aplpg-blog-section {
    padding: 0px 0 50px 0 !important;
}

.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

.inputfile + label {
    font-size: 1.25em;
    font-weight: 700;
    color: var(--color-primary);
    /* background-color: black; */
    display: inline-block;
    width: 100%;
    padding: 10px;
    text-align: center;

    border: 1px solid #e5e7eb;
}


.inputfile + label {
	cursor: pointer; /* "hand" cursor */
}
     

.applghu-service-area .applghu-single-service {
    padding: 0!important;  
    height: 380px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.applghu-service-area .applghu-single-service .applghu-service-icon-box {
    width: 130px !important;
    height: 130px !important;
    
}

.applghu-service-area .applghu-single-service p {
   margin-bottom: 0px !important;
}

.applghu-service-area .applghu-single-service .applghu-service-btn[data-v-4afcea9e] {
  
    position: static !important;
    border: 1px solid blue;
   
}


@media screen and (max-width: 1280px) {

.applghu-service-area .applghu-single-service {
max-width: 330px !important;

}
}

    </style>