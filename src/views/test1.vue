<!-- DropdownComponent.vue -->
<template>
    <div>
      <ul class="class5">
        <li class="class0" v-for="(item, index) in apiData" :key="item.id" @click="toggleChildren(index)">
          {{ item.label }}
          <ul :class="{ 'margin-zero': item.show }">
            <li v-for="childItem in item.children" :key="childItem.id">
              {{ childItem.label }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from "@/lib/axiosConfig.js";
  
  export default {
    data() {
      return {
        apiData: [],
        selectedCategoryIndex: null,
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
  
          // Ajouter la propriété "show" à chaque élément dans apiData
          this.apiData = nonStudentUsers.map(item => ({ ...item, show: false }));
        } catch (error) {
          console.error("errorqqqqq", error);
  
          if (error.response && (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401)) {
            await this.$store.dispatch("user/clearLoggedInUser");
            this.$router.push("/"); // à revoir
          }
        }
      },
      toggleChildren(categoryIndex) {
        this.apiData.forEach((item, index) => {
          if (index === categoryIndex) {
            item.show = !item.show;
          } else {
            item.show = false;
          }
        });
      },
    },
  };
  </script>
  
  <style lang="css" scoped>
  .class0 {
    border: 1px solid red;
    background-color: var(--color-primary);
    color: white;
  }
  
  .class5 {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 217px;
  }
  
  .margin-zero {
    margin: 0;
  }
  </style>
  