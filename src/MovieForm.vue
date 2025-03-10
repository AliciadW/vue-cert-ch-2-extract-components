<script setup></script>

<template>
  <form @submit.prevent="saveMovie">
    <div class="movie-form-input-wrapper">
      <label for="name">Name</label>
      <input
        type="text"
        name="name"
        v-model="form.name"
        class="movie-form-input"
      />
      <span class="movie-form-error">{{ errors.name }}</span>
    </div>
    <div class="movie-form-input-wrapper">
      <label for="description">Description</label>
      <textarea
        type="text"
        name="description"
        v-model="form.description"
        class="movie-form-textarea"
      />
      <span class="movie-form-error">{{ errors.description }}</span>
    </div>
    <div class="movie-form-input-wrapper">
      <label for="image">Image</label>
      <input
        type="text"
        name="image"
        v-model="form.image"
        class="movie-form-input"
      />
      <span class="movie-form-error">{{ errors.image }}</span>
    </div>
    <div class="movie-form-input-wrapper">
      <label for="genre">Genres</label>
      <select
        name="genre"
        v-model="form.genres"
        class="movie-form-input"
        multiple
      >
        <option
          v-for="option in genres"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <span class="movie-form-error">
        {{ errors.genres }}
      </span>
    </div>
    <div class="movie-form-input-wrapper">
      <label for="genre" class="movie-form-checkbox-label">
        <input
          type="checkbox"
          v-model="form.inTheaters"
          :true-value="true"
          :false-value="false"
          class="movie-form-checkbox"
        />
        <span>In theaters</span>
      </label>
      <span class="movie-form-error">
        {{ errors.inTheaters }}
      </span>
    </div>
    <div class="movie-form-actions-wrapper">
      <button type="button" class="button" @click="hideForm">Cancel</button>

      <button type="submit" class="button-primary">
        <span v-if="form.id">Update</span>
        <span v-else>Create</span>
      </button>
    </div>
  </form>
</template>
