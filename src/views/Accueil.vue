<template >

  <Loading v-if="loading" style="z-index: 99999;"> </Loading>
    <div>
     <Nav></Nav>
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
   
    <div class="container-fluid py-4 " style="margin-top: 23px;">
      <div class="row">
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2">
              <div class="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                <i class="material-icons opacity-10">person</i>
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">Membres</p>
                <h4 class="mb-0">{{ statistics.membres || 0 }}</h4>
              </div>
            </div>
            <hr class="dark horizontal my-0">
            <div class="card-footer p-3">
             
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2">
              <div class="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                <i class="material-icons opacity-10">person</i>
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">Utilisateurs</p>
                <h4 class="mb-0">{{ statistics.users || 0 }}</h4>
              </div>
            </div>
            <hr class="dark horizontal my-0">
            <div class="card-footer p-3">
             
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2">
              <div class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                <i class="material-icons opacity-10">weekend</i>
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">Formations actives</p>
                <h4 class="mb-0">{{ statistics.courses_active || 0 }}</h4>
              </div>
            </div>
            <hr class="dark horizontal my-0">
            <div class="card-footer p-3">
            
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6">
          <div class="card">
            <div class="card-header p-3 pt-2">
              <div class="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                <i class="material-icons opacity-10">weekend</i>
              </div>
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">Formations inactives</p>
                <h4 class="mb-0">{{ statistics.courses_inative || 0 }}</h4>
              </div>
            </div>
            <hr class="dark horizontal my-0">
            <div class="card-footer p-3">
              
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="row mb-3 mt-3 content-group">
            <div class="col">
              <div class="input-groupe">
                <label for="sous_prefecture">Année </label>
                <MazSelect v-model="annee"  :options="yearOptions"  search  no-radius color="warning" v-slot="{ option }">
                  <div
                      class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                      @click="handleOptionPrefecture(option)"
                    >
                      {{ option.label }}
                    </div>
                  
                   </MazSelect>
              </div>
             
            </div>

            <div class="col">
              <div class="input-groupe">
                <label for="sous_prefecture">Options <span class="text-danger">*</span></label>
                <MazSelect v-model="IsPayed"  :options="Choix"  search no-radius color="warning"  v-slot="{ option }"> 
                  <div class="flex items-center"
                      style="
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        width: 100%;
                        gap: 1rem;
                      "
                      @click="handleOptionIsPayed(option)"
                    >
                      {{ option.label }}
                    </div>
                
                </MazSelect>
              </div>
              
            </div>
           
          </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6 col-md-12 mt-4 mb-4">
           <Annuel ></Annuel>
        </div>
        <div class="col-lg-6 col-md-12 mt-4 mb-4">
          <Bande :selectedOption="selectedOption" :selectedOptionAnnee="selectedOptionAnnee" @enfantTermine="handleEnfantTermine"></Bande>
         
        </div>
        
      </div>
     
      
    </div>
  </main>
 
    </div>
</template>
<script>
import Nav from '../components/Loyout/navbar.vue'
import Annuel from '@/components/Statistiques/annuel.vue';
import Bande from '@/components/Statistiques/bande.vue';
import Loading from '@/components/Loyout/loading.vue';
import axios from '@/lib/axiosConfig.js'
export default {
    components:{
        Nav , Annuel , Bande , Loading
    },
    data() {
        return {
          annee:'' ,
          IsPayed:'',
          years: [],
          yearOptions: [],
          selectedOption: new Date().getFullYear(),
          selectedOptionAnnee:'',
          statistics:'',
          loading:true,
          Choix: [
                { label: "Formation payée", value: true },
                { label: "Formation non payée", value: false },
              ],
        }
    },
    computed: {
  
  loggedInUser() {
    return this.$store.getters['user/loggedInUser'];
  },


},
  async  mounted() {
       await this.generateYearOptions()
       await this.fetchActualites()
    },
    methods: {
      async fetchActualites() {
        try {
          const response = await axios.get('/statistics/general', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            
          },

        });
          console.log(response.data.data);
          this.statistics = response.data.data
         
          this.loading= false
        
        } catch (error) {
          console.error('errorqqqqq',error);
        
          if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
          this.$router.push("/");  //a revoir
        }
        }
      },

      async generateYearOptions() {
      const currentYear = new Date().getFullYear();
      for (let year = 2020; year <= currentYear; year++) {
        this.years.push(year);
      }
      this.yearOptions = this.years.map(year => ({
        label: String(year),
        value: String(year)
      }));
    },
    handleOptionPrefecture(value){
      console.log(value);
      this.selectedOption = value.value;
      this.loading= true
    },
    handleEnfantTermine() {
      this.loading= false
    },
    handleOptionIsPayed(value){
      console.log(value);
      this.selectedOptionAnnee = value.value;
      this.loading= true

    }
  
    },
}
</script>


<style lang="css" scoped>


    
</style>