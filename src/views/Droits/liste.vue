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
    
        <section class="aplpg-blog-section">
            <div class="container-general">
                <div class="row">
                    <div class="col-lg-8 offset-lg-2">
                        <div class="aplpg-title-area text-center wow fadeInUp">
                            <div class="aplpg-headline">
                                <h3>Liste des Droits</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="aplpg-blog-content">
                    <div class="aplpg-blog-slider">
              <div v-if="paginatedItems.length === 0" class="noresul">
          <span> Vous n'avez pas encore de permission, vous pouvez également en ajouter une !! </span>
        </div>
    
        <div class="container-fluid " v-else>
            <div class="row">
        <div class="col-12">
          <div class="card ">
           
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th  rowspan="2" class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Noms</th>
                      <th rowspan="2" class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Crée</th>
                      <th  colspan="4" class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Actions</th>
                      <th  rowspan="2" class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Liste des Menus</th>

                    </tr>
                    <tr>
                    <th v-for="user in OptionPermissions" :key="user.id" class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"> {{ user.label }} </th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in paginatedItems" :key="user.id">
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                            
                            <img   src="@/assets/site/logo1.jpeg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
                            
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">{{ user.name }} </h6>
                           
                          </div>
                        </div>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold"> {{ formatCreatedAt(user.created_at) }}</span>
                      </td>
                        <td v-for="permission in OptionPermissions" :key="permission.id">
            <input
              type="checkbox"
              value:true
              
              :checked="hasPermission(user, permission)"
              :disabled="hasPermission(user, permission)"
              @change="updatePermission(user, permission)"
            />
          </td>
                      <!-- <td v-for="permission in OptionPermissions" :key="permission.value" class="align-middle text-center">
                        <MazCheckbox v-model="checkboxStates[`${user.id}_${permission.value}`]"></MazCheckbox>
                                       
                      </td> -->
               
                      <td class="align-middle text-center">
                        <div class="sci">
    
                        <span style="--i:1" class="dow">
                        <i class="bi bi-eye" @click="updatedoc(user.id)"></i>
                        
                        </span>
                        
  
                    </div>
                    
                      </td>
                    </tr>
                  
              
                  
                
                  </tbody>
                </table>
              </div>
            </div>
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
    
    
    <MazDialog v-model="AddCathegorie" title="Attribuer des autorisations à un rôle"  >
        <div class="container my-auto bg-white" id="container">
                            <div class="row">
                                <div class="col-11 col-lg-11 mx-auto">
                                    
                                    <small>{{ error }}</small>
                                    <form data-request="onSignin" class="login_form">
                                        <div class="row mb-3 mt-3 content-group">
                                        <div class="col">
                                        <div class="input-groupe">
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Rôle</label>
                                           
                                            <MazSelect   v-model="step1.code"  no-radius color="warning" :options="OptionRoles"  />
                                             <small v-if="v$.step1.code.$error">{{v$.step1.code.$errors[0].$message}}</small>
                                        </div>                                       
                                        </div>
                                       
                                         </div>

                                         <div class="row mb-3 mt-3 content-group">
                                        <div class="col">
                                        <div class="input-groupe">
                                            <label class="font-weight-600 text-color-orange" for="emailAddress">Autorisations</label>
                                        
                                            <MazSelect   v-model="step1.permissions"  no-radius color="warning" :options="OptionPermissions" multiple />
                                             <small v-if="v$.step1.permissions.$error">{{v$.step1.permissions.$errors[0].$message}}</small>
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
        
    </MazDialog>
    
    <MazDialog v-model="UpdateCathegorie" title="liste des menus assignée a ce  role "  width="1148px">
     
      <div class="aplpg-blog-content">
                    <div class="aplpg-blog-slider">
              <div v-if="MenuRole.length === 0" class="noresul">
          <span> Vous n'avez pas encore assignation pour ce role </span>
        </div>
    
        <div class="container-fluid " v-else>
            <div class="row">
        <div class="col-12">
          <div class="card ">
           
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nom menu</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Lien</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Module</th>
                      <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Crée</th>
                   
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in MenuRole" :key="user.id">
                      <td>
                        <div class="d-flex px-2 py-1">
                          <div>
                            
                            <img   src="@/assets/site/logo1.jpeg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
                            
                          </div>
                          <div class="d-flex flex-column justify-content-center">
                            <h6 class="mb-0 text-sm">{{ user.menu.label }} </h6>
                           
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="text-xs font-weight-bold mb-0">{{ user.menu.lien }}</p>
                       
                      </td>
                      <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0">{{ name }}</p>
                      </td>
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold"> {{ formatCreatedAt(user.menu.created_at) }}</span>
                      </td>
                     
                    </tr>

                
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    
                    </div>
                </div>
    </MazDialog>
    
    
      <MazDialog v-model="isdeletedoc" title="Suppression d'un personnel">
          <p>
            Êtes-vous sûr de vouloir supprimer ce personnel ?
          </p>
          <template #footer="{ close }">
    
            <div class="supp" @click="close" style="background-color: red; "> Non</div>
    
            <div class="supp" @click="confirmDeletedoc" style="background-color: var(--color-primary);"> Oui</div>
    
          </template>
        </MazDialog>
    
    
    
        <MazDialog v-model="confirmdeletedoc" title="personnel supprimé">
          <p>
            personnel supprimé avec succès !!
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
          OptionRoles:[],
          OptionPermissions:[],
          checkboxStates: {},
          switchValue: {},
          v$: useVuelidate(),
          MenuRole:[],
          name:'',
          publish:'',
          error:'',
            step1:{code: '' , permissions:[]} ,
            step2:{nom: ''} ,
        }
      },
      validations: {
        step1:{  
            code: {
      require,
     
    },
    permissions: {
      require,
     
    },
},
    step2:{  nom: {
      require,
      lgmin: lgmin(2),
      lgmax: lgmax(20),
    }},
  
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
        this.fetchRole()
      },
      methods: {
    rolePermissions(role, permission) {
    return role.permissions.map(p => p.name);
  },
       hasPermission(role, permission) {
      // Vérifier si le rôle a la permission
      console.log('role' , role);
      console.log('permission' , permission);
      console.log('permissionsssss' , role.permissions.some(p => p.name === permission.value));
      return this.rolePermissions(role, permission).includes(permission.value);
    },
    updatePermission(role, permission) {
      // Mettre à jour les autorisations du rôle en fonction de la case à cocher
      if (this.hasPermission(role, permission)) {
        // Retirer la permission si elle est cochée
        role.permissions = role.permissions.filter(p => p.id !== permission.id);
      } else {
        // Ajouter la permission si elle n'est pas cochée
        role.permissions.push(permission);
      }
    },
        getPermissionCheckedStatus(user, permissionName) {
          console.log('tous',user, permissionName)
          console.log('tous',user)
  const role = this.ActualitesOptions.find(role => role.id === user.id);
  console.log('permission', role)

  if (role) {
    const hasPermission = role.permissions.some(permission => permission.name === permissionName);

    // Utilisez le v-model pour définir l'état de la case à cocher
    this.$set(this.checkboxStates, `${user.id}_${permissionName}`, hasPermission);

    // Renvoie l'état de la permission pour éventuellement l'afficher dans le template
    return hasPermission;
  }

  return false;

  
},

      
        formatCreatedAt(createdAt) {
      return moment(createdAt).format('DD/MM/YY');
    },
    validatePasswordsMatch() {
      return this.password === this.confirmer_password;
    },
        async fetchActualites() {
            try {
              const response = await axios.get('/permissions', {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
                
              },
    
            });
              console.log(response.data.data);
                const nonStudentUsers = response.data.data.data
        
        console.log(nonStudentUsers);
       
        this.OptionPermissions =nonStudentUsers.map(region => ({
        label: region.name,
        value: region.name
      }));
        this.loading = false;
            
            } catch (error) {
              console.error('errorqqqqq',error);
            
              if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                await this.$store.dispatch('user/clearLoggedInUser');
              this.$router.push("/");  //a revoir
            }
            }
          },
          async fetchRole() {
  try {
    const response = await axios.get('/roles', {
      headers: {
        Authorization: `Bearer ${this.loggedInUser.token}`,
      },
    });

    const nonStudentUsers = response.data.data;

    // Pour chaque rôle, faites une requête séparée pour obtenir les permissions associées
    for (const region of nonStudentUsers) {
      const roleResponse = await axios.get(`/roles/${region.id}`, {
        headers: {
          Authorization: `Bearer ${this.loggedInUser.token}`,
        },
      });

      const roleDetails = roleResponse.data.data;
      
      // Créez un objet pour chaque rôle avec des propriétés spécifiques pour les permissions
      const roleObject = {
        id: roleDetails.id,
        name: roleDetails.name,
        created_at: roleDetails.created_at,
        permissions: roleDetails.permissions,
      };

     

      this.ActualitesOptions.push(roleObject);
      console.log('dddd',this.ActualitesOptions)
    }

    this.OptionRoles = nonStudentUsers.map(region => ({
      label: region.name,
      value: region.id,
    }));
    this.ActualitesOptions.forEach(role => {
        this.OptionPermissions.forEach(permission => {
          this.$set(this.checkboxStates, `${role.id}_${permission.value}`, false);
        });
      });
    this.loading = false;

  } catch (error) {
    console.error('errorqqqqq', error);

   
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
            const response = await axios.delete(`/categories/${this.ToDeleteId}`, {
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
    
        updateSwitchValue(categoryId) {
        this.switchValue[categoryId] = !this.switchValue[categoryId];
        console.log( 'fdddddddddd',this.switchValue[categoryId]);
        
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
            const dataCath = {
    
              code:this.step1.code,
              permissions:this.step1.permissions,
             
            }
           
            console.log(dataCath);
           
            try {
              const response = await axios.post("/roles/assign-permissions", dataCath, {
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
    
     async updatedoc(id){
      this.UpdateCathegorie = true
      this.loading = true
      try {
              const response = await axios.get(`/roles/${id}`, {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
                
              },
    
            });
              console.log(response.data.data);
            
              this.name = response.data.data.name
              const nonStudentUsers = response.data.data.menus
       
        this.MenuRole = nonStudentUsers;
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
    async  submitUpdate(){
    
      this.v$.step2.$touch();
       console.log("bonjour");
    
       if (this.v$.$errors.length == 0) {
         console.log("bonjour");
          this.loading = true;
       
                    const dataCath = {
    
              name:this.step2.nom,
             
              }
    console.log('dataCath',dataCath,this.ToDeleteId);
    
         try {
           const response = await axios.put(`/permissions/${this.ToDeleteId}`,dataCath, {
             headers: {
              
               Authorization: `Bearer ${this.loggedInUser.token}`,
             },
           });
           console.log("Réponse du téléversement :", response);
           if (response.data.status === "success") {
             this.UpdateCathegorie = false
             await this.fetchActualites()
             this.publier = " Votre permission a été mise avec succès !"
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

  .table thead th {
   
    border: 1px solid #f0f2f5 !important;
    text-align: center !important;
}
      .table.align-items-center td, .table.align-items-center th {
    vertical-align: middle;
    text-align: center !important;
}  
    </style>