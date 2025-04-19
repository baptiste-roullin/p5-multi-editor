<script setup lang="ts">
//TODO: allow overriding setup function
//TODO:  video and picture recording function. input variable to watch for looping
// TODO Logging function?
// TODO performance tests
// TODO cross-env tests
// to support: noLoop(), loop(), isLooping(), push(),pop(), preload(),setup(),draw(),remove()
import { RouterLink } from 'vue-router'
import { cleanedList } from './cleanList'

import shellComponent from "@/shellComponent.vue"


</script>

<template>
  <header>
    <nav>
      <div v-for="(fileName, index) in cleanedList" :key="index" :id="String(fileName)">
        <RouterLink :to="fileName">{{ fileName }}</RouterLink>
      </div>
    </nav>
  </header>

  <main>
    <shellComponent :fileName="cleanedList[0]" />
  </main>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  font-size: 14px;
  margin-top: 2rem;
  height: 100%;
  overflow-y: scroll;
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 0rem;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  margin-top: 1rem;
}


nav a {
  text-decoration: none;
  color: var(--color-slate-300);
  transition: 0.4s;
  width: 100%;
  font-weight: 500;
  display: inline-block;
  padding: 1rem 1.5rem;
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
    //padding-right: calc(var(--section-gap) / 2);

    width: 12vw;
    text-align: left;



  }

  .logo {
    margin: 0 2rem 0 0;
  }



}
</style>