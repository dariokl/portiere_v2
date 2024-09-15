import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
  createVuestic({
    config: {
      colors: {
        presets: {
          light: {
            primary: '#059669',
            danger: '#ef4444'
          }
        }
      }
    }
  })
)
app.mount('#app')
