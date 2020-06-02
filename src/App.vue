<template>
 
  <v-card class="overflow-hidden">
    <!-- ツールバー -->
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
 <!-- 画像切り替え、グラデーションテンプレート -->
    <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.5), rgba(25,32,72,.6)"
        ></v-img>
      </template>
 
 
  <!-- <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    > -->
    <!-- v-show="$store.state.login_user" -->
      <v-app-bar-nav-icon  @click.stop="toggleSideMenu"></v-app-bar-nav-icon>

      <v-toolbar-title>医療機器管理台帳</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items v-if="$store.state.login_user"> -->
        <!-- <v-btn text @click="logout">ログアウト</v-btn> -->
      <!-- </v-toolbar-items> -->
    


      <template v-slot:extension v-if="$store.state.login_user">
        <v-tabs align-with-title center>
          <v-tab :to="{name: 'list-hd'}">透析</v-tab>
          <v-tab :to="{name: 'list-op'}">外来</v-tab>
          <v-tab :to="{name: 'About'}">その他</v-tab>
          <v-tab :to="{name: 'note'}">お知らせ</v-tab>
        </v-tabs>
      </template>

 <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="800"
    >
    </v-sheet>

    <SideNav/>
<v-toolbar-items v-if="$store.state.login_user">
      <v-btn text @click="logout">ログアウト</v-btn>
    </v-toolbar-items>
    </v-app-bar>


    <v-content class="cont">
      <!-- fill-height -->
      <v-container fluid fill-height align-start>
        <router-view/>
      </v-container>
    </v-content>



  <!-- </v-app-bar> -->




  </v-card>
</template>

<script>
import firebase from 'firebase'
import SideNav from './components/SideNav'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    SideNav
  },
  // created () { 
  created () { 
    firebase.auth().onAuthStateChanged(user => {
      if (user) { // onAuthでログインして入れば、userをセット
        this.setLoginUser(user)
          this.selectDate()
        // this.fetchListsHd()
           // this.fetchListsOp()
         if (this.$router.currentRoute.name === 'home') {
             console.log('listhd')
           this.$router.push({ name: 'list-hd' }, () => {})
         }else if (this.$router.currentRoute.name === 'list-op') {
          console.log('listop')
         }else if (this.$router.currentRoute.name === 'note') {
            console.log('note')
         }else{
            console.log('none')
         }
      } else { // ログアウトして入れば、userを削除
        this.deleteLoginUser()
        this.$router.push({ name: 'home' }, () => {})
      }
    }
  )
  },
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['logout', 'toggleSideMenu', 'setLoginUser', 'deleteLoginUser', 'fetchListsHd', 'fetchListsOp','selectDate'])
  }
};
</script>

<style scoped lang="scss">

// .btn_search{
//   margin-right:5%;
//   text-decoration: none;
// }
// .btn_user-menu{
//   margin-right: 5%;

// }
.cont{
  position:absolute;
  top:200px;

}
</style>

