<script setup lang="ts">
import p5 from 'p5'
import { onMounted } from 'vue'

import { config } from '../utils'

onMounted(() => {
  const sketch = (p5: p5) => {
    config(p5)

    p5.draw = function () {
      p5.background('red')
      const dimension = Math.min(
        window.innerWidth,
        window.innerHeight,
      )
      p5.ellipse(
        window.innerWidth / 2,
        window.innerHeight / 2,
        (Math.sin(Date.now() / 1000) + dimension / 2 / 5) *
        10,
        (Math.sin(Date.now() / 200) + dimension / 2 / 5) * 10,
      )
    }

  }
  new p5(sketch)
})


</script>

<template>
  <main>
    <canvas></canvas>
  </main>
</template>
