<template >
  <div>
    <div class="row">
      <div class="col-12">
        <!-- Navbar -->
        <nav
          class="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
          <div class="container-fluid ps-2 pe-0">
            <a class="navbar-brand font-weight-bolder ms-lg-0 ms-3 " href="/">
              <img src="../../assets/site/logo.png" alt="">
            </a>
            <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse"
              data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon mt-2">
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </span>
            </button>
            <div class="collapse navbar-collapse" id="navigation">
              <ul class="navbar-nav mx-auto">


                <li class="nav-item dropdown">
                  <i class="material-icons opacity-10 opacity-6 text-dark me-1">person</i>

                  <MazDropdown :items="[
                    { label: 'Utilisateurs', to: { name: 'utilisateurs' } },
                    { label: 'Role', to: { name: 'cathegories' } },
                    { label: 'Profils', to: { name: 'formations' } },

                  ]">
                    Utilisateurs
                  </MazDropdown>
                </li>
                <li class="nav-item dropdown">
                  <i class="material-icons  opacity-10 opacity-6 text-dark me-1">settings</i>

                  <MazDropdown :items="[
                    { label: 'Actualites', to: { name: 'actualites' } },
                    { label: 'Cathegorie', to: { name: 'cathegories' } },
                    { label: 'Formation', to: { name: 'formations' } },
                    { label: 'Services', to: { name: 'services' } },
                    { label: 'Projets', to: { name: 'projets' } },
                    { label: 'Types payements', to: { name: 'type-payement' } },
                  ]">
                    Parametrage
                  </MazDropdown>
                </li>

                <li class="nav-item dropdown">
                  <i class="material-icons  opacity-10 opacity-6 text-dark me-1">settings</i>

                  <MazDropdown :items="[
                    //  { label: 'Actualites', to: { name: 'actualites' } },
                    //  { label: 'Cathegorie', to: { name: 'cathegories' } },
                    //  { label: 'Formation', to: { name: 'formations' } },
                    //  { label: 'Services', to: { name: 'services' } },
                    //  { label: 'Projets', to: { name: 'projets' } },
                    { label: 'Types payements', to: { name: 'type-payement' } },
                  ]">
                    payements
                  </MazDropdown>
                </li>





              </ul>
              <ul class="navbar-nav d-lg-flex d-none">
                <li class="nav-item d-flex align-items-center">
                  <div>
                  <div class="btnCt " role="button" data-bs-toggle="dropdown" aria-expanded="false">

                    <div class="image">
                      <img src="../../assets/site/team-2.jpg" alt="">
                    </div>
                  </div>
                  <ul class="dropdown-menu menu">
                    <li><router-link to="/#" class="dropdown-item d-flex justify-content-around"><i
                          class="bi bi-building"></i>Mon profil</router-link></li>
                    <li><span class="dropdown-item d-flex justify-content-around " style="cursor:pointer;"
                        @click="logout"><i class="bi bi-box-arrow-in-right pt-0"></i>Déconnexion</span></li>
                  </ul>
                </div>
                </li>

               
              </ul>
            </div>
          </div>
        </nav>
        <!-- End Navbar -->
      </div>
    </div>
  </div>
</template>
<script>
import MazDropdown from 'maz-ui/components/MazDropdown'
export default {
  component: {
    MazDropdown
  },
  data() {
    return {
      
    }
  },

  methods: {
    async logout() {
    try {      
        // const response = await axios.post('/auth-user-logout' ,{}, {
        //             headers: {
        //                     Authorization: `Bearer ${this.loggedInUser.token}`,
        //                    'Content-Type': 'application/json',
        //             },
        //         });
                // if (response.status === "success") {
                  
                        await this.$store.dispatch('user/clearLoggedInUser'); // Appel de l'action pour déconnecter l'utilisateur
                       this.$router.push('/'); // Redirection vers la page de connexion
                // }

    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  }
  },
}
</script>
<style lang="css" scoped>
.navbar {

  position: fixed !important;
  top: 0;
  right: 0;
  left: 0;
  height: 60px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
}
@media (max-width: 992px) {

  .navbar {

height: auto;

}
}
/* Dropdown Button */



.dropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: #344767;
  padding: 0.5rem 1rem;
  font-weight: 400;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 6px;
  bottom: -108px;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: #344767;
  padding: 8px 16px;
  text-decoration: none;
  display: block;
  border-radius: 6px;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
  color: var(--color-primary);
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}


.navbar-brand {

  width: 57px;
  height: 68px
}

.navbar-brand img {

  width: 100%;
  height: 100%;
}



.btnCt {
  /* padding: 12px 0 0 0; */
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary);
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: row;
  align-items: center;

}

.btnCt .image {

  /* border: 1px solid red; */
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.btnCt .image img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 2Px;
}

.btnCt i {
  font-size: 25px;
}

.btnCt span {
  /* position: absolute; */
  border-radius: 50%;
  font-size: 25px;
  top: 6px;
  left: 5px;
  display: flex;
  width: 40px;
  height: 23px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-default);

}
</style>