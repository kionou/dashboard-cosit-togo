<template>
  

    <div class="mt-5">
        <div class="nav-align-top ">
            <ul class="nav nav-pills class1  " role="tablist">
                <li class="nav-item">
                    <div class="btns active" role="tab" data-bs-toggle="tab"
                        data-bs-target="#navs-pills-top-home1" aria-controls="navs-pills-top-home1"
                        aria-selected="true">
                Roles
                    </div>
                </li>

                <li class="nav-item">
                    <div class="btns" role="tab" data-bs-toggle="tab"
                        data-bs-target="#navs-pills-top-profile1" aria-controls="navs-pills-top-profile1"
                        aria-selected="false">
                        Permissions
                    </div>
                </li>
            </ul>
            <div class="tab-pane fade show active  contenu" id="navs-pills-top-home1" role="tabpanel">
                <Roles />

            </div>
            <div class="tab-pane fade" id="navs-pills-top-profile1" role="tabpanel">
              
                <Permissions />

            </div>

        </div>
    </div>

</template>

<script>


import Permissions from '@/components/Roles/Permissions.vue';
import Roles from '@/components/Roles/roles.vue';

export default {
name: 'DNPMECLFormulaire',
components: { Permissions ,Roles },
data() {
    return {

    };
},

mounted() {
    

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
/* max-width: 1140px; */
   background-color: #d9d9d9;
   height: 50px;
   margin: 0 auto;
   width: 100%;

}

.nav.nav-pills{
 border-radius: 0px !important;


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