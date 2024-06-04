<template >
    <div>
     <Loading v-if="loading" style="z-index: 99999;"></Loading>
        <div class="container-fluid  d-flex justify-content-center align-items-center general" 
      data-aos-delay="100">
      <div class="form-container">
        <p class="title">Ajouter une nouvelle Actualité</p>
       
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
          <div class="row mb-3 mt-3 content-group">
            <div class="col mt-4" style="display: flex; flex-direction: column; justify-content: flex-end;">
                   
                      <input type="file" name="file" id="file" class="inputfile"  ref="fileInput"
                        accept="image/*"
                        @change="handleFileChange" />
                      <label for="file">
                        <i class="bi bi-cloud-arrow-down"></i>
                      Joindre une pièce
                      </label>
                  
                    <!-- <small v-if="v$.selectedFile.$error">{{ v$.selectedFile.$errors[0].$message }}</small> -->
                  </div>
       
          </div>
         

          <div class="row mb-3 mt-3 content-group">
            <div class="col">
              <div class="input-groupe">
                <label for="Description">Description</label>
                <div class="form-ckeditor">
                        <ckeditor v-model="description" :editor="editor"  :config="options"></ckeditor>

                      </div>
               
              
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

    <MazDialog v-model="publishDoc" title="Actualites ajoutee avec success">
      <p>
        Votre actualité a été publiée avec succès !
      
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
// import Editor from '@tinymce/tinymce-vue'
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
    components: {
     MazPhoneNumberInput , MazDialog  , Loading , ckeditor: CKEditor.component
  }, 
    data() {
        return {
            v$:useVuelidate(), 
            selectedFile: '',
            loading:false,
            titre:'',
            description:'',
            publishDoc:false,
            editor: ClassicEditor,

            plugins: [
        "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "save table contextmenu directionality emoticons template paste textcolor",
      ],
      toolbar:
        "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      ink image | print preview media fullpage | forecolor backcolor emoticons",
      options: {
        height: 300,
        style_formats: [
          { title: "Bold text", inline: "b" },
          { title: "Red text", inline: "span", styles: { color: "#ff0000" } },
          { title: "Red header", block: "h1", styles: { color: "#ff0000" } },
          { title: "Example 1", inline: "span", classes: "example1" },
          { title: "Example 2", inline: "span", classes: "example2" },
          { title: "Table styles" },
          { title: "Table row 1", selector: "tr", classes: "tablerow1" },
        ],
      },
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

    console.log("datadossiers", this.loggedInUser);
},
methods: {
    handleFileChange(event) {
      console.log("File input change");
      const file = event.target.files[0];
      console.log("Selected file:", file);
      this.selectedFile = file
    },

    async submit() {
      this.v$.$touch();
      console.log("bonjour");

      if (this.v$.$errors.length == 0) {
        console.log("bonjour");
         this.loading = true;
        const formData = new FormData();
        formData.append("titre", this.titre);
        formData.append("content", this.description);
        formData.append("files[]", this.selectedFile);
        formData.append("publish", 0);
        
        console.log(formData);
        console.log(
          this.titre,
          this.description,
          this.selectedFile
        );

        try {
          const response = await axios.post("/actualites", formData, {
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

.ck , .ck-editor__main{
  height: 20vh !important;

}

.ck-editor__editable_inline{

  height: 20vh !important;
}
    
</style>