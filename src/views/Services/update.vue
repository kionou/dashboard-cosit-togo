<template >
  <Loading v-if="loading" style="z-index: 99999;"></Loading>
 <div>
     <div class="container-fluid  d-flex justify-content-center align-items-center general" 
   data-aos-delay="100">
   <div class="form-container">
     <p class="title">Modifier un Service</p>
    
     <small class="text-center">{{error}}</small>
     <form class="form">
       <div class="row mb-3 mt-3 content-group">
         <div class="col">
           <div class="input-groupe">
             <label for="titre">Titre</label>
             <MazInput v-model="titre"  no-radius color="warning" type="text"/>
           </div>
           <small v-if="v$.titre.$error">{{ v$.titre.$errors[0].$message }}</small>

         </div>
         
       </div>
       <!-- <div class="row mb-3 mt-3 content-group">
         <div class="col mt-4" style="display: flex; flex-direction: column; justify-content: flex-end;">
                
                   <input type="file" name="file" id="file" class="inputfile"  ref="fileInput"
                     accept="image/*"
                     @change="handleFileChange" />
                   <label for="file">
                     <i class="bi bi-cloud-arrow-down"></i>
                   Joindre une pièce
                   </label>
               
               
               </div>
    
       </div> -->
      

       <div class="row mb-3 mt-3 content-group">
         <div class="col">
           <div class="input-groupe">
             <label for="Description">Description</label>
            
             <Editor
             v-model="description"
         api-key="bj81nr38bmmn1kxmcz2zvtgri5qwksbkfynfu5yr96xh60ou"
         :init="{
             plugins: 'lists link image table code help wordcount',
             toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
             tinycomments_mode: 'embedded',
             tinycomments_author: 'Author name',
         }"
          />
           </div>
           <small v-if="v$.description.$error">{{ v$.description.$errors[0].$message }}</small>
         </div>       
       </div>

       <div class="row mb-3 mt-3 content-group">
         <div class="col">
          <div class="profile-pic">
                 <label class="-label" for="file">
                  <span class="glyphicon glyphicon-camera"></span>
                  <span>Changer Image</span>
                </label>
                <input id="file" type="file" @change="loadFile" />

                <!-- <img
                  v-if="userData.profile === null"
                  src="@/assets/img/flags.png"
                  id="output"
                  width="200"
                /> -->
                <img  :src="selectedActualites.Photos" id="output" width="200" />
              </div> 
         </div>       
       </div>
      
     
       <div class="btn">
         <button class="sign" @click.prevent="submit">Soumettre</button>
        
       </div>
     </form>
   </div>
 </div>

 <MazDialog v-model="publishDoc" title="Actualites mise à jour  avec success">
   <p>
     Votre actualité a été mise à jour  avec succès !
   
   </p>
   <template #footer="">

     <div class="supp" @click="$router.push({ path: '/actualites' })" style="background-color: blue; "> Ok</div>



   </template>
 </MazDialog>
 </div>
</template>
<script>
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';
import useVuelidate from '@vuelidate/core';     
import { require, lgmin,  ValidEmail,   } from '@/functions/rules';
import axios from '@/lib/axiosConfig.js'
import MazDialog from 'maz-ui/components/MazDialog'
import Loading from '@/components/Loyout/loading.vue';
import Editor from '@tinymce/tinymce-vue'

