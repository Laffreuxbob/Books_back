import { createApp } from 'vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';

import router from './router/router'

// App.use(BootstrapVue)
// App.use(IconsPlugin)
createApp(App)
    .use(router)
    .mount('#app')
