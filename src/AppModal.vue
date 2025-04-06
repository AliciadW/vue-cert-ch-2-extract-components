<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";

defineProps({
  title: { type: [String, null], default: null },
  show: { type: Boolean, default: false },
});

defineEmits(["close"]);
</script>

<template>
  <Transition>
    <div class="modal-wrapper" v-if="show">
      <div class="modal-wrapper-inner" v-if="show">
        <div class="flex justify-between">
          <h3 v-if="title">{{ title }}</h3>
          <button @click="$emit('close')">
            <XMarkIcon class="movie-modal-close-icon" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active,
.v-enter-active .modal-wrapper-inner,
.v-leave-active .modal-wrapper-inner {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-from .modal-wrapper-inner,
.v-leave-to .modal-wrapper-inner {
  transform: translateY(-50px);
}
</style>
