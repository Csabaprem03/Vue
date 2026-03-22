<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="show" class="modal-mask" @click.stop="$emit('close')">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">default header</slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">{{ message }}</slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            default footer
                            <button class="modal-default-button" @click="$emit('close')">
                                <Icon icon="line-md:close-small" class="text-red-500 w-10 h-10" />
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Teleport, Transition } from 'vue';


defineProps<{
    show: boolean,
    message?: string | null,
}>()
defineEmits(['close'])



</script>

<style scoped>
.modal-mask{
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
}
.modal-container{
    width: 90%;
    max-width: 400px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgb(0,0,0,0.3);
    color: #333;
    transition: all 0.3s ease;
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