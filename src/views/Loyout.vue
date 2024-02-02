<template>
    <div>
       
        <Navbar v-if="!isPageConnexion "/>
        <div v-if="!isPageConnexion " class="haut"></div>

        <RouterView />
        

    </div>
</template>

<script>
import Navbar from '@/components/Loyout/navbar.vue';


export default {
    name: 'CositTogoLayout',
    components:{
        Navbar 
    },

    data() {
        return {
            isPageConnexion: false,
           
        };
    },
    watch: {
        // Observer le changement de route pour déterminer si la page est celle de connexion ou d'inscription
        $route(to, from) {
            this.isPageConnexion = to.name === 'connexion';
           
        },
    },
    mounted() {
        this.isPageConnexion = this.$route.name === 'connexion';
        
    },

    methods: {

    },
};
</script>

<style lang="css" scoped>
.haut{

    margin-bottom: 80px;
}
</style>