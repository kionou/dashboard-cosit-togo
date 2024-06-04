// Fichier : src/axios.js
import axios from 'axios';

// Configuration d'Axios
// https://cors-proxy.fringe.zone/
const instance = axios.create({
  baseURL: 'https://api.cosit-togo.com/api/', // Remplacez par l'URL de votre API
 
  headers: {
    'Content-Type': 'application/json',
    // Vous pouvez ajouter d'autres en-têtes ici
  },
});

// Intercepteur pour gérer les erreurs de requête
instance.interceptors.request.use(
  config => {
    // Vous pouvez ajouter des logiques de prétraitement ici
    return config;
  },
  error => {
    // Gérer les erreurs de requête ici
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
instance.interceptors.response.use(
  response => {
    // Vous pouvez ajouter des logiques de post-traitement ici
    return response;
  },
  error => {
    // Gérer les erreurs de réponse ici
    return Promise.reject(error);
  }
);

export default instance;
