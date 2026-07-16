import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/variables.css'
import './assets/styles/base.css'
import './assets/styles/layout.css'
import './assets/styles/components.css'
import './assets/styles/textures.css'
import { initScrollAnimations } from './utils/animations'

const app = createApp(App)
app.use(router)

// 路由切换后重新扫描滚动动画元素
router.afterEach(() => {
  setTimeout(initScrollAnimations, 100)
})

app.mount('#app')
// 首次加载也触发
setTimeout(initScrollAnimations, 300)