export default {
 components: {
  MazPhoneNumberInput , MazDialog , Editor , Loading
}, 
props:['id'],
 data() {
     return {
         v$:useVuelidate(), 
         selectedFile: '',
         loading:true,
         titre:'',
         description:'',
         publishDoc:false,
         selectedActualites:'',
         publish:''
     }
 },

 validations: {
 titre: {
     require,
   lgmin: lgmin(2),
 },

 description: {
   require,
   lgmin: lgmin(2),
 },


},
computed: {

loggedInUser() {
 return this.$store.getters['user/loggedInUser'];
},
},

mounted() {
  this.fetchActualitesDetail()

 console.log("datadossiers", this.loggedInUser);
},
methods: {
 handleFileChange(event) {
   console.log("File input change");
   const file = event.target.files[0];
   console.log("Selected file:", file);
   this.selectedFile = file;
 },
 async fetchActualitesDetail() {
        try {
          const response = await axios.get(`/actualites`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            
          },

        });
          console.log(response.data.data);
          const actualites = response.data.data.data
          const selectedActualites = actualites.find(service => service.id === parseInt(this.id));
          console.log(selectedActualites);
          this.selectedActualites = selectedActualites
         // Attribuer les valeurs aux champs d'entrée
        this.titre = selectedActualites.titre;
        this.description = selectedActualites.content;
        this.publish = selectedActualites.publish
        
          this.loading= false
        
        } catch (error) {
          console.error(error);
          if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
          this.$router.push("/");  //a revoir
        }
        }
      },

      async fetchActualitesDetail() {
    try {
       const response = await axios.get(`/services/detail/${this.id}/`, {
         headers: {
          
           Authorization: `Bearer ${this.loggedInUser.token}`,
         },
       });
       console.log("Réponse du téléversement :", response);
       if (response.data.status === "success") {
        const selectedActualites = response.data.data;
        this.selectedActualites = selectedActualites
       console.log(selectedActualites);
       this.titre = selectedActualites.Name;
        this.description = selectedActualites.Description;
        this.publish = selectedActualites.publish
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

 async submit() {
   this.v$.$touch();
   console.log("bonjour");

   if (this.v$.$errors.length == 0) {
     console.log("bonjour");
      this.loading = true;
     const formData = new FormData();

      if (this.selectedFile === '') {
        formData.append("Name", this.titre);
        formData.append("Description", this.description);
        formData.append("Photo", this.selectedActualites.Photos);
        formData.append("Publish",  this.publish);

        console.log('formData',this.selectedActualites.Photos);
     console.log('rrrr',
       this.titre,
       this.description,
       this.selectedFile
     );
      }else{
        formData.append("Name", this.titre);
     formData.append("Description", this.description);
     formData.append("Photo", this.selectedFile);
     formData.append("Publish",  this.publish);

     console.log('formData',this.selectedFile);
     console.log('rrrr22',
       this.titre,
       this.description,
       this.selectedFile
     );
      }
    
     try {
       const response = await axios.post(`/services/update/${this.id}/`, formData, {
         headers: {
          "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${this.loggedInUser.token}`,
         },
       });
       console.log("Réponse du téléversement :", response);
       if (response.data.status === "success") {
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

 async loadFile(event) {
      // this.loading = true;
      var image = document.getElementById("output");
      image.src = URL.createObjectURL(event.target.files[0]);
      const file = event.target.files[0];
      this.selectedFile = file

      

     
    },
},
}
</script>
<style lang="css" scoped>

.supp {
 font-size: 15px;
 font-weight: 500;
 color: #fff;
 border: none;
 border-radius: 45px;
 z-index: 3;
 cursor: pointer;
 outline: none;
 width: 100px;
 height: 40px;
 display: flex;
 align-items: center;
 justify-content: center;
 margin: 0 5px;
}



.general {

padding: 20px 60px 60px;
}

.form-container {
width: 100%;
max-width: 1140px;
margin: 0 auto;
border-radius: 0.375rem;
background-color: white;
padding: 2rem;
color: black;
/* max-height: 550px; */
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06);
/* border: 1px solid red; */

}

.form .content {

border: 1px solid var(--color-secondary);
margin: 10px 0;
padding: 10px;
border-radius: 6px;
}

.title {
text-align: center;
font-size: 1.5rem;
line-height: 2rem;
font-weight: 700;
}

.form {
margin-top: 1.5rem;
}

.input-groupe {
margin-top: 0.25rem;
font-size: 0.875rem;
line-height: 1.25rem;
}

.input-groupe label {
display: block;
color: #000;
margin-bottom: 4px;
margin-left: 7px;
}

.titre {
display: block;
color: rgba(156, 163, 175, 1);
margin-bottom: 4px;
font-size: 12px;
}

.input-groupe input,
.form-select,
textarea {
width: 100%;

border: 1px solid #e5e7eb;
outline: 0;
padding: 14px;
color: rgb(3, 3, 5);
}

.input-groupe input:focus,
.input-groupe textarea:focus {
border-color: var(--color-primary);
}


.no-scroll {
overflow: hidden;

}
.scroll{
overflow: auto;
}

@media screen and (max-width: 768px) {

.form-container {
 /* width: 700px; */
 max-width: 100%;
 padding: 10px;
}

.content-group {
 display: flex;
 flex-direction: column;
}

.title{

 font-size: 22px;
 /* line-height: 2rem; */
 
}

}

@media screen and (max-width: 550px) {
.general {

 padding: 15px 10px;
}

.sign {

 width: 200px;

}

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


.profile-pic {
  color: transparent;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  height: 250px;
    width: 350px;
}

.profile-pic input {
  display: none;
}

.profile-pic img {
  position: absolute;
  object-fit: cover;
  width: 80%;
  height: 100%;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.35);
  z-index: 0;
  border: 1px solid var(--color-primary);
}

.profile-pic .-label {
  cursor: pointer;
  height: 240px;
    width: 266px;
}

.profile-pic:hover .-label {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10000;
  color: #fafafa;
  transition: background-color 0.2s ease-in-out;

  margin-bottom: 0;
}

.profile-pic span {
  display: inline-flex;
  padding: 0.2em;
  
}
 
</style>