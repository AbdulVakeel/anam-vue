import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/index.css'
import screenPlugin from './plugins/screen'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)

// ✅ Pinia setup
const pinia = createPinia()
app.use(pinia)

// Theme setup
const theme = localStorage.getItem('theme')
if (theme === 'dark') {
  document.documentElement.classList.add('dark')
}
app.use(VueApexCharts)
app.use(screenPlugin)
app.use(router).mount('#app')
