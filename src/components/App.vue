<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
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
let sketchName = ref(defaultSketchName.name)
const route = useRoute()
let activeSketch: Ref<P5Vue.Import> = ref({})
let vars = ref({})
let hasVars = ref(false)

function customMatcher(s: string) {
  const fullMatch = s.match(/\/.*(\/.*)$/)! // matching "/sketchName"
  const match = fullMatch.at(-1)
  if (!match) {
    throw "no match"
  }

  if (match === "/") return defaultSketchName.name
  else return match.replace("/", "")
}

watch(
  () => { return { fullPath: route.fullPath, routeName: route.name } },
  ({ fullPath, routeName }) => {

    sketchName.value = slugify(String(routeName))

    if (import.meta.env.PROD) { //stripped on build
      sketchName.value = slugify(customMatcher(fullPath))
    }


    if (!importedSketches.hasOwnProperty(sketchName.value)) {
      throw "no sketch matching this route"
    }
    const importedSketch = importedSketches[sketchName.value]!

    if (!importedSketches[sketchName.value]!) {
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
    if (env === "testing") {
      test()
    }
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



@media (min-width: 1024px) {


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


@media (max-width: 1023px) {


  #app {
    flex-direction: column;
  }

  main {
    flex-direction: column;
  }

  .nav-left {
    flex-direction: row;
  }
}
</style>