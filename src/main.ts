import './main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router.ts'
import VueDatGui from "@cyrilf/vue-dat-gui"
import "@cyrilf/vue-dat-gui/dist/style.css"

const app = createApp(App)
app.use(VueDatGui)

app.use(router)

app.mount('#app')
