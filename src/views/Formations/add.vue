<template >
     <Loading v-if="loading" style="z-index: 99999;"></Loading>
    <div>
        <div class="container-fluid  d-flex justify-content-center align-items-center general" 
      data-aos-delay="100">
      <div class="form-container">
        <p class="title">Ajouter une nouvelle Formation</p>
       
        <small class="text-center">{{error}}</small>
        <form class="form" enctype="multipart/form-data">
          <div class="row mb-3 mt-3 content-group">
            <div class="col">
              <div class="input-groupe">
                <label for="titre">Domaine de formation</label>
                <MazSelect v-model="categorie" :options="Categories" no-radius color="warning" search />
              </div>
              <small v-if="v$.categorie.$error">{{ v$.categorie.$errors[0].$message }}</small>

            </div>
            
            
          </div>
          <div class="row mb-3 mt-3 content-group">
            <div class="col">
              <div class="input-groupe">
                <label for="titre">Nom</label>
                <MazInput v-model="nom"  no-radius color="warning" type="text"/>
              </div>
              <small v-if="v$.nom.$error">{{ v$.nom.$errors[0].$message }}</small>

            </div>
             <div class="col">
              <div class="input-groupe">
                <label for="titre">Montant</label>
                 <MazInputPrice v-model="priceValue" currency="XOF" locale="fr-FR" no-radius color="warning"  :min="1000" @formatted="formattedPrice = $event"/>
              </div>
              <small v-if="v$.priceValue.$error">{{ v$.priceValue.$errors[0].$message }}</small>

            </div>
            
          </div>
          <div class="row mb-3 mt-3 content-group">
            <div class="col">
              <div class="input-groupe">
                <label for="titre">Date début</label>
                <input type="date"  name="date"   id="date"  v-model="debut" autofocus="autofocus" :min="minEndDate" />
              </div>
              <small v-if="v$.debut.$error">{{ v$.debut.$errors[0].$message }}</small>

            </div>
             <div class="col">
              <div class="input-groupe">
                <label for="titre">Date Fin</label>
                <input type="date"  name="date"   id="date"  v-model="fin" autofocus="autofocus" :min="minEndDate" />
              </div>
              <small v-if="v$.fin.$error">{{ v$.fin.$errors[0].$message }}</small>

            </div>
            
          </div>
            
          <div class="row mb-3 mt-3 content-group">
            <div class="col mt-4" style="display: flex; flex-direction: column; justify-content: flex-end;">
                   
                      <input type="file" name="files" id="files" class="inputfile"  ref="fileInput"
                        accept="image/*"
                        @change="handleFileChange" />
                      <label for="files">
                        <i class="bi bi-cloud-arrow-down"></i>
                      Joindre une image
                      </label>
                  
                    <!-- <small v-if="v$.selectedFile.$error">{{ v$.selectedFile.$errors[0].$message }}</small> -->
                  </div>
                  <div class="col mt-4" style="display: flex; flex-direction: column; justify-content: flex-end;">
                   
                   <input type="file" name="filee" id="filee" class="inputfile"  ref="fileText"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                     @change="handleFileUpload" />
                   <label for="filee">
                     <i class="bi bi-cloud-arrow-down"></i>
                     Joindre un textel
                   </label>
               
                 <!-- <small v-if="v$.selectedFile.$error">{{ v$.selectedFile.$errors[0].$message }}</small> -->
               </div>
       
          </div>
            
          <div class="row mb-3 mt-3 content-group">
            <div class="col">
              <div class="input-groupe">
                <label for="titre">Prerequis</label>
                <MazInputTags   v-model="prerequis" no-radius color="warning"  />
              </div>
              <small v-if="v$.prerequis.$error">{{ v$.prerequis.$errors[0].$message }}</small>

            </div>
          
                 
       
          </div>
         

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
        
          <div class="btn">
            <button class="sign" @click.prevent="submit">Soumettre</button>
           
          </div>
        </form>
      </div>
    </div>

    <MazDialog v-model="publishDoc" title="Formation ajoutée avec success">
      <p>
        Votre Formation a été publiée avec succès !
      
      </p>
      <template #footer="">

        <div class="supp" @click="$router.push({ path: '/formations' })" style="background-color: blue; "> Ok</div>



      </template>
    </MazDialog>
    </div>
