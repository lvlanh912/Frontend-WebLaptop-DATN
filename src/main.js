import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App)

app.use(router)
app.use(VueSweetalert2);
window.Swal =  app.config.globalProperties.$swal;
//set golbal cho Swal 
app.mount('#app')
