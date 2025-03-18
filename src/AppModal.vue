<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";

defineProps({ title: { type: [String, null], default: null } });
defineEmits(["close"]);
</script>

<template>
  <div class="modal-wrapper">
    <div class="modal-wrapper-inner">
      <div class="flex justify-between">
        <h3 v-if="title">{{ title }}</h3>
        <button @click="$emit('close')">
          <XMarkIcon class="movie-modal-close-icon" />
        </button>
      </div>

      <slot />
    </div>
  </div>
</template>

<style scoped></style>
