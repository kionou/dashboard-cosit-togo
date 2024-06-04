<template >
    <div>
    <Loading v-if="loading" style="z-index: 99999;"></Loading>
     
  <main class="main-content">
    <div class="row" style="width: 100%;max-width: 500px;">
    <div class="col-lg-4 col-md-8 col-12 " style="width: 100%;max-width: 500px;
margin: 0 auto;">
      <div class="card z-index-0 fadeIn3 fadeInBottom">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class=" shadow-primary border-radius-lg  image">
            <img src="@/assets/site/logo.jpeg" alt="">
           
          </div>
        </div>
        <div class="container my-auto py-4  bg-white" id="container">
                      <div class="row">
                          <div class="col-11 col-lg-11 mx-auto">
                             
                              <small>{{ error }}</small>
                              <form data-request="onSignin" class="login_form">
                                   <div class="form-group">
                                      <label class="font-weight-600 text-color-orange" for="emailAddress">Adresse Email</label>
                                      <MazInput v-model="step1.email"  no-radius color="warning" type="email" name="email"/>
                                      <small v-if="v$.step1.email.$error">{{v$.step1.email.$errors[0].$message}}</small>
                                  </div>
                                  <div class="form-group">
                                      <label class="font-weight-600 text-color-orange" for="loginPassword">Mot de passe</label>
                                      <MazInput v-model="step1.password"  no-radius type="password" color="warning"/>
                                      <small v-if="v$.step1.password.$error">{{v$.step1.password.$errors[0].$message}}</small>
                                  </div>

                                

                              <div class="btn">
                            <button class="sign" @click.prevent="Hamdlelogin">Se connecter</button>
  
                                </div>
                              </form>
                              <p class="text-center">
                                  <router-link to="/">
                                      <u style="color:#007bff !important ;">Mot de passe oublié?</u>
                                  </router-link>
                                  
                              </p>
                          </div>
                      </div>
        </div>
      </div>
    </div>
  </div>
  </main>
    </div>
</template>
<script>
import useVuelidate from '@vuelidate/core';
import { require, lgmin, lgmax } from '@/functions/rules';
import axios from '../lib/axiosConfig.js'
import { mapActions } from 'vuex';

import Loading from '@/components/Loyout/loading.vue';
export default {

  components:{
    Loading

  },
    data() {
    return {
        isOpen:false,
        loading:false,
        responseEmail:false,
        InfoUser:'',
        step1:{
            email: '',
        password: '',
        },

        v$: useVuelidate(),
        error:''
    }
  },

  validations: {
    step1:{
        email: {
      require,
    },
    password: {
      require,
      lgmin: lgmin(8),
      lgmax: lgmax(20),
    }
    },
  
    
  },
  mounted() {
    
  },
  methods: {
    ...mapActions('user', ['setLoggedInUser']),
    async Hamdlelogin(){

        this.error = '',
         this.v$.step1.$touch()
          if (this.v$.$errors.length == 0 ) {
         this.loading = true

            
      let DataUser = {
        email:this.step1.email,
        password:this.step1.password
      }
      console.log("eeeee",DataUser);
      try {
      const response = await axios.post('/system/login' , DataUser);
      console.log('response.login', response.data); 
      if (response.data.status === "success") {
        this.InfoUser = response.data.data
        this.setLoggedInUser(this.InfoUser);
        this.loading = false
        this.$router.push('/admin');
        
        
      } else {
        
      }
     
      
      
    } catch (error) {
      console.log('response.login', error); 
      this.loading = false
      if (error.response.data.message === "Accès refusé vous n'êtes pas autorisé.") {
       return this.error = " Accès refusé vous n'êtes pas autorisé."
        
      } else if(error.response.data.message === "mot de passe incorrect." || error.response.status === 500) {
       return this.error = "L'authentification a échoué"
        
      }
    }
            }else{
            
            console.log('pas bon', this.v$.$errors);
        this.loading = false
            
            } 
    },
  
  
  },
}
</script>
<style lang="css" scoped>

.main-content{
    width: 100%;
    height: 100vh;
    background-size: inherit;
    background-position: left;
    background-image: url(/src/assets/site/fns1.png);
    background-repeat: repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.image{
  width: 100%;
  height: 15vh;
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}
.image img {
  width: 60%;
    height: 80%;

}
    
</style>