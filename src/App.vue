

<template>
  <RouterView />
</template>


<script >


   import "@/assets/css/fontawesome-all.css"
   import "@/assets/css/animate.css"
   import "@/assets/css/jquery.fancybox.min.css"
   import "@/assets/css/odometer-theme-default.css"
   import "@/assets/css/owl.carousel.css"
   import "@/assets/css/side-demo.css"
   import "@/assets/css/style.css"
   import "@/assets/css/business-4.css"
   import "@/assets/css/rs6.css"
	import "@/assets/css/flaticon-11.css"
	import "@/assets/css/jquery.mCustomScrollbar.min.css"
	import "@/assets/css/slick.css"
	import "@/assets/css/slick-theme.css"
  import "@/assets/css/swiper.css"
	import "@/assets/css/app-landing.css"

  import "@/assets/css/flaticon-32.css"
		import "@/assets/css/rs6-32.css"
		import "@/assets/css/revulation-arrow-32.css"
		import "@/assets/css/style-32.css"

import "@/assets/js/core/popper.min.js"
import "@/assets/js/core/bootstrap.min.js"
import "@/assets/js/plugins/perfect-scrollbar.min.js"
import "@/assets/js/material-dashboard.min.js?v=3.1.0"
  import "@/assets/css/nucleo-icons.css" 
  import "@/assets/css/nucleo-svg.css" 
  import "@/assets/css/material-dashboard.css?v=3.1.0" 

  export default {
  name:'App',
  watch: {
    created() {
      AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    
    },
    $route(to,) {
      const name = to.name.toLowerCase()
      const title = name 
        // ? `${name} (${to.href.split('/')[2].toLowerCase()})`
        // : name
      document.title = `cosit-Togo - ${title}`

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  
}
  

</script>

<style scoped lang="css">

</style>
