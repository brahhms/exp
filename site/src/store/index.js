import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    departamentos: [],
    municipios: [],
    expedientes:[],

    expediente: {
      no: null,
      fecha: null,
      paciente: {
        nombre: null,
        apellido: null,
        sexo: null,
        nacimiento: null,
        direccion: null,
        email: null
      },
      familiares: [
        {
          nombre: null,
          telefono: null
        }
      ]
    }

  },
  mutations: {
    setExpediente(state, expediente) {
      state.expediente = expediente;
    },
    setExpedientes(state, expedientes) {
      state.expedientes = expedientes;
    }
  },
  actions: {
    async saveExpediente({ state }) {
      let nuevo = { ...state.expediente };
      if (nuevo._id == undefined) {
        console.log(nuevo);
        let res = await axios.post('/expedientes', nuevo);
        if (res.data.ok) {
          location.reload();
          console.log("ok");
        }
      }
    },
    async searchExpedientes({ commit }, v) {
      const res = await axios.get('/expedientes?q=' + v);
      console.log('?q=' + v);
      if (res.statusText == 'OK') {
        commit('setExpedientes', res.data);
      } else {
        commit('setExpedientes', []);
      }
    },
  },
  modules: {
  }
})
