<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
  <div class="about">
    <h1>お知らせ</h1>
 <input type="date" v-model="today" />
     <v-flex xs12 mt-5 justify-center>
        <v-data-table :headers='headers' :items='lists'>

          <!-- 点検時期のきたものだけ表示 -->


          <template v-slot:item.action="{ item }">
<!-- <div v-if="lists.update<= today"> -->
  
                <!-- 編集ページへ飛ぶボタン リンクのパスに含まれるパラメーター 連絡先のidをパスに指定したところに入れる-->
              <!-- <span> -->
                <router-link :to="{ name: 'list-hd_edit', params: { list_id: item.id }}" >
                <v-icon small class="mr-2">mdi-pencil</v-icon>
                </router-link>
              <!-- </span> -->
            <!-- </td> -->
           
<!-- </div> -->
          </template>

        </v-data-table>
      </v-flex>
  </div>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

// import firebase from 'firebase'

export default {
 // Firestoreのオブジェクト取得

  created (){
  
// dataメソッドでデータを呼び出す
    // this.selectDate()  
    this.lists = this.$store.state.lists
  },
  data () {
    var twoDigit = function(value) {
          return ('0' + value).slice(-2);
        };
    var _today = new Date();
    return {
      //  now: now,
      today:[
        _today.getFullYear(),
        twoDigit(_today.getMonth()+1),
            twoDigit(_today.getDate())
          ].join('-'),
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

  //   deleteConfirm(id){
  //     if(confirm('削除してもいいですか？')){ // ok押したら削除される、これをテンプレートから呼び出す
  //       this.deleteLists({ id })
  //     }
  //   },
    ...mapActions(['deleteLists','selectDate'])
  // }
},
computed: {
    ...mapGetters(['userName', 'photoURL','uid', 'getListsById'])
  }
}
</script>