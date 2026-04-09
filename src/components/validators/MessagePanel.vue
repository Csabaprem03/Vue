<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-mask" @click.stop="$emit('close')">
        <div class="modal-container">
          <div class="modal-header text-center font-black italic my-2.5">
            <slot name="header" />
          </div>

          <div class="modal-body text-center">
            <slot name="body">{{ message }}</slot>
          </div>

          <div class="modal-footer flex justify-center my-3.5">
            <slot name="footer">
              <button
                class="modal-default-button animate-none hover:animate-wiggle"
                @click="$emit('close')"
              >
                <Icon
                  icon="line-md:close-small"
                  class="text-red-500 w-10 h-10"
                />
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Teleport, Transition } from "vue";

defineProps<{
  show: boolean;
  message?: string | null;
}>();
defineEmits(["close"]);
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}
.modal-container {
  width: 90%;
  padding: 1%;
  max-width: 400px;
  background-color: #ebe3e3;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgb(0, 0, 0, 0.3);
  color: #0c0808;
  transition: all 0.3s ease;
}
.dark .modal-container {
  background-color: rgb(1, 3, 27);
  color: #d1c9c9;
  box-shadow: 0 10px 30px rgba(190, 186, 186, 0.3);
  border: 1px #0c0c0c solid;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}
</style>
