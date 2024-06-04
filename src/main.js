import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import HighchartsVue from 'highcharts-vue'

import store from './store'
import MazBtn from 'maz-ui/components/MazBtn'
import MazInput from 'maz-ui/components/MazInput'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import MazSelect from 'maz-ui/components/MazSelect'
import MazAvatar from 'maz-ui/components/MazAvatar'
import MazTextarea from 'maz-ui/components/MazTextarea'
import MazSwitch from 'maz-ui/components/MazSwitch'
 import MazDropdown from 'maz-ui/components/MazDropdown'
 import MazInputPrice from 'maz-ui/components/MazInputPrice'
 import MazInputTags from 'maz-ui/components/MazInputTags'
 import MazCheckbox from 'maz-ui/components/MazCheckbox'
 import MazAccordion from 'maz-ui/components/MazAccordion'

import 'maz-ui/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'



import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  })
app.component('MazBtn', MazBtn)
app.component('MazInput', MazInput)
app.component('MazPhoneNumberInput', MazPhoneNumberInput)
app.component('MazSelect', MazSelect)
app.component('MazAvatar', MazAvatar)
app.component('MazTextarea', MazTextarea)
app.component('MazSwitch', MazSwitch)
app.component('MazDropdown', MazDropdown)
app.component('MazInputPrice', MazInputPrice)
app.component('MazInputTags', MazInputTags)
app.component('MazCheckbox', MazCheckbox)
app.component('MazAccordion', MazAccordion)




store.dispatch('user/loadLoggedInUser').then(() => {
    app.use(HighchartsVue)
    app.use(store);
    app.use(vuetify);
    app.use(router)
    app.mount('#app')

});