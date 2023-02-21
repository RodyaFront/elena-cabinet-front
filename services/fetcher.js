import Cookie from 'cookie'
import axios from 'axios'

const local = true

class Service {
  serverUrl = local
    ? 'http://localhost:3001/api'
    : 'https://elena-cabinet-app.herokuapp.com/api'
  serverClearUrl = 'https://elena-cabinet-app.herokuapp.com/'

  async auth(url, { commit }, formData) {
    try {
      const response = await axios.post(this.serverClearUrl + url, formData)
      if (response.status === 200) {
        return response.data
      }
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }

  async post(url, formData, { commit }, configs = {}) {
    try {
      const config = this.generateConfigs(configs)
      const response = await axios.post(this.serverUrl + url, formData, config)
      if (response.status === 200) {
        return response.data
      }
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
  async put(url, formData, { commit }, configs = {}) {
    try {
      const config = this.generateConfigs(configs)
      const response = await axios.put(this.serverUrl + url, formData, config)
      if (response.status === 200) {
        return response.data
      }
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }

  async get(url, { commit }, configs = {}) {
    try {
      const config = this.generateConfigs(configs)
      const response = await axios.get(this.serverUrl + url, config)
      if (response.status === 200) {
        return response.data
      }
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }

  async delete(url, { commit }, configs = {}) {
    try {
      const config = this.generateConfigs(configs)
      const response = await axios.delete(this.serverUrl + url, config)
      if (response.status === 200) {
        return response.data
      }
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }

  generateConfigs(configs, isAuth = true) {
    return {
      headers: isAuth ? this.authHeaders() : this.authHeaders,
      ...configs,
    }
  }

  authHeaders() {
    const token = this.getCookieToken()
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }

  getCookieToken() {
    const cookieStr = document.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    return cookies['jwt-token']
  }

  noAuthorizationHeaders() {
    return { 'Content-Type': 'application/json' }
  }
}

export default new Service()
