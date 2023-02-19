<template>
  <v-container style="height: 100vh" class="d-flex align-center">
    <v-row dense>
      <v-col cols="12">
        <h2>Добро пожаловать в кабинет, Елена Сергеевна</h2>
        <p>Выберите страницу что-бы продолжить.</p>
      </v-col>
      <v-col cols="12">
        <v-btn
          block
          color="primary"
          x-large
          outlined
          @click="$router.push('/debtors')"
        >
          Список всех должников <v-icon right>mdi-table</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn block outlined x-large @click="$router.push('/add-debtor')">
          Добавить нового должника
          <v-icon right>mdi-pencil-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  metaInfo: {
    title: 'Выберите страницу',
  },
  data: () => ({}),
}
</script>

<style lang="scss"></style>
