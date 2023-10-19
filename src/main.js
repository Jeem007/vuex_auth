import { createApp } from 'vue'
/*  Router */
import router from './router'
/* Tailwind CSS */
import './style.css'
/* Store */
import store from './store/store'
/* Prime Vue */
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import App from './App.vue'
const app = createApp(App);


app.use(router);
app.use(store);
/* Prime Vue */
app.use(PrimeVue);
/*  */
app.mount('#app');
