<script setup lang="ts">
import p6 from '../p6'
import { onMounted, onUnmounted } from 'vue'


import { config, width } from '../utils'



onMounted(() => {
  const sketch = (p6: p6) => {

    config(p6)
    p6.draw = function () {
      const largeur = 400
      const centre = largeur / 2
      p6.background(240)

      p6.stroke(100)
      p6.strokeWeight(1)
      p6.angleMode(p6.DEGREES)

      for (let i = 0; i < 360; i += 10) {
        let x1 = p6.sin(i) * 30
        let y1 = p6.cos(i) * 30
        let x2 = p6.sin(i) * 40
        let y2 = p6.cos(i) * 40
        p6.line(x1 + centre, y1 + centre, x2 + centre, y2 + centre)
      }

    }
  }
  new p6(sketch)
})


</script>

<template>
  <main>
    <canvas></canvas>
  </main>
</template>
