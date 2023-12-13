import './assets/main.css'
import axios from 'axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import store from './Store.js';

axios.defaults.baseURL = 'https://localhost:7251/api';
// axios.defaults.baseURL = 'https://localhost:5001/api';
//set header 
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
const app = createApp(App)
app.use(router);

app.use(store);
app.use(VueSweetalert2);
//set golbal cho Swal 
window.Swal =  app.config.globalProperties.$swal
window.backendHost= 'https://localhost:7251'
// window.backendHost= 'https://localhost:5001'
axios.defaults.headers.common['Authorization'] = store.state.user.jwtToken;
app.mount('#app')
