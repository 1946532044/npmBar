import Vue from 'vue'
import Vuex from 'vuex'
import baseMain from './modules/baseMain'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    baseMain,
  },
  mutations: {
  },
  getters: {
  },
  actions: {

  }
})

export default store