</template>
<script>
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';
import useVuelidate from '@vuelidate/core';     
import { require, lgmin,  ValidEmail,   } from '@/functions/rules';
import MazInputPrice from 'maz-ui/components/MazInputPrice'
import MazInputTags from 'maz-ui/components/MazInputTags'
import axios from '@/lib/axiosConfig.js'
import MazDialog from 'maz-ui/components/MazDialog'
import Loading from '@/components/Loyout/loading.vue';
import Editor from '@tinymce/tinymce-vue'

export default {
    components: {
     MazPhoneNumberInput , MazDialog , Editor , Loading , MazInputPrice ,MazInputTags
  }, 
    data() {
        return {
            v$:useVuelidate(), 
            selectedFile: '',
            selectedText:'',
            loading:false,
            nom:'',
            description:'',
            priceValue:'',
            categorie:'',
            prerequis:[],
            debut: '', // Date début
            fin: '',   // Date fin
            formattedPrice:'',
            publishDoc:false,
            Categories:[],
            

        }
    },

    validations: {
      nom: {
        require,
      lgmin: lgmin(2),
    },
  
    description: {
      require,
      lgmin: lgmin(2),
    },
    priceValue:{
      require,
    },
    categorie:{
      require
    },
    prerequis:{
      require
    },
    debut:{
      require
    },
    fin:{
      require
    },
   
 
  },
  computed: {
  
  loggedInUser() {
    return this.$store.getters['user/loggedInUser'];
  },
  minEndDate() {
      // Calcule la date minimale autorisée (date actuelle)
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      let day = currentDate.getDate();
      day = day < 10 ? `0${day}` : day;

      return `${year}-${month}-${day}`;
    },
},

async  mounted() {
    await this.fetchCategories()
    console.log("datadossiers", this.loggedInUser);
},
methods: {
    handleFileChange(event) {
      console.log("File input change");
      const file = event.target.files[0];
      console.log("Selected fileImage:", file);
      this.selectedFile = file
    },

   
    handleFileUpload() {
      this.selectedText= this.$refs.fileText.files[0];
      console.log( this.selectedText);
    },
    async fetchCategories() {
      try {
        await this.$store.dispatch('fetchCategories');
        const Categories = JSON.parse(JSON.stringify(this.$store.getters.getCategories));
        console.log(Categories);
        this.Categories =  Categories.map(region => ({
        label: region.Name        ,
        value: region.id
      }));
      } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error.message);
      }
    },
    async submit() {
      this.v$.$touch();
      console.log("bonjour");

      if (this.v$.$errors.length == 0) {
        console.log("bonjour");
         this.loading = true;
        const formData = new FormData();
        formData.append("Name", this.nom);
        formData.append("Description", this.description);
        formData.append("Photos", this.selectedFile);
        formData.append("IsActive", 0);
        formData.append("Prerequis[]", this.prerequis);
        formData.append("Fichier", this.selectedText);
        formData.append("StartDate", this.debut);
        formData.append("EndDate", this.fin);
        formData.append("Cost", this.priceValue);
        formData.append("Category_id", this.categorie);
       
       
        
        console.log(formData);
        console.log(
          this.nom,this.fin ,  this.categorie, this.formattedPrice,
          this.description, this.selectedText, this.debut,
          this.selectedFile, this.prerequis , this.priceValue
        );

        try {
          const response = await axios.post("/courses", formData, {
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
    
},
}
</script>
<style lang="css" scoped>





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
  border-color: #fcb731;
 
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
    
</style>