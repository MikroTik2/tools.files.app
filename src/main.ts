import '@/assets/main.scss';
import '@/assets/base.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/routes';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app');