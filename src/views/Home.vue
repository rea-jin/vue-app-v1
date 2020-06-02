<template>
 <v-container text-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>医療機器管理台帳</h1>
        <p v-if="$store.state.login_user==null">機器登録、編集はGoogleアカウントでログインして、サイドメニューより
          行ってください。</p>
           <v-flex xs12 mt-5 >
        <!-- loginメソッドを呼ぶ -->
        <div v-if="$store.state.login_user">サイドメニューよりログアウトしてください</div>
        <v-btn v-if="$store.state.login_user">ログイン中です</v-btn>
        <v-btn v-if="$store.state.login_user==null" @click="login">Googleアカウントでログイン</v-btn>
      </v-flex>
          <hr>
          <p>新規登録は機器追加ボタンより</p>
          <p>入力方法 (以下例)</p>
          <hr>
          <p>通し番号：HD-01</p>
          <p>機器名：透析コンソール</p>
          <p>型式：NCV-2 type-A</p>
          <p>製造番号：BL201411</p>
          <p>購入年月：2014/11</p>
          <p>次回点検月：カレンダーより選択</p>
          <p>状態：<br>
            OK (問題なし) <br>
           C (要点検 異常ある場合はイベント欄へ)<br>
           NG (使用不可 廃棄予定はイベント欄へ)</p>
            <p>イベント欄：2020/5 エラー名、対処を記入。<br>
            ->解決方法を記入 (点検したときは点検表に記入)
            </p>
      </v-flex>     

    </v-layout>

  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
// import Home from './components/Home.vue'
// @ is an alias to /src @を書くことで相対参照になる
// import HelloWorld from '@/components/HelloWorld.vue'
// importでローカルのコンポーネントファイルを読み込む必要がある
export default {
  methods: {
    ...mapActions(['login'])
  },
  // name: 'home',
  // components: 
  // {
    // HelloWorld,
    // Home
  // }
}
</script>

<style scoped lang="scss">
// .contents{
  // position:absolute;
  // top:200px;
// }

</style>