<template>
  <v-app>
    <v-app-bar dark hide-on-scroll>
      <v-row dense class="d-flex align-center">
        <v-col class="nowrap">Кабинет Должников</v-col>
        <v-spacer />
        <v-col class="d-flex justify-end">
          <template v-if="$route.fullPath === '/'">
            <v-btn @click="logout" text>
              Выход
              <v-icon right>mdi-logout</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-btn @click="$router.go(-1)" text>
              Назад
              <v-icon right>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default {
  name: 'defaultLayout',
  middleware: 'auth',
  components: {
    Toast,
  },
  data: () => ({}),
  computed: {
    getError() {
      return this.$store.getters.error
    },
  },
  watch: {
    getError(e) {
      if (!e) return

      if (e.response.status === 403) {
        this.$toast.error(
          'Вам нужно по новой зайти в приложение и ввести Имя и Пароль.'
        )
        return this.$router.push('/login')
      }
      this.$toast.error(e.message)
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss">
/* Define new values for app-bar */
$v-app-bar-height: 56px;
$v-app-bar-background-color: #2196f3;
$v-app-bar-color: #fff;

/* Override default styles of app-bar */
.v-app-bar {
  height: $v-app-bar-height;
  background-color: $v-app-bar-background-color;
  color: $v-app-bar-color;
  max-height: $v-app-bar-height !important;
  /* Add more custom styles here */

  /* Target elements inside app-bar */
  &__title {
    font-size: 24px;
    font-weight: bold;
  }

  &__nav-icon {
    color: $v-app-bar-color;
    font-size: 30px;
  }

  &__items {
    margin-top: 10px;
    a {
      color: $v-app-bar-color;
      &:hover {
        color: darken($v-app-bar-color, 10%);
      }
    }
  }
}
</style>
