<template>
  <v-container style="height: calc(100vh - 56px)" class="d-flex align-center">
    <v-row>
      <v-col cols="12">
        <h2>Добавим нового должника</h2>
        <p class="ma-0">
          Заполните поля и нажмите "Добавить", что бы продолжить.
        </p>
      </v-col>
      <v-col cols="=12">
        <p>1. Введите имя человека.</p>
        <v-text-field
          v-model="name"
          outlined
          label="Имя"
          hide-details="auto"
          :error-messages="nameError"
          :error="!!nameError"
          placeholder="Введите имя"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <p>2. Введите долг человека. Можно оставить пустым.</p>
        <v-row dense>
          <v-col cols="8">
            <v-text-field
              v-model="debt.whole"
              outlined
              label="Гривен"
              type="number"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="debt.cents"
              outlined
              type="number"
              label="Копеек"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-btn
          x-large
          block
          color="primary"
          :loading="loadings.saving"
          @click="handleSaveNewDebtor"
          >Добавить в базу</v-btn
        >
      </v-col>
    </v-row>
    <v-dialog v-model="successDialogModel">
      <v-card rounded="xl" class="text-center">
        <v-card-title class="d-flex justify-center pt-4 pb-0">
          <div style="max-width: 120px">
            <success-svg />
          </div>
        </v-card-title>
        <v-card-title class="pt-0 justify-center">
          Готово! Создание прошло успешно.
        </v-card-title>
        <v-card-text>
          Новый пользователь под именем <b>{{ name }}</b> успешно добавлен в
          базу.
        </v-card-text>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-btn
                block
                x-large
                color="primary"
                @click="$router.push('/debtors')"
              >
                К списку всех должников
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn
                block
                x-large
                outlined
                color="primary"
                @click="handleClearForm"
              >
                Добавить еще одного человека
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import SuccessSvg from '@/components/icons/SuccessSvg.vue'

export default {
  components: { SuccessSvg },
  data: () => ({
    name: '',
    successDialogModel: false,
    loadings: {
      saving: false,
    },
    debt: {
      whole: null,
      cents: null,
    },
    nameError: null,
  }),
  methods: {
    handleClearForm() {
      this.clearForm()
      this.successDialogModel = false
    },
    clearForm() {
      this.name = null
      this.nameError = null
      this.debt = {
        whole: null,
        cents: null,
      }
    },
    validate() {
      let errors = 0
      if (!this.name) {
        console.log(this.name)
        this.nameError = 'Это обязательное поле'
        errors++
      }

      return errors !== 0
    },
    async handleSaveNewDebtor() {
      try {
        const url = this.$store.getters['serverUrl'] + '/debtor/create'

        if (this.validate()) return

        const payload = {
          name: this.name,
          debt: Number(this.debt.whole) * 100 + Number(this.debt.cents),
        }

        this.loadings.saving = true

        const resp = await this.$axios.post(url, payload)

        if (resp && resp.data && resp.status) {
          this.successDialogModel = true
        }

        this.loadings.saving = false
      } catch (e) {
        this.loadings.saving = false
      }
    },
  },
}
</script>
