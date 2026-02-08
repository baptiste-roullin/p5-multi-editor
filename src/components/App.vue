<script setup lang="ts">
import { ref, watch, watchEffect, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import slugify from '@sindresorhus/slugify'

import type { P5Vue } from "../../index.d.ts"
import { runP5 } from '@/runP5'
import test from '@/test'
import SketchContainer from './sketch-container.vue'
import { p5Store } from '@/store'
const store = p5Store()

import { refreshKey } from '@/router'
import { cleanedList } from '@/updateFilesList/cleanList'
import { importedSketches } from '@/main'
const env = import.meta.env.VITE_USER_NODE_ENV

const defaultSketchName = (cleanedList[0])
let sketchName = ref(defaultSketchName)
const route = useRoute()
let activeSketch: Ref<P5Vue.Import> = ref({})
let vars = ref({})
let hasVars = ref(false)

watch(
  () => route.name,
  (routeName) => {

    if (env === "testing") {
      test()
    }
    sketchName.value = slugify(String(routeName))
    const importedSketchesRaw: P5Vue.Imports = importedSketches

    if (!importedSketchesRaw.hasOwnProperty(sketchName.value)) {
      throw "no sketch matching this route"
    }
    const importedSketch = importedSketchesRaw[sketchName.value]!

    if (!importedSketchesRaw[sketchName.value]!) {
      throw "unable to load sketch"
    }
    activeSketch.value = importedSketch

    if (activeSketch.value.vars) {
      hasVars.value = true
      store.setVars(activeSketch.value.vars)
      vars = activeSketch.value.vars
    }
    else {
      hasVars.value = false

    }

    runP5(activeSketch, slugify(sketchName.value))

  }
)

</script>

<template>
  <header>
    <nav class="nav nav-left">
      <div v-for="(fileName, indexFile) in cleanedList" :key="indexFile" :id="String(fileName)">
        <RouterLink :to="fileName.name">{{ fileName.name }}</RouterLink>
      </div>
    </nav>
  </header>
  <main>
    <suspense>
      <SketchContainer :key="refreshKey" :hasVars="hasVars" />
    </suspense>
  </main>

</template>

<style scoped>
#app {
  max-width: none;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}


main {

  display: flex;
  flex-direction: row;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  height: 100%;
  overflow-y: scroll;
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.nav-left {
  gap: 0rem;
  margin-top: 1rem;

}

nav a {
  text-decoration: none;
  color: var(--color-slate-300);
  transition: 0.4s;
  width: 100%;
  font-weight: 500;
  display: inline-block;
  padding: 1rem .5rem;
  ;
  word-wrap: anywhere;
  border-bottom: var(--vt-c-divider-dark-1) 1px solid;
}

nav a.router-link-exact-active {
  color: var(--color-slate-200);
  font-weight: 700;
  background-color: var(--color-slate-800);
}

nav a:hover {
  background-color: var(--color-slate-300);
  color: var(--color-slate-800);
}



@media (min-width: 1100px) {


  nav {
    text-align: left;

  }

  .nav-left {
    width: 12vw;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

}
</style>