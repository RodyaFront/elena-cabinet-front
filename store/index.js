export const state = () => ({
  serverUrl: 'https://elena-cabinet-app.herokuapp.com/api',
  localhost: true,
})
export const mutations = {}
export const actions = {}
export const getters = {
  serverUrl: (state) =>
    state.localhost ? 'http://localhost:3001/api' : state.serverUrl,
}
