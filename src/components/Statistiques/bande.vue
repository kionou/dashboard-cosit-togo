<template>
   <div>
    <Loading v-if="loading" style="z-index: 99999;"></Loading>
    <div>
      <div class="card z-index-2" v-if="dataFromAPI.length > 0">
        <div class="card-titre">
          <h6 class="mb-0 text-center">Nombre de souscriptions par Formation pour l'année <span style="font-weight: 900; color: red;" >{{ this.selectedOption }}</span></h6>
          <hr class="dark horizontal">
        </div>
        <highcharts :options="chartOptions"></highcharts>
      </div>
      <div class="card z-index-2" v-else style="height: 460px; justify-content: center;
    align-items: center;">
        <div class="card-titre">
          <p style="font-weight: 900; color: red;">Pas de graphique pour l'année demandée.</p>
        </div>
       
      </div>
      
    </div>
  </div>
  </template>
  
  <script>
  import axios from '@/lib/axiosConfig';
  import { Chart } from 'highcharts-vue';
  import Highcharts from 'highcharts';
  import Loading from '@/components/Loyout/loading.vue';
  
  export default {
    components: {
      highcharts: Chart, Loading
    },
    computed: {
      loggedInUser() {
        return this.$store.getters['user/loggedInUser'];
      },
    },
    watch: {
      selectedOption: {
        immediate: true,
        handler(newAnnee) {
          // Mettez à jour le graphique lorsque l'année change
          this.fetchStaAnnuel();
        },
      },
      selectedOptionAnnee: {
        immediate: true,
        handler(newAnnee) {
          // Mettez à jour le graphique lorsque l'année change
          this.fetchStaAnnuel();
        },
      },
    },
    props: {
      selectedOption: Number, // ou ajustez le type en fonction de votre besoin
      selectedOptionAnnee: Boolean, // ou ajustez le type en fonction de votre besoin
    },
    data() {
      return {
        dataFromAPI:'',
       
        chartOptions: {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25,
            loading:true,
          },
        },
        xAxis: {
          categories: [], // Mettez à jour avec les noms de courses
        },
        yAxis: {
          title: {
            text: 'Nombre de Souscriptions',
          },
        },
        tooltip: {
          headerFormat: '<b>{point.key}</b><br>',
          pointFormat: 'Souscriptions: {point.y}',
        },
        title: {
          text: '',
          align: 'left',
        },
       
        legend: {
          enabled: false,
        },
        plotOptions: {
          column: {
            depth: 25,
          },
        },
        series: [{
          data: [], // Mettez à jour avec les valeurs de souscription
          colorByPoint: true,
        }],
      },
      };
    },
    async mounted() {
      await this.fetchStaAnnuel();
    },
    methods: {
      async fetchStaAnnuel() {
        
        console.log('this.selectedOption ',this.selectedOptionAnnee );
        try {
          const response = await axios.get('/statistics/courses', {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            params: { IsPayed: this.selectedOptionAnnee, Annee: this.selectedOption  },
          });
  
          const dataFromAPI = response.data.data.statistic_nb_souscription_annuel_by_courses;
        console.log(dataFromAPI , typeof(dataFromAPI));
          this.dataFromAPI = dataFromAPI

            // Mettez à jour les données du graphique avec celles récupérées de l'API
            this.chartOptions.xAxis.categories = dataFromAPI.map(item => item.course.Name);
            this.chartOptions.series[0].data = dataFromAPI.map(item => item.NbSouscription);
            this.loading=false
            this.$emit('enfantTermine', 'Traitement terminé avec succès');
        } catch (error) {
          console.error(error);
          if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
          this.$router.push("/");  //a revoir
        }
        }
      },
    },
  };
  </script>
  