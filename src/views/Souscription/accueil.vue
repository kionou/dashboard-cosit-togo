<template>
    
    <div class="row gy-4">

        <div class="col-lg-12 col-12 ">
            <div class="nav-align-top ">
                <ul class="nav nav-pills class1 " role="tablist">
                    <li class="nav-item">
                        <div class="btns active" role="tab" data-bs-toggle="tab"
                            data-bs-target="#navs-pills-top-home1" aria-controls="navs-pills-top-home1"
                            aria-selected="true">
							Cours souscrits
                        </div>
                    </li>

                    <li class="nav-item">
                        <div class="btns" role="tab" data-bs-toggle="tab"
                            data-bs-target="#navs-pills-top-profile1" aria-controls="navs-pills-top-profile1"
                            aria-selected="false">
                            Cours payés
                        </div>
                    </li>
                </ul>
                <div class="tab-pane fade show active  contenu" id="navs-pills-top-home1" role="tabpanel">
                    <Souscrir />

                </div>
                <div class="tab-pane fade" id="navs-pills-top-profile1" role="tabpanel">
                  
                    <Payer />

                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Payer from '@/components/Formation/payer.vue';
import Souscrir from '@/components/Formation/accueilSouscrir.vue';

export default {
    name: 'DNPMECLFormulaire',
    components: { Payer ,Souscrir },
    data() {
        return {

        };
    },

    computed: {
    
    loggedInUser() {
      return this.$store.getters['user/loggedInUser'];
    },
  },

    mounted() {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  const selectHeader = document.querySelector('.class1');


if (selectHeader) {
  let headerOffset = selectHeader.offsetTop;
  let nextElement = selectHeader.nextElementSibling;
  console.log('headerOffset',headerOffset);
  console.log('headerOffset222',nextElement);

  const headerFixed = () => {
    if ((headerOffset - window.scrollY) <= 0) {
      selectHeader.classList.add('sticked');
      if (nextElement) nextElement.classList.add('sticked-header-offset');
    } else {
      selectHeader.classList.remove('sticked');
      if (nextElement) nextElement.classList.remove('sticked-header-offset');
    }
  }
  window.addEventListener('load', headerFixed);
  document.addEventListener('scroll', headerFixed);
}

    },

    methods: {

    },
};
</script>

<style lang="css" scoped>
.fade:not(.show) {
    display: none;
    opacity: 0;
}
.class1{
background-color: #d9d9d9;
height: 50px;

}
.btns{

    padding: 0 33px;
    font-weight: 500;
    color: #fff;
    border: none;
    cursor: pointer;
    outline: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

}
.btns.active{
background: var(--color-primary);


}

@media (max-width: 768px) {
  .sticked-header-offset {
    margin-top: 0 !important;
     

  }

  .class1{

    margin-top:70px;
  }
}


</style>