import jwt from 'jsonwebtoken'

export const state = () => ({
  $user: null,
  $token: null,
})
export const mutations = {
  setUser(state, payload) {
    state.$user = payload
  },
  setToken(state, payload) {
    state.$token = payload
  },
}
export const actions = {
  setTokenToCookie(ctx, token) {
    const decodedToken = jwt.decode(token)
    const expiresInSeconds = decodedToken.exp

    const expireDate = new Date(expiresInSeconds * 1000)

    document.cookie = `jwt-token=${token}; expires=${expireDate.toUTCString()}; path=/`

    return true
  },
  logout() {
    document.cookie =
      'jwt-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  },
}
export const getters = {}
