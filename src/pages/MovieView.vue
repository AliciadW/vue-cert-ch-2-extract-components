<script setup>
import { onMounted, ref } from "vue";
import { items } from "../movies.json";
import { useRoute } from "vue-router";

const route = useRoute();

const movie = ref();

onMounted(() => {
  movie.value = items.find((movie) => movie.id === parseInt(route.params.id));
});
</script>

<template>
  <div v-if="movie" class="grid grid-cols-2 gap-4 text-white">
    <div class="justify-self-center">
      <img :src="movie.image" class="movie-item-image rounded-md" alt="" />
    </div>
    <div class="details">
      <p class="text-2xl font-medium">{{ movie.name }}</p>
      <div class="movie-item-genres-wrapper my-3">
        <span
          v-for="genre in movie.genres"
          :key="`${movie.id}-${genre}`"
          class="movie-item-genre-tag"
          >{{ genre }}</span
        >
      </div>
      <div class="movie-item-description-wrapper">
        <p class="movie-item-description">{{ movie.description }}</p>
      </div>
    </div>
  </div>
</template>
