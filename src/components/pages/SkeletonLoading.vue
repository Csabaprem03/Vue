<template>
  <div
    class="flex flex-col items-center justify-center my-4 rounded-2xl border border-neutral-800 p-3 py-4 h-[410px] w-[215px] bg-neutral-900/50"
  >
    <div
      class="skeleton w-45 h-50 bg-neutral-300 dark:bg-neutral-700 rounded-lg mb-4"
    ></div>
    <div class="flex flex-col flex-wrap">
      <div v-for="index in 5" :key="index" class="flex flex-col flex-wrap">
        <div
          class="skeleton w-7 h-[16.20px] rounded rounded-full bg-neutral-700 mb-2"
        ></div>
      </div>
    </div>
    <div class="skeleton h-4 w-20 bg-neutral-700 rounded mb-2"></div>

    <div class="h-3 w-1/2 bg-neutral-700 rounded"></div>
  </div>
</template>
