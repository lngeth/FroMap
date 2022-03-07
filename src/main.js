import {createApp} from 'vue'
import App from "@/App";
import router from './router/NavRouter'
// eslint-disable-next-line no-unused-vars
import { firebaseApp } from '@/firebase-config'

const app = createApp(App)
app.use(router)
app.mount('#app')