import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/page/home'
import exam from '@/page/exam'
import result from '@/page/result'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: HelloWorld,
    //   redirect: '/home'
    // },
    // {
    //   path: '/home',
    //   component: home
    // },
    {
      path: '/exam/:id',
      component: home
    },
    {
      path: '/exam/:id/test',
      name: 'exam',
      component: exam
    },
    {
      name: 'Result',
      path: '/result',
      component: result
    }
  ]
})
