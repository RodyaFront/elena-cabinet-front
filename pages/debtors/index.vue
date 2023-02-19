<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Список всех должников</h2>
        <p class="ma-0">
          Управляйте долгами людей или добавьте нового должника.
        </p>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="search"
          hide-details
          outlined
          label="Поиск в таблице по имени"
          append-icon="mdi-magnify"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :search="search"
          :headers="columns"
          :items="rows"
          :items-per-page="50"
          :loading="loadings.table"
          :footer-props="defaultFooterProps"
        >
          <template #[`item.createdAt`]="{ value }">
            {{ $moment(value).calendar() }}
          </template>
          <template #[`item.updatedAt`]="{ value }">
            {{ $moment(value).calendar() }}
          </template>
          <template #[`item.debt`]="{ item }">
            {{ item.debt / 100 }} грн
            <v-btn icon large @click="handleChangeDebt(item)">
              <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="debtChangeDialogModel" persistent>
      <v-card rounded="xl">
        <v-card-title class="d-flex pb-0">
          <v-spacer />
          <v-chip color="error" outlined @click="debtChangeDialogModel = false"
            >Закрыть <v-icon right>mdi-close</v-icon></v-chip
          >
        </v-card-title>
        <v-card-title class="pt-0"> Изменить долг </v-card-title>
        <v-card-text>Введите новое значение</v-card-text>
        <v-card-text>
          <v-row dense>
            <v-col cols="8">
              <v-text-field
                v-model="debtForm.whole"
                outlined
                label="Гривен"
                type="number"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="debtForm.cents"
                outlined
                type="number"
                label="Копеек"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-btn
            color="primary"
            :loading="loadings.savingNewDebt"
            block
            x-large
            @click="handleSaveNewDebt"
          >
            Сохранить
          </v-btn>
        </v-card-text>
        <v-card-text>
          <div class="text-center">ИЛИ</div>
        </v-card-text>
        <v-card-title> Приплюсуйте к существующему долгу </v-card-title>
        <v-card-text>
          Введите сколько хотите приплюсовать к существующему долгу
          {{ debtForm.debtor }}
        </v-card-text>
        <v-card-text>
          <v-row dense>
            <v-col cols="8">
              <v-text-field
                v-model="debtForm.plus.whole"
                outlined
                type="number"
                label="Гривен"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="debtForm.plus.cents"
                outlined
                type="number"
                label="Копеек"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-btn
            color="primary"
            :loading="loadings.savingPlusDebt"
            outlined
            block
            x-large
            @click="handlePlusNewDebt"
          >
            Приплюсовать
            <v-icon right>mdi-plus</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { DEFAULT_FOOTER_PROPS } from '@/utils/defaultData'

export default {
  data: () => ({
    defaultFooterProps: DEFAULT_FOOTER_PROPS,
    search: null,
    columns: [
      {
        text: 'Имя',
        value: 'name',
      },
      {
        text: 'Долг',
        value: 'debt',
      },
      {
        text: 'Добавлен',
        value: 'createdAt',
      },
      {
        text: 'Обновлен',
        value: 'updatedAt',
      },
    ],
    rows: [],
    debtForm: {
      debtor: null,
      debtorId: null,
      whole: null,
      cents: null,
      plus: {
        whole: null,
        cents: null,
      },
      debtorData: null,
    },
    loadings: {
      table: false,
      savingNewDebt: false,
      savingPlusDebt: false,
    },
    debtChangeDialogModel: false,
  }),
  created() {
    this.fetchDebtors()
  },
  computed: {},
  methods: {
    async handleSaveNewDebt() {
      try {
        const url =
          this.$store.getters['serverUrl'] + '/debtor/' + this.debtForm.debtorId

        this.loadings.savingNewDebt = true

        const debt =
          Number(this.debtForm.whole) * 100 + Number(this.debtForm.cents)

        const payload = {
          debt,
        }

        const resp = await this.$axios.put(url, payload)

        this.loadings.savingNewDebt = false

        if (resp && resp.data && resp.status) {
          this.debtChangeDialogModel = false
          this.fetchDebtors()
        }
      } catch {
        this.loadings.savingNewDebt = false
      }
    },
    resetDebtorsForm() {
      this.debtForm.plus = {
        whole: null,
        cents: null,
      }
    },
    async handlePlusNewDebt() {
      try {
        const url =
          this.$store.getters['serverUrl'] + '/debtor/' + this.debtForm.debtorId

        this.loadings.savingPlusDebt = true

        const debt =
          Number(this.debtForm.debtorData.debt) +
          Number(this.debtForm.plus.whole) * 100 +
          Number(this.debtForm.plus.cents)

        const payload = {
          debt,
        }

        const resp = await this.$axios.put(url, payload)

        this.loadings.savingPlusDebt = false

        if (resp && resp.data && resp.status) {
          this.debtChangeDialogModel = false
          this.resetDebtorsForm()
          this.fetchDebtors()
        }
      } catch {
        this.loadings.savingPlusDebt = false
      }
    },
    handleChangeDebt(item) {
      const total = item.debt

      this.debtForm.whole = Math.floor(total / 100)
      this.debtForm.cents = total % 100
      this.debtForm.debtor = item.name
      this.debtForm.debtorId = item.id
      this.debtForm.debtorData = item

      this.debtChangeDialogModel = true
    },
    async fetchDebtors() {
      try {
        const url = this.$store.getters['serverUrl'] + '/debtor'

        this.loadings.table = true

        this.rows = []

        const resp = await this.$axios.get(url)

        this.loadings.table = false

        if (resp && resp.data) this.rows = resp.data.debtors
      } catch {
        this.loadings.table = false
      }
    },
  },
}
</script>
