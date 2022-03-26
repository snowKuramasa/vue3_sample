import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state() {
    return{
      todos:[],
    }
  },
  mutations: {
    //追加
    addTodo: (state,newTodo)=>{
      state.todos.push(
        {
          status : false,
          content : newTodo,
        }
      );
    },
    //削除
    deleteTodo:(state,index)=>{
      state.todos.splice(index, 1)
    },
    //ステータス更新
    updateStatus:(state,index)=>{
      const todo = state.todos[index];
      todo.status = todo.isFinished;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[
    createPersistedState(
      {
        key: 'todos',
        // ローカルストレージへ保存
        //https://qiita.com/_masa_u/items/b58b92c283f4e770e094
        //https://zenn.dev/foxtail88/articles/6ca427a7168ff3
        storage: window.localStrage,
        reducer: (state) => ({ todos: state.todos }),
      }),
  ]
})
