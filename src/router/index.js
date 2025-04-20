import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import Header from '@/components/layouts/HeaderComponent.vue'
import CollectionsView from '@/views/CollectionsView.vue'
import CollectionDetailView from '@/views/CollectionDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: { default: DashboardView, Header },
    },
    {
      path: '/collections',
      name: 'collections',
      components: { default: CollectionsView, Header },
    },
    {
      path: '/collections/:collectionId',
      name: 'collection-detail',
      components: { default: CollectionDetailView, Header },
    },
  ],
})

export default router
