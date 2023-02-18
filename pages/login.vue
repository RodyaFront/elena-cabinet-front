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
          hide-details
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
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn block color="primary" x-large @click="login"
          >Войти в базу данных</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: null,
    password: null,
    showPassword: false,
  }),
  methods: {
    login() {
      if (
        String(this.name).toLowerCase() === 'elena serhiivna' &&
        String(this.password) === '8098'
      ) {
        window.localStorage.setItem(
          'token',
          'auth-token-o4j1h24p98yuandjas89eu124'
        )
        this.$router.push('/')
      }
    },
  },
}
</script>
