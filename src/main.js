/*
  MIT No Attribution

  Copyright <YEAR> <COPYRIGHT HOLDER>

  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import { store } from './store'
import messages from './languages/translations.json'

import IoT from '@/components/IoT'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { appConfig } from './config'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faImages, faGlobe, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { getLanguageList } from './languages/languageLookup'

import SocialSharing from 'vue-social-sharing'
Vue.use(SocialSharing)

Vue.use(BootstrapVue)
Vue.use(VueI18n)
Vue.config.lang = 'en'
Vue.component('iot', IoT)

// Font-awesome library
library.add(faImages, faGlobe, faArrowCircleLeft)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Internationalization
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

// This is workshop-specific because the user can change the languages file
Vue.prototype.$languages = getLanguageList(messages)

// Turn off production tip in console
Vue.config.productionTip = false

// Custom settings for app
Vue.prototype.$appConfig = appConfig

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
})
