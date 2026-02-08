import { createRouter, createWebHistory } from 'vue-router'
import { cleanedList } from './updateFilesList/cleanList'
import { ref } from 'vue'

let routes = cleanedList.map((file, index) => {
  const fileName = file.name
  return {
    path: '/' + fileName,
    alias: (index === 0 ? '/' : '/' + fileName), // when i = 0, path will be / and name = sketch name
    name: fileName,
    component: () => import("./components/sketch-container.vue"),
  }
})



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export const refreshKey = ref(0)
//force re-render of component and thus p5
router.beforeEach(() => {
  refreshKey.value++
  return true
})

export default router
