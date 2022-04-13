import Vuex from "vuex"
import axios from "axios"

export default new Vuex.Store({
  state: {
    characters: [],
    busy: false,
    error: ""
  },
  getters: {
    allCharacters: (state) => {
      return state.characters
    }
  },
  mutations: {
    SET_CHARACTERS(state, characters) {
      state.characters = characters
    }
  },
  actions: {
    async getData({ commit }) {
      try {
        const url = "https://swapi.dev/api/people"
        const result = await axios.get(url)
        this.characters = result.data.results
        const planetEndpoints = this.characters.map(({ homeworld }) =>
          axios.get(homeworld)
        )
        const planets = await Promise.all(planetEndpoints)
        this.characters = this.characters.map((character, index) => ({
          ...character,
          homeworld: planets[index].data
        }))
        commit("SET_CHARACTERS", this.characters)
        return true
      } catch {
        this.error = "failed to load characters"
      } finally {
        this.busy = false
      }
    }
  }
})
