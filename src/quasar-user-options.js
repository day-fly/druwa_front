
import './styles/quasar.sass'
import lang from 'quasar/lang/ko-KR.js'
import '@quasar/extras/material-icons/material-icons.css'
import { Loading, Notify } from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Loading, Notify
  },
  lang: lang
}