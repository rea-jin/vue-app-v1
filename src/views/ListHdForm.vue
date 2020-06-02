<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>機器編集詳細画面</h1>
      </v-flex>

      <v-flex xs12 xm8 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
              <!-- このlistがオブジェクトとしてcollectionとしてstoreに渡る -->
               <v-text-field v-model="list.number" label="通し番号"></v-text-field>
               <v-text-field v-model="list.name" label="機器名"></v-text-field>
               <v-text-field v-model="list.typ" label="型式"></v-text-field>
               <v-text-field v-model="list.lot" label="製造番号"></v-text-field>
               <v-text-field v-model="list.create" label="購入年月"></v-text-field>
  
               <label style="font-weight:600;">次回点検日：</label>
               <input type="date" v-model="list.update" class="form-control">
               <hr>
  
               <v-text-field v-model="list.states" label="状態"></v-text-field>
               <v-textarea v-model="list.events" label="イベント"></v-textarea>
               <!-- <v-text-field v-model="list." label=""></v-text-field> -->
               <!-- pushでページを遷移させる -->
               <div class="text-center">
               <v-btn @click="$router.push({ name: 'list-hd' })">キャンセル</v-btn>
               <v-btn color="denger" class="ml-2" @click="submit">保存</v-btn>
               <!-- <span>
                <v-icon small class="mr-2" @click="deleteConfirm(item.id)">mdi-trash-can</v-icon>
            </span> -->
               </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
// import {BootstrapDateInput} from 'vue'
// import Date from './../components/Date'
export default {
  // components:{
    // BootstrapDateInput
    // Date
  // },
    // 連絡先を取得できたときは表示する、できないときは一覧を表示する
    created () { // ルートのパラメータにidが含まれているか $route.paramsから取得できる
    // list_idがない場合は、新規の追加とみなす
    if (!this.$route.params.list_id) return
    // ゲッターの呼び出し、引数にアドレっすidを渡すことで、連絡先を取得
    const list = this.$store.getters.getListsById(this.$route.params.list_id)
    if (list) {
        this.list = list //取得できれば、アドレスをデータへ
    } else {
        this.$router.push({ name: 'list-hd' }) // 機器一覧へ
    }
    },
  // data () { // ここで入力するデータオブジェクトを初期化
  //   return { // からのオブジェクトからテキストフィールドで入力される
  //     list: {},
  //     // date: null,
  //     // menu: false,
  //   }
  // },
  data: () => ({
     list: {},
      date: null,
      menu: true,
    }),
  watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
  methods: {
      submit(){ //保存ボタンを押すことで、storeに格納されたデータを呼び出す
      // updateがある時のみメソッド発動
      if (this.$route.params.list_id){
        this.updateLists({ id: this.$route.params.list_id, list: this.list })
      }else{ // idがなければ、新規作成
        this.addLists(this.list)
      }
          this.$router.push({ name: 'list-hd' }) // 連絡先一覧へのページ遷移
          this.list = {} // formのリセット
      },

      save (date) {
        this.$refs.menu.save(date)
      },

    //    deleteConfirm(id){
    //   if(confirm('削除してもいいですか？')){ // ok押したら削除される、これをテンプレートから呼び出す
    //     this.deleteLists({ id })
    //   }
    // },

      ...mapActions(['addLists', 'updateLists', 'deleteConfirm'])
  }
}
</script>