import './assets/main.css'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import store from './Store.js';

axios.defaults.baseURL = 'https://localhost:7251/api';
//set header 
//axios.defaults.headers.common['Authorization'] = "jelloo";
const app = createApp(App)
app.use(router);
app.use(store);
app.use(VueSweetalert2);

window.Swal =  app.config.globalProperties.$swal
window.backendHost= 'https://localhost:7251'
//set golbal cho Swal 
app.mount('#app')
