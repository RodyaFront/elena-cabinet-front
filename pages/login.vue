<template>
  <v-container style="height: 100vh" class="d-flex align-center">
    <v-row>
      <v-col cols="12">
        <h2>Кабинет должников</h2>
        <p class="ma-0">Введите данные для входа в базу данных.</p>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          placeholder="Введите ваше имя"
          label="Имя"
          outlined
          :error="!!error"
          hide-details
          @change="error = null"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="showPassword = !showPassword"
          label="Пароль"
          outlined
          :error="!!error"
          hide-details
          @change="error = null"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn block color="primary" x-large @click="login" :loading="loading"
          >Войти в базу данных</v-btn
        >
        <div v-if="error" class="mt-2 error--text">{{ error }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import fetcher from '@/services/fetcher'

export default {
  layout: 'auth',
  data: () => ({
    name: 'elena hordiienko',
    password: '8098',
    showPassword: false,
    loading: false,
    error: null,
  }),
  methods: {
    async login() {
      try {
        const url = '/auth/login'

        const payload = {
          name: this.name,
          password: this.password,
        }

        this.loading = true

        const resp = await fetcher.post(url, payload, this.$store)

        if (resp && resp.token) {
          if (await this.$store.dispatch('user/setTokenToCookie', resp.token)) {
            this.$router.push('/')
          }
        }

        this.loading = false
      } catch (e) {
        console.error(e)
        this.error = 'Имя или пароль введены не верно.'
        this.loading = false
      }
    },
  },
}
</script>
