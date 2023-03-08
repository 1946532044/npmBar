export default {
  namespaced: true,
  state: {
    menuArr: [],
    breadNavigation: [],
    menuIsFold: true
  },
  mutations: {
    SET_MENU_ARR (state, val) {
      state.menuArr = val
    },
    SET_BREAD_NAVIGATION (state, val) {
      state.breadNavigation = val
    },
    SET_MENU_IS_FOLF (state, val) {
      state.menuIsFold = val
    }
  }
}