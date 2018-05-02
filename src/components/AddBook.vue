<template>
  <form @submit.prevent="saveBook">
    <b-container>
      <b-col md="auto">
        <b-form-group label="Tytuł twojej książki">
          <b-form-input type="text" v-model="model.title"></b-form-input>
        </b-form-group>
        <b-form-group label="Preferowany tytuł książki">
          <b-form-input type="text" v-model="model.titleWant"></b-form-input>
        </b-form-group>
        <b-form-group label="Kategoria twojej książki">
          <b-form-select v-model="model.category" :options="options" class="mb-3" />
        </b-form-group>
        <b-form-group label="Preferowana kategoria książki">
          <b-form-select v-model="model.categoryWant" :options="options" class="mb-3" />
        </b-form-group>
        <b-form-group label="Opis twojej książki">
          <b-form-textarea rows="4" v-model="model.body"></b-form-textarea>
        </b-form-group>
        <b-form-group label="Numer telefonu">
          <b-form-input maxlength="9" type="text" v-model="model.phoneNumber"></b-form-input>
        </b-form-group>
        <div>
          <b-btn type="submit" variant="success">Dodaj książkę</b-btn>
        </div>
      </b-col>
    </b-container>
  </form>
</template>

<script>
import api from '@/api'

export default {
  data () {
    return {
      loading: false,
      posts: [],
      model: {},
      options: [
        {value: null, text: 'Wybierz kategorię'},
        {value: 'Biografia', text: 'Biografia'},
        {value: 'Fantasy', text: 'Fantasy'},
        {value: 'Dramat', text: 'Dramat'},
        {value: 'Horror', text: 'Horror'},
        {value: 'Przygodowa', text: 'Przygodowa'},
        {value: 'Literatura piękna', text: 'Literatura piękna'},
        {value: 'Popularnonaukowa', text: 'Popularnonaukowa'},
        {value: 'Baśnie', text: 'Baśnie'}
      ]
    }
  },
  methods: {
    saveBook () {
      api.createBook(this.model)
    }
  }

}
</script>