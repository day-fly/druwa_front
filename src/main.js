import { createApp } from 'vue'
import { router } from './js/router'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

createApp(App).use(router).use(Quasar, quasarUserOptions).mount('#app')
