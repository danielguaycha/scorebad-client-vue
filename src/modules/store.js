import Vue from 'vue'
import Vuex from 'vuex'
import {scoreService} from "@/modules/home/services/scoreService";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    setItems (state, list) {
      state.items = list;
    }
  },
  actions: {
    reloadItems(state) {
      scoreService.getAll().then(res => {
        state.items = res;
      })
    }
  },
  getters: {
    getItems(state) {
      if (state.items.length <=0) {
        this.state.commit("reloadItems");
      }
      return state.items;
    }
  }
})
