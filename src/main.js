import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import store from './store'
import MazBtn from 'maz-ui/components/MazBtn'
import MazInput from 'maz-ui/components/MazInput'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import MazSelect from 'maz-ui/components/MazSelect'
import MazAvatar from 'maz-ui/components/MazAvatar'
import MazTextarea from 'maz-ui/components/MazTextarea'
import MazSwitch from 'maz-ui/components/MazSwitch'
 import MazDropdown from 'maz-ui/components/MazDropdown'
import 'maz-ui/styles'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('MazBtn', MazBtn)
app.component('MazInput', MazInput)
app.component('MazPhoneNumberInput', MazPhoneNumberInput)
app.component('MazSelect', MazSelect)
app.component('MazAvatar', MazAvatar)
app.component('MazTextarea', MazTextarea)
app.component('MazSwitch', MazSwitch)
app.component('MazDropdown', MazDropdown)


store.dispatch('user/loadLoggedInUser').then(() => {
    app.use(store);
    app.use(router)
    app.mount('#app')

});