<template >
    <div class="generals">
        <div class="sphere-container">
  <div class="sphere sphere1"></div>
  <div class="sphere sphere2"></div>
  <div class="sphere sphere3"></div>
</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
   
    },
    
}
</script>
<style lang="css">

.generals{
    
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;

}
.sphere-container {
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
}

.sphere {
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  height: 30px;
  margin: 0 10px;
  width: 30px;
}

.sphere1 {
  animation: sphere 1.2s 0.2s ease-in-out infinite;
  background: radial-gradient(circle at 30% 30%, #ff1111, #ff1111, #ff1111);

}
.sphere2 {
  animation: sphere 1.2s 0.5s ease-in-out infinite;
  background: radial-gradient(circle at 30% 30%, #ffffff, #ffffff, #ffffff);

}
.sphere3 {
  animation: sphere 1.2s 0.8s ease-in-out infinite;
  background: radial-gradient(circle at 30% 30%, #282350, #282350, #282350);

}

@keyframes sphere {
  0% {
    transform: scale(1.3);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.7);
  }
  50% {
    transform: translate(0, 50px);
    box-shadow: 0 7px 10px rgba(0, 0, 0, 0.5);
  }
  100% {
    transform: scale(1.3);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0);
  }
}

    
</style>