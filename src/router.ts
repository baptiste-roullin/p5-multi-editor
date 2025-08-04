import { createRouter, createWebHistory } from 'vue-router'
import { cleanedList } from './cleanList'
import { ref } from 'vue'

// Reactive state
export const refreshKey = ref(0)


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: cleanedList.map((file, index) => {

    return {
      path: '/' + file,
      alias: (index === 0 ? '/' : '/' + file),
      name: file,
      component: () => import(`./shellComponent.vue`),

    }
  })

})

//force re-render of component and thus p5
router.beforeEach(() => {
  refreshKey.value++
  return true
})

export default router
