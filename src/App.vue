<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import { useMagicKeys } from '@vueuse/core'
import { Stage, tryMountTicker, useApplication } from 'vue3-pixi'

const app = useApplication()
const width = ref(800)
const height = ref(600)

const position = ref({
  y: height.value - 150,
  x: 40,
})

const skew = ref({
  x: 0,
  y: 0
})


const {
  shift,
  arrowup,
  arrowdown,
  arrowleft,
  arrowright,
  space
} = useMagicKeys()


function jop() {
  const
    direction = -1, //to Top
    gravity = 1,
    power = 20,
    jumpAt = position.value.y;
  let time = 0;

  function jopTick(deltaMs: number) {
    const jumpHeight = (-gravity / 2) * Math.pow(time, 2) + power * time;
    if (jumpHeight < 0) {
      position.value.y = jumpAt;
      app.value!.ticker.remove(jopTick)
      return;
    }
    position.value.y = jumpAt + (jumpHeight * direction);
    time += deltaMs;
  }
  app.value!.ticker.add(jopTick)
}

tryMountTicker(() => {
  let speed = 1.25;
  if (shift.value)
    speed += 0.75;
  if (arrowup.value)
    position.value.y -= speed;

  if (arrowdown.value)
    position.value.y += speed;

  if (arrowright.value) {
    position.value.x += speed;
    skew.value.x = -0.15
  }

  if (arrowleft.value) {
    position.value.x -= speed;
    skew.value.x = 0.15
  }

  if (space.value)
    jop()

  if (!arrowleft.value && !arrowright.value) {
    skew.value.x = 0
    skew.value.y = 0
  }
})
</script>

<template>
  <div>
    <Stage ref="stageRef" :width="width" :height="height">
      <container>
        <sprite texture="/bg.png" :width="width" :height="height" />
        <sprite texture="/player.png" :skew-x="skew.x" :position="position" :scale="0.1" />
      </container>
    </Stage>
  </div>
</template>

<style scoped></style>
