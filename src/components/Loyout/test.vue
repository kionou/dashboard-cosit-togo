<div class="row">
    <div class="col-lg-4 col-md-8 col-12 " style="width: 100%;
max-width: 500px;
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
                                      <MazInput v-model="step1.email"  no-radius color="warning" type="email"/>
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