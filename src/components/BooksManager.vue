<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Zarządzanie ogłoszeniami</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tytuł</th>
              <th>Preferowany Tytuł</th>
              <th>Dodano o</th>
              <th>Opis</th>
              <th>Gatunek</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.titleWant }}</td>
              <td>{{ book.updatedAt }}</td>
              <td>{{ book.body }}</td>
              <td>{{ book.category }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateBookToEdit(book)">Edytuj</a> - 
                <a href="#" @click.prevent="deleteBook(book.id)">Usuń</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edytuj książkę ID#' + model.id : 'Nowa książka')">
          <form @submit.prevent="saveBook">
            <b-form-group label="Tytuł twojej książki">
              <b-form-input type="text" v-model="model.title"></b-form-input>
            </b-form-group>
            <b-form-group label="Preferowany tytuł">
              <b-form-input type="text" v-model="model.titleWant"></b-form-input>
            </b-form-group>
            <b-form-group label="Kategoria twojej książki">
              <b-form-select v-model="model.category" :options="options" class="mb-3" />
            </b-form-group>
            <b-form-group label="Opis twojej książki">
              <b-form-textarea rows="4" v-model="model.body"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Dodaj książkę</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      books: [],
      model: {},
      options: [
        {value: 'Fantasy', text: 'Fantasy'},
        {value: 'Dramat', text: 'Dramat'}
      ]
    }
  },
  async created () {
    this.refreshBooks()
  },
  methods: {
    async refreshBooks () {
      this.loading = true
      this.books = await api.getBooks()
      this.loading = false
    },
    async populatBookToEdit (book) {
      this.model = Object.assign({}, book)
    },
    async saveBook () {
      if (this.model.id) {
        await api.updateBook(this.model.id, this.model)
      } else {
        await api.createBook(this.model)
      }
      this.model = {} // reset form
      await this.refreshBooks()
    },
    async deleteBook (id) {
      if (confirm('Na pewno chcesz usunąć?')) {
        // if we are editing a post we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteBook(id)
        await this.refreshBooks()
      }
    }
  }
}
</script>