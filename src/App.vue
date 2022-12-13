<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { PixiEngine } from './pixi/engine';

const canvas: Ref<Node | null> = ref(null);

onMounted(() => {
    PixiEngine.init(800, 600);
    const canvasInfo = PixiEngine.getCanvas();
    // @ts-ignore-error
    canvas.value?.appendChild(canvasInfo);
});
</script>

<template>
  <div>
    <div ref="canvas"></div>
  </div>
</template>

<style scoped>
</style>
