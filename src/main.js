import {createApp} from 'vue'
import App from "@/App";
import router from './router/NavRouter'

createApp(App).use(router).mount('#app')