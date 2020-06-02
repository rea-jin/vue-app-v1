import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ListHd from '../views/ListHd.vue'
import ListOp from '../views/ListOp.vue'
import ListHdForm from '../views/ListHdForm.vue'
import ListOpForm from '../views/ListOpForm.vue'
import Note from '../views/Note.vue'
//プラグインを使う
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  { // 透析一覧
    path: '/list-hd',
    name: 'list-hd',
    component: ListHd
  },
  { // 外来一覧
    path: '/list-op',
    name: 'list-op',
    component: ListOp
  },
  { // お知らせ
    path: '/note',
    name: 'note',
    component: Note
  },
  {
    // 既存のhdを編集
    path: '/list-hd/:listhd_id?/edit',
    name: 'list-hd_edit',
    component: ListHdForm
  },
  {
    // 既存のopを編集
    path: '/list-op/:list-op_id?/edit',
    name: 'list-op_edit',
    component: ListOpForm
  },
  { // その他
    path: '/about',
    name: 'About',
    // 下のコメントもwebpackの設定に関するもの
    // route level code-splitting 
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }, // webpackでバンドルしてまとめたときでもコンポーネントを別のファイル（about.js）として保存される。
    // コンポーネントが多い時にいいかもしれない
]

const router = new VueRouter({
  mode: 'history', // スラッシュで区切る方法
  base: process.env.BASE_URL, // 環境変数 
  routes
})

export default router
