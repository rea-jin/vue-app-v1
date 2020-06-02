import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

// インポートしたvuexをvueで使う
Vue.use(Vuex)

export default new Vuex.Store({
  // メニューの開閉を表すdrawerを定義
  state: {
    login_user: null,
    drawer: false,
    // u_menu: false,
    lists:[],
    // today:new Date
  },





  mutations: { // stateの状態を更新
    // メソッドが呼び出されたら、ミューテーション も呼び出される
    setLoginUser (state, user){
      state.login_user = user
    },
    deleteLoginUser (state){ //ユーザー情報をからにする
      state.login_user = null
    },
    // コンポーネント間でstateをやり取りするのは大変なのでvuexを使う
    // toggleRightMenu(state){ // stateを反対にして保存
      // state.u_menu = !state.u_menu
    // },
    toggleSideMenu(state){ // stateを反対にして保存
      state.drawer = !state.drawer
    },
    addLists(state, { id, list}) { // actionsからaddressを配列に追加、idも渡すようにする
      // id=1234567890
      list.id = id
      state.lists.push(list)
    },
    updateLists (state, { id, list }) {
      // 対象のアドレスオブジェクトが存在するか
      const index = state.lists.findIndex(list => list.id === id)
      // 調べたインデックスの位置にアドレスオブジェクトを代入
      state.lists[index] = list
    },
    deleteLists (state, { id }) { // idを取得するまでは更新と同じ
      // 対象のアドレスオブジェクトが存在するか
      const index = state.lists.findIndex(list => {
        return list.id === id
      })
      // 1つの要素を削除するためにspliceを使う,削除する要素数として１をしてい
      state.lists.splice(index,1)
    }
  },






  actions: { //メソッド->commit->ミューテーション
    // コンポからsetloginuserを呼び出せば、stateに反映される
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },
    // actionの引数には自動的にcontextオブジェクトが渡ってくる
    // fetchLists ({ getters, commit }) { // 非同期にデータを取得 
      // なぜここでバッククォートか？SQL? コレクションで取得対象のパスを指定、非同期にデータが実行されて、thenメソッドが呼び出される
      // クエリsnapshotオブジェクトにアドレスのデータが含まれているので、展開して取り出す アドレスの配列に追加
      // firebase.firestore().collection(`users/${getters.uid}/lists`).get().then(snapshot => {
        // ループしているのはドキュメントの略
        // ドキュメントオブジェクトも直にデータが入っているのではなくdata()を呼び出すことで、取れる, idも取得する
        // snapshot.forEach(doc => commit('addLists', { id: doc.id, list: doc.data() })) // dataメソッドでデータを呼び出す
      // })
    // },
    fetchListsHd({getters, commit}){
      var db = firebase.firestore();
        // フィールドのnumberの中からHDの前方一致のドキュメントを取得
        db.collection(`users/${getters.uid}/lists`).orderBy("number").startAt("HD").endAt("HD" + '\uf8ff').get().then(snapshot => {
        snapshot.forEach(doc => commit('addLists', { id: doc.id, list: doc.data()})
        // lists.push([doc.id, doc.data()])
        // commit('addLists', { id: doc.id, list: doc.data()
        )}
    )},
    fetchListsOp({getters, commit}){
        var db = firebase.firestore();
            db.collection(`users/${getters.uid}/lists`).orderBy("number").startAt("CE").endAt("CE" + '\uf8ff').get().then(snapshot => {
        snapshot.forEach(doc => commit('addLists', { id: doc.id, list: doc.data()})
        )}
    )},
    selectDate ({ getters, commit }) {
      var db = firebase.firestore();
          db.collection(`users/${getters.uid}/lists`).get().then(snapshot => {
      snapshot.forEach(doc => commit('addLists', { id: doc.id, list: doc.data()})
      )}
    )},
    deleteLoginUser({ commit }) { //commitメソッドを実行
      commit('deleteLoginUser')
    },
    logout (){
      firebase.auth().signOut() // firebaseのメソッドsignoutを呼び出す authentificationの機能でログアウトできる
    },
    login(){
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    // サイドメニュー
    toggleSideMenu({commit}){ // context.commitメソッドだけを受け取る書き方
      commit('toggleSideMenu') // ミューテーションを呼び出すために書く。ミューテーション側にもメソッドを書く
    },
    // 右側ユーザーメニュー
    // toggleRightMenu({commit}){ // context.commitメソッドだけを受け取る書き方
      // commit('toggleRightMenu') // ミューテーションを呼び出すために書く。ミューテーション側にもメソッドを書く
    // },
    //  アドレスを追加したときにfire storeに保存するようにする
   addLists({ getters, commit}, list){ // コンテキストオブジェクトにはgetterが含まれるので以下のように書くと、getterを取得できる
    // firesotreで設定したパスとあっているかどうか addressesにはidが割り当てられ。そこにレコードが保存される
    // add()でデータを保存しているが、自動でID（連絡先オブジェクトを識別するための）を受け取ることができる
    if (getters.uid) { // add()のコールバック関数にはドキュメントリファレンスのオブジェクトが渡って来る,
      // それをdoc変数で受け取る docオブジェクトにidが含まれるので、そこにidを渡す commitの第２引数にオブジェクトで渡す
      // 以下のパスが、firebaseのルールと違うとdatabaseに保存できない
      firebase.firestore().collection(`users/${getters.uid}/lists`).add(list).then(doc=>{
        //  コンポーネントでaddListsを呼び出すときに、addressを渡す->ミューテーションへ
        commit('addLists', { id: doc.id, list}) 
      })
    }
   },
  //  ストアを更新するアクション
    updateLists ({ getters, commit }, { id, list}) {
      if (getters.uid){ // doc.idで更新対象を取得、update()も非同期で実行されて,
        // 更新が完了した時点でcommitして、idとaddressが更新される
        firebase.firestore().collection(`users/${getters.uid}/lists`).doc(id).update(list).then(() => {
          commit('updateLists', {id, list})
        })
      }
    },
    //  ストアを更新するアクション
    deleteLists ({ getters, commit }, { id }) {
      if (getters.uid){ // doc.idで更新対象を取得、update()も非同期で実行されて,
        // 更新が完了した時点でcommitして、idとaddressが更新される ミューテーション呼び出して、stateから削除
        firebase.firestore().collection(`users/${getters.uid}/lists`).doc(id).delete().then(() => {
          commit('deleteLists', {id } )
        })
      }
    }
  },





  getters: {
// 関数を定義し、getterには自動でステートが来るので、それを加工して返す。これをコンポーネントに返す
    userName: state => state.login_user ? state.login_user.displayName :'',
    photoURL: state => state.login_user ? state.login_user.photoURL :'',
    // データベースへ保存するのに、uidを取得するゲッター ログインユーザーはuidを持つ
    uid: state => state.login_user ? state.login_user.uid : null,
    // 関数を返す関数、内側の関数が来る：idを取り出して
    // getterは参照した時点でゲッターメソッドの関数が帰って来る
    // 内側の関数id=>が帰って来る storeからidを受けて、それとマッチするidを返す
    getListsById: state => id => state.lists.find(list => list.id === id)
  }
})
