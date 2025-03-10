<script setup>
import MovieItem from "@/MovieItem.vue";
import MovieForm from "@/MovieForm.vue";

import { computed, ref } from "vue";
import { items } from "./movies.json";

const movies = ref(items);

function updateRating(id, rating) {
  const movie = movies.value.find((movie) => movie.id === id);

  movie.rating = rating;
}

function removeMovie(id) {
  movies.value = movies.value.filter((movie) => id !== movie.id);
}

function editMovie(id) {
  showForm(id);
}

const form = ref({
  id: null,
  name: null,
  description: null,
  image: null,
  inTheaters: false,
  genres: null,
});

const validations = ref({
  name: "required",
  genres: "required",
});

const errors = ref({
  name: null,
  description: null,
  image: null,
  inTheaters: null,
  genres: null,
});

const validationRules = (rule) => {
  if (rule === "required") return /^ *$/;

  return null;
};

function validate(form) {
  let valid = true;
  clearErrors();
  for (const [field, rule] of Object.entries(validations)) {
    const validation = validationRules(rule);
    if (validation) {
      if (validation.test(form[field] || "")) {
        errors[field] = `${field} is ${rule}`;
        valid = false;
      }
    }
  }

  return valid;
}

function saveMovie(form) {
  if (form.value.id) {
    updateMovie(form);
  } else {
    addMovie(form);
  }
}

function updateMovie(form) {
  if (validate(form)) {
    const movie = {
      id: form.value.id,
      name: form.value.name,
      description: form.value.description,
      image: form.value.image,
      genres: form.value.genres,
      inTheaters: form.value.inTheaters,
      rating: 0,
    };

    movies.value = movies.value.map((m) => {
      if (m.id === movie.id) {
        movie.rating = m.rating;
        return movie;
      }
      return m;
    });

    hideForm();
  }
}

function addMovie(form) {
  if (validate(form)) {
    const movie = {
      id: Number(Date.now()),
      name: form.name,
      description: form.description,
      image: form.image,
      genres: form.genres,
      inTheaters: form.inTheaters,
      rating: 0,
    };
    movies.value.push(movie);
    hideForm();
  }
}

function cleanUpForm() {
  form.value.id = null;
  form.value.name = null;
  form.value.description = null;
  form.value.image = null;
  form.value.genres = null;
  form.value.inTheaters = false;
  clearErrors();
}

function clearErrors() {
  errors.value.name = null;
  errors.value.description = null;
  errors.value.image = null;
  errors.value.genres = null;
  errors.value.inTheaters = null;
}

const showMovieForm = ref(false);
const modelValue = ref({});

function hideForm() {
  showMovieForm.value = false;
  cleanUpForm();
}

function showForm(id = null) {
  showMovieForm.value = true;

  if (id) {
    modelValue.value = movies.value.find((movie) => movie.id === id);
  }
}

const averageRating = computed(() => {
  const avg = movies.value
    .map((movie) => parseInt(movie.rating || 0))
    .reduce((a, b) => a + b, 0);

  return Number(avg / movies.value.length).toFixed(1);
});

const totalMovies = computed(() => {
  return movies.value.length;
});

function removeRatings() {
  movies.value = movies.value.map((movie) => {
    movie.rating = 0;
    return movie;
  });
}
</script>

<template>
  <div class="app">
    <div v-if="showMovieForm" class="modal-wrapper">
      <div class="modal-wrapper-inner">
        <MovieForm
          :modelValue
          @cancel="hideForm"
          @update:modelValue="saveMovie"
        />
      </div>
    </div>
    <div class="movie-actions-list-wrapper">
      <div class="movie-actions-list-info">
        <span>Total Movies: {{ totalMovies }}</span>
        <span> / </span>
        <span>Average Rating: {{ averageRating }}</span>
      </div>
      <div class="flex-spacer"></div>
      <div class="movie-actions-list-actions">
        <button
          class="self-end movie-actions-list-action-button button-primary justify-self-end"
          @click="removeRatings"
        >
          Remove Ratings
        </button>
        <button
          class="movie-actions-list-action-button"
          :class="{
            'button-primary': !showMovieForm,
            'button-disabled': showMovieForm,
          }"
          @click="showForm"
          :disabled="showMovieForm"
        >
          Add Movie
        </button>
      </div>
    </div>
    <div class="movie-list">
      <div class="movie-item group" v-for="movie in movies" :key="movie.id">
        <MovieItem
          :movie
          @edit="editMovie"
          @remove="removeMovie"
          @update:rating="updateRating"
        />
      </div>
    </div>
  </div>
</template>
