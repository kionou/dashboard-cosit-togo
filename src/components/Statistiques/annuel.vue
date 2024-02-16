<template>
   <Loading v-if="loading" style="z-index: 99999;"> </Loading>
  <div>
    <div class="card z-index-2 ">
         <div class="card-titre">
              <h6 class="mb-0 text-center">Statistiques du nombre de souscriptions pour l'année <span style="font-weight: 900; color: red;" >{{ this.Annee }}</span> </h6>
              <hr class="dark horizontal">
            </div>
         <highcharts :options="chartOptions"></highcharts>
           
          </div>
  </div>
</template>

<script>
import axios from '@/lib/axiosConfig';
import { Chart } from 'highcharts-vue';
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
  // watch: {
  //   selectedOption: {
  //     immediate: true,
  //     handler(newAnnee) {
  //       // Mettez à jour le graphique lorsque l'année change
  //       this.fetchStaAnnuel();
  //     },
  //   },
  // },
  // props: {
  //   selectedOption: Number, // ou ajustez le type en fonction de votre besoin
  // },
  data() {
    return {
      Annee:'',
      chartOptions: {
        selectedOption: new Date().getFullYear(),
        loading:true,
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: '',
            
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45,
                dataLabels: {
                    enabled: true, // Activer l'affichage des étiquettes de données
                    format: '{point.name}: {point.y}', // Format de l'étiquette
                },
                showInLegend: true
            }
        },
         colors: ['#FF6604', '#544fc5'],
       
        series: [{
          name: 'Souscriptions',
          data: [], // Les données seront mises à jour dynamiquement
        }],
      },
    };
  },
  async mounted() {
    await this.fetchStaAnnuel();
  },
  methods: {
    async fetchStaAnnuel() {
      
      try {
        const response = await axios.get('/statistics/courses', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params: { IsPayed: false, Annee: this.selectedOption  },
        });

        const dataFromAPI = response.data.data.statictic_nb_souscription_annuel;
        this.Annee = dataFromAPI[0].Annee
        console.log(dataFromAPI);

        // Mettez à jour les données du graphique avec celles récupérées de l'API
        this.chartOptions.series[0].data = [
          { name: 'Formations souscrites', y: dataFromAPI[0].NbSouscription },
          { name: 'Formations Payées', y: dataFromAPI[0].Payed },
          this.loading= false
        ];

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
