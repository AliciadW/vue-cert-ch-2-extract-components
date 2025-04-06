<script setup>
import MovieItem from "@/MovieItem.vue";

// async components
const AppModal = defineAsyncComponent(() => import("@/AppModal.vue"));
const MovieForm = defineAsyncComponent(() => import("@/MovieForm.vue"));

import { computed, defineAsyncComponent, ref } from "vue";
import { items } from "./movies.json";

const movies = ref(items);
const currentMovie = ref();

function updateRating(id, rating) {
  const movie = movies.value.find((movie) => movie.id === id);

  movie.rating = rating;
}

function removeMovie(id) {
  movies.value = movies.value.filter((movie) => id !== movie.id);
}

function editMovie(id) {
  currentMovie.value = movies.value.find((movie) => movie.id === id);

  showForm();
}

function saveMovie(form) {
  const existingMovie = movies.value.find((movie) => movie.id === form.id);
  if (existingMovie) {
    updateMovie(form);
  } else {
    addMovie(form);
  }
}

function updateMovie(movie) {
  movies.value = movies.value.map((m) => {
    if (m.id === movie.id) {
      movie.rating = m.rating;
      return movie;
    }
    return m;
  });

  hideForm();
}

function addMovie(movie) {
  movies.value.push(movie);

  hideForm();
}

const showMovieForm = ref(false);

function hideForm() {
  showMovieForm.value = false;
  currentMovie.value = null;
}

function showForm() {
  showMovieForm.value = true;
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
    <AppModal
      :show="showMovieForm"
      :title="currentMovie ? 'Update movie' : 'Add movie'"
      @close="hideForm"
    >
      <MovieForm
        :modelValue="currentMovie"
        @cancel="hideForm"
        @update:modelValue="saveMovie"
      />
    </AppModal>

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
