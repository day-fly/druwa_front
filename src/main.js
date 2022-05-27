import { createApp } from 'vue'
import { router } from './js/router'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import {staticVal} from "@/js/static";

const app = createApp(App)

app.use(router).use(router).use(Quasar, quasarUserOptions)
app.config.globalProperties.$static = staticVal
app.mount('#app')
