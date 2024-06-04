<template lang="">
     <v-expansion-panels style="    margin-top: 200px;">
        
<v-sheet class="infoss" :elevation="2"  :width="200" border  v-for="(category, categoryIndex) in apiData" :key="categoryIndex">
        <div
          @click="toggleCategory(categoryIndex ,category )"
          class="info-item d-flex justify-content-around align-items-center" style="padding:10px"
          :class="{ 'margin-zero': category.show }"
        >
        
          <div>
            <span >{{ category.label }}</span>
          </div>
          <i :class="category.show ? 'bi bi-chevron-up' : 'bi bi-chevron-down'" class="flex-shrink-0"></i>

        </div>
        <div class="contenu" v-show="category.show">
              <MazCheckbox v-if="subDocumentsByCategory(category.id).length === 0" v-model="chosenColors":color="color" :id="color"  name="color" :value="category.id">
            {{category.label }}
            </MazCheckbox>
         
             <MazCheckbox v-else v-for="(subDocument, subDocIndex) in subDocumentsByCategory(category.id)"
            :key="subDocIndex" v-model="chosenColors":color="color" :id="color"  name="color" :value="subDocument.id">
            {{ subDocument.label }}
            </MazCheckbox>

        </div>
      
      </v-sheet>
    </v-expansion-panels>
</template>
<script>
  import axios from "@/lib/axiosConfig.js";
  import MazCheckbox from 'maz-ui/components/MazCheckbox'
 
  
  export default {
    components:{
    MazCheckbox

  },
    data() {
      return {
        apiData: [],
        selectedCategoryIndex: null,
        subDocumentsByCategoryMap: {},
        subDocuments:[],
      filteredDocuments: [],
      chosenColors:[]
      };
    },
    computed: {
      loggedInUser() {
        return this.$store.getters["user/loggedInUser"];
      },
    },
    async mounted() {
      await this.fetchMenus();
    },
    methods: {
      async fetchMenus() {
        try {
          const response = await axios.get("/menus", {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
  
          const nonStudentUsers = response.data.data;
          this.subDocuments = nonStudentUsers
  
          // Ajouter la propriété "show" à chaque élément dans apiData
          this.apiData = nonStudentUsers;

          this.apiData.forEach(category => {
    this.subDocumentsByCategoryMap[category.id] = this.subDocuments.filter(subDoc => subDoc.id === category.id);
    console.log( this.subDocumentsByCategoryMap[category.id]);
        });
        } catch (error) {
          console.error("errorqqqqq", error);
  
          if (error.response && (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401)) {
            await this.$store.dispatch("user/clearLoggedInUser");
            this.$router.push("/"); // à revoir
          }
        }
      },
      subDocumentsByCategory(categoryCode) {
        console.log('eee',categoryCode);
        console.log('eee',this.subDocumentsByCategoryMap[categoryCode][0].children);
      return this.subDocumentsByCategoryMap[categoryCode][0].children || [];
    },

    toggleCategory(categoryIndex, selectedCategory) {
  console.log('categoryIndex', selectedCategory);
  this.apiData.forEach((category, index) => {
    if (index === categoryIndex) {
      category.show = !category.show;
    } else {
      category.show = false;
    }
  });
},
    },
  };
</script>
<style lang="css" scoped>
.contenu {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
}
    
</style>