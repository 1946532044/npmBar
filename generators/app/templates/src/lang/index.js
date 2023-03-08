import Vue from 'vue';
import VueI18n from 'vue-i18n';
import loginEn from './login/loginEn.js'
import loginZn from './login/loginZn.js'

Vue.use(VueI18n);

const messages = {
  en: {
    ...loginZn,

  },
  ja: {
    ...loginEn,
  }
}
let locale = window.localStorage.locale = window.localStorage.locale || 'en'
export const i18n = new VueI18n({
  locale, // set locale
  messages, // set locale messages
})