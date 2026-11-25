import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'

/** 라우터와 공통 스타일을 앱에 조립하는 Vue 시작점입니다. */
createApp(App).use(router).mount('#app')