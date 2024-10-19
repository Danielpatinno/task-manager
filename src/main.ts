import './style.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify'
import 'vuetify/styles' 

const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
    },
  })

const app = createApp(App);

const queryClient = new QueryClient();
const pinia = createPinia()



app.use(router);

app.use(pinia)

app.use(VueQueryPlugin, {queryClient });

app.use(vuetify)
app.mount('#app');

