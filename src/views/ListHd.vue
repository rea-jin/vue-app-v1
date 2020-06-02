<template>
<!-- componentsからviewsに移動して1つのページとして表示する -->
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>透析機器一覧</h1>
      </v-flex>
<v-flex xs12 mt-5 justify-center>
  <router-link :to="{ name: 'list-hd_edit' }">
    <v-btn color="">
      機器追加
    </v-btn>
  </router-link>
</v-flex>
<!-- // vuetifyのテーブルテンプレートを利用したもの -->
      <v-flex xs12 mt-5 justify-center>
        <v-data-table :headers='headers' :items='lists'>
          <template v-slot:item.action="{ item }">
                <!-- 編集ページへ飛ぶボタン リンクのパスに含まれるパラメーター 連絡先のidをパスに指定したところに入れる-->
              <!-- <span> -->
                <router-link :to="{ name: 'list-hd_edit', params: { list_id: item.id }}" >
                <v-icon small class="mr-2">mdi-pencil</v-icon>
                </router-link>
              <!-- </span> -->
            <!-- </td> -->
            <span>
                <v-icon small class=" ml-3" @click="deleteConfirm(item.id)">mdi-trash-can</v-icon>
            </span>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// storeに定義したアクションを呼び出す
import { mapActions } from 'vuex'
// import firebase from 'firebase'

export default {
 
    // 連絡先のデータをストアに取りに行くようになる
     created () { 
this.lists = this.$store.state.lists
         },

  data () {
    return {
      headers: [ // それぞれhtmlのオブジェクトに対応している
        { text: '通し番号', value: 'number' },
        { text: '機器名', value: 'name' },
        { text: '型式', value: 'typ' },
        // { text: '製造番号', value: 'lot' },
        // { text: '購入年月', value: 'create' },
        { text: '次回点検月', value: 'update' },
        { text: '状態', value: 'states', class:'iro' },
        // { message: 'イベント', value: 'events' },
        { text: '操作', value:'action', sortable: false } //操作、編集
      ],
      lists: []
// storeのデータは一時的な保存なので、更新するときえる
// サーバーに保存する必要がある

    }
  },


  methods: {

    deleteConfirm(id){
      if(confirm('削除してもいいですか？')){ // ok押したら削除される、これをテンプレートから呼び出す
        this.deleteLists({ id })
      }
    },
    // ...mapActions(['deleteLists','fetchLists'])
    ...mapActions(['deleteLists', 'toggleSideMenu', 'setLoginUser', 'logout', 'deleteLoginUser', 'fetchListsHd'])

  }
}
</script>

<style scoped lang="scss">
a{
  text-decoration: none;
}
.mdi-pencil::before{
  margin-right:15px;
}
.text-start{
  text-align: center;
}
</style>