<template>
<div class="container my-auto bg-white" id="container">
  <div class="row">
      <div class="col-11 col-lg-11 mx-auto">
          
          <small>{{ error }}</small>
          <form data-request="onSignin" class="login_form">
              <div class="row mb-3 mt-3 content-group">
              <div class="col">
              <div class="input-groupe">
                  <label class="font-weight-600 text-color-orange" for="emailAddress">Categorie</label>
                  <MazSelect   v-model="step1.parent"  no-radius color="warning" :options="OptionMenus"  />
                    <small v-if="v$.step1.parent.$error">{{v$.step1.parent.$errors[0].$message}}</small>
              </div>                                       
              </div>
              
                </div>
                <div class="row mb-3 mt-3 content-group">
              <div class="col">
              <div class="input-groupe" >
                  <label class="font-weight-600 text-color-orange" for="emailAddress">Modules</label>
                    <div class="class5">
                      <div v-for="menu in OptionMenus1" :key="menu.id" id="dropdownHelperButton" data-dropdown-toggle="dropdownHelper" class="class0 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
 {{ menu.label }}
   <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</div>

  <!-- Dropdown menu -->
  <div id="dropdownHelper" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600">
    
      

  <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" aria-labelledby="dropdownHelperButton">
    <li v-for="childrene in menu?.children" :key="childrene.id">{{ childrene.label }}</li>
  </ul>

  </div>
                    </div>


        

                    <small v-if="v$.step1.modules.$error">{{v$.step1.modules.$errors[0].$message}}</small>
              </div>                                       
              </div>
              
                </div>
              
                <div class="btn">
                      <button class="sign" @click.prevent="submit">Soumettre</button>
                    
                    </div>
          </form>
        
      </div>
  </div>
</div>
</template>

<script  >

import axios from '@/lib/axiosConfig.js'
import MazDialog from 'maz-ui/components/MazDialog'
import useVuelidate from '@vuelidate/core';
import MazCheckbox from 'maz-ui/components/MazCheckbox'
import { require, lgmin, lgmax } from '@/functions/rules'
export default{
components: {
        MazDialog ,MazCheckbox
  },
data() {
  return {
    v$: useVuelidate(),
      error:'',
        step1:{
          parent: '' ,
          modules:''

        } ,

        OptionMenus:[],
        OptionMenus1:[],

  }
},
computed: {
loggedInUser() {
  return this.$store.getters['user/loggedInUser'];
},
},
validations: {
    step1:{  
      parent: {},
      modules: {},
    },


},

async mounted() {
await this.fetchMenus()
},

methods: {
async fetchMenus() {
        try {
          const response = await axios.get('/menus', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            
          },

        });
          console.log(response.data);
        const nonStudentUsers = response.data.data
       console.log(nonStudentUsers);
        
       this.OptionMenus1 = response.data.data
        this.OptionMenus =nonStudentUsers.map(region => ({
        label: region.label,
        value: region.id
      }));

        
        } catch (error) {
          console.error('errorqqqqq',error);
        
          if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
          this.$router.push("/");  //a revoir
        }
        }
      },
async submit(){

this.v$.step1.$touch();
  console.log("bonjour");

  if (this.v$.$errors.length == 0) {
    console.log("bonjour");
     this.loading = true;
    const dataCath = {

      parent:this.step1.parent || null,
      label:this.step1.label,
      lien:this.step1.lien,
      description:this.step1.description,
      icon:null
     
    }
   
    console.log(dataCath);
   
    try {
      const response = await axios.post("/menus", dataCath, {
        headers: {
          
          Authorization: `Bearer ${this.loggedInUser.token}`,
        },
      });
      console.log("Réponse du téléversement :", response);
      if (response.data.status === "success") {
       await this.fetchActualites()
       this.AddCathegorie = false
       this.publier = " Votre attribution a été crée avec succès !"
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
},
}
</script>

<style scoped lang="css">

.class0{
    border: 1px solid red;
  
    background-color: var(--color-primary);
    color: white;
}

.class5{

  display: flex;
   flex-direction: row;
   justify-content: space-around;
}


</style>