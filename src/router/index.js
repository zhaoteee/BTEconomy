import Vue from 'vue'
import Router from 'vue-router'
import homeContent from '@/components/homeContent'
import tags from '@/components/tags'
import articleDetail from '@/components/articleDetail'
import column from '@/components/column'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/homeContent'
    },
    {
      path: '/homeContent',
      component: homeContent
    },
    {
      path: '/tags/column/:id',
      component: tags
    },
    {
      path: '/tags/tag/:id',
      component: tags
    },
    {
      path: '/column/:id',
      component: column
    },
    {
      path: '/article/:id',
      component: articleDetail
    }
  ]
})
