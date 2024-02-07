<template>
    <form @submit.prevent="submitForm">
      <label for="nom">Nom:</label>
      <input type="text" id="nom" v-model="nom" required>
  
      <label for="prenom">Prénom:</label>
      <input type="text" id="prenom" v-model="prenom" required>
  
      <label for="image">Image (jpg, png):</label>
      <input type="file" id="image" accept="image/*" @change="handleImageUpload" required>
  
      <label for="pdf">PDF:</label>
      <input type="file" id="pdf" accept=".pdf" @change="handlePdfUpload" required>
  
      <label for="texte">Texte:</label>
      <textarea id="texte" v-model="texte" required></textarea>
  
      <button type="submit">Envoyer</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        nom: '',
        prenom: '',
        image: null,
        pdf: null,
        texte: '',
      };
    },
    methods: {
      submitForm() {
        this.$emit('form-submitted', {
          nom: this.nom,
          prenom: this.prenom,
          image: this.image,
          pdf: this.pdf,
          texte: this.texte,
        });
      },
      handleImageUpload(event) {
        const file = event.target.files[0];
        this.image = file;
      },
      handlePdfUpload(event) {
        const file = event.target.files[0];
        this.pdf = file;
      },
    },
  };
  </script>
  