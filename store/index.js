export const state = () => ({
  serverUrl: 'https://elena-cabinet-app.herokuapp.com/api',
  localhost: true,
  error: null,
})
export const mutations = {
  setError(state, payload) {
    state.error = payload
  },
}
export const actions = {}
export const getters = {
  serverUrl: (state) =>
    state.localhost ? 'http://localhost:3001/api' : state.serverUrl,
  error: (state) => state.error,
}
