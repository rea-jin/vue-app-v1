<template>
  <!-- <v-container fluid fill-height> -->
      <!-- drawerのToggle,切替ボタン これはアイコンでやるのでいらない-->
    <!-- <v-btn color="pink" dark @click.stop="drawer = !drawer">Toggle</v-btn> -->
<!-- テンプレートからdrawerの状態が変更される -->
<!-- ステートの値をdrawerにセットする -->
<!-- 実際は良くないが。。 -->
    <v-navigation-drawer v-model="$store.state.drawer" absolute temporary>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <!-- gettersで名前と画像を取得する -->
            <img v-if="photoURL" :src="photoURL">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ userName }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

<!-- メニューを表示 -->
        <v-list-item v-for="(item, index) in items" :key="index" :to="item.link">
          <v-list-item-icon>
              <!-- vuetifyの中にあるアイコン使える iconで名前を指定 -->
              <!-- https://material.io/resources/icons/?style=outline -->
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      
       <!-- <v-flex xs12 mt-5> -->
        <!-- loginメソッドを呼ぶ -->
        <!-- <v-btn color='info' @click="login">ログイン</v-btn> -->
       <!-- </v-flex> -->

      <v-list-item v-if="$store.state.login_user" >
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
        <v-list-item-content  text @click="logout">
          <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
     
      </v-list>
    </v-navigation-drawer>
  <!-- </v-container> -->
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
    //   drawer: false, // これはstoreに移行
      items: [//メニューを定義している
      // vuetifyのリンクは、vue-routerと同様に、to属性でリンクできる
// ログインしているときはいらない？
      { title:'ホーム', icon: 'mdi-home', link: { name: 'home'}},
        // { title: '登録機器一覧', icon: 'mdi-menu', link: { name: ''}}

      ]
    }
  },
  methods: {
    ...mapActions(['logout'])
  },
  computed: { // mapactionsと違ってcoputed憎む
    ...mapGetters(['userName', 'photoURL'])
  }
}
</script>