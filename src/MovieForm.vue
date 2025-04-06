<script setup>
import { ref, useTemplateRef, onMounted } from "vue";

const props = defineProps(["modelValue"]);
const emits = defineEmits(["update:modelValue", "cancel"]);

const form = ref({ ...props.modelValue });

const genres = ref([
  { text: "Drama", value: "Drama" },
  { text: "Crime", value: "Crime" },
  { text: "Action", value: "Action" },
  { text: "Comedy", value: "Comedy" },
]);

const errors = ref({
  name: null,
  description: null,
  image: null,
  inTheaters: null,
  genres: null,
});

const validations = ref({
  name: "required",
  genres: "required",
});

const nameInput = useTemplateRef("name-input");

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

const cancelAction = () => {
  cleanUpForm();

  emits("cancel");
};

const saveMovie = () => {
  if (validate()) {
    const data = {
      id: form.value.id || Number(Date.now()),
      name: form.value.name,
      description: form.value.description,
      image: form.value.image,
      genres: form.value.genres,
      inTheaters: form.value.inTheaters,
      rating: form.value.rating,
    };

    emits("update:modelValue", data);
  }
};

onMounted(() => {
  nameInput.value.focus();
});
</script>

<template>
  <form @submit.prevent="saveMovie">
    <div class="movie-form-input-wrapper">
      <label for="name">Name</label>
      <input
        ref="name-input"
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
      <button type="button" class="button" @click="cancelAction">Cancel</button>

      <button type="submit" class="button-primary">
        <span v-if="form.id">Update</span>
        <span v-else>Create</span>
      </button>
    </div>
  </form>
</template>
