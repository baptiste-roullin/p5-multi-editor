<script setup lang="ts">
import p5 from 'p5'
import type global from 'node_modules/@types/p5/global.d.ts'
import { onMounted } from 'vue'
import { globalInit } from '@/globalUtils'

onMounted(() => {

  function draw() {
    background(220)
    ellipse(50, 50, 80, 80)
  }
  globalInit(draw)
})

</script>

<template>
  <main><canvas></canvas></main>
</template>
