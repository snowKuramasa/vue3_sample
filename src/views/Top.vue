<template>

<Header :taskCount="listLength" @is-task="isTask"/>
<!-- <Sidebar /> -->
<div class="container text-left">
  <div class="row">
    <div class="col">
      <span>入力してみてね😜</span>
      <div>
        <input type="text" v-model="animals.shark">
        <span>{{animals.shark}}</span><span v-if="animals.shark" class="shark">🦈</span>
      </div>

      <div>
        <input type="text" v-model="animals.fox">
        <span>{{animals.fox}}</span><span v-if="animals.fox" class="fox">🦊</span>
      </div>

      <div>
        <input type="text" v-model="animals.needleMouse">
        <span>{{animals.needleMouse}}</span><span v-if="animals.needleMouse" class="needleMouse">🦔</span>
      </div>

      <div>
        <input type="text" v-model="animals.foods.meat">
        <span>{{animals.foods.meat}}</span><span v-if="animals.foods.meat" class="meat">🍖</span>
      </div>
      <div>
        <input type="text" v-model="animals.foods.vegetable">
        <span>{{animals.foods.vegetable}}</span><span v-if="animals.foods.vegetable" class="vegetable">🥑</span>
      </div>
    <p>{{otherList}}</p>
    </div>
    <div class="col">
      <div class="vue_logo">
        <img alt="Vue logo" src="../assets/logo.png">
      </div>
    </div>
    <div class="col">
      <!-- Column -->
    </div>
  </div>
</div>

    
  <h1>🌲{{taskAlertMessage}}😉</h1>
  <div class="text-center">
   <input type="text" v-model="newTodo">
   <button type="button" class="px-3 py-1 btn btn-success" @click="onAddClicked">Add</button>
   <h5 class="mt-2">
     <span>前回の入力: {{oldInputValue == ""? "※未入力":oldInputValue}}</span>
     <span v-if="newInputValue"><i class="bi bi-arrow-right mx-3"></i></span>
     <span v-if="newInputValue">新規入力: {{newInputValue}}</span>
   </h5>
  </div>

 <div style="width:50%">
  <ul v-for="(todo, index) in todos" :key="index">
    <li class="text-center">
      <!-- NOTE:isFinishedをここで追加 -->
      <input class="todo_finished form-check-input" type="checkbox" v-model="todo.isFinished" @change="onStatusChecked(index)">
        <span class="todo_content">{{todo.content }}</span>
      <button class="btn btn-dark delete_button px-1 py-0" :disabled="!todo.status" @click="onDeleteClicked(index)"><i class="bi bi-x"></i></button>
      </li>
  </ul>
 </div>

<div class="col">
  <ul v-for="(language, index) in programLanguages" :key="index">
    <li>
      <!-- NOTE:isFinishedをここで追加 -->
      <input class="todo_finished form-check-input" type="checkbox" v-model="language.enable" @change="!language.enable">
        <span class="todo_content">{{language.name }}</span>
      </li>
  </ul>
</div>

<CAlert color="info">A simple info alert—check it out!</CAlert>


</template>
<script>
import { CAlert } from '@coreui/vue';
import '@coreui/coreui/dist/css/coreui.min.css';
import {
  reactive,
  ref,
  computed,
  watch,
  // toRef
   } from 'vue';

import { onBeforeMount } from 'vue';
import Header from "@/components/Header";
import {useStore} from "vuex"
// import Sidebar from "@/components/Sidebar";
export default {

  name: 'Top',
  components:{
    Header,
    CAlert
    // Sidebar
  },
  data() {
    return {
    }
  },
  setup(){
    /**store定義 */
    const store = useStore();

    const newTodo = ref("");

    const todos =  store.state.todos;

    const listLength = computed(() => store.state.todos.length);//computed,


    const taskAlertMessage = ref("Let's Create ToDo Task!");



    //Header(子)コンポーネントのイベントisTaskからemitを使って値を親(top)へ渡す
    const isTask = (emitParam2, emitParam3) => {
      alert("This Emit Event!");
      alert(`Emit 第2引数 : ${emitParam2}`);
      alert(`Emit 第3引数 : ${emitParam3}`);
    }

    const newInputValue = ref("");
    const oldInputValue = ref("");

    //ウォッチャー
    watch(() =>newTodo.value,
        (newValue, oldValue) => {
          console.log(newValue);
          console.log(oldValue);
          updateProsess(newValue,oldValue);
      }
    );

    //配列の中のオブジェクト
    const programLanguages = reactive(
      [
        {
          name:"javascript",
          type:"frontend",
          enable:true
        },
        {
          name:"Java",
          type:"backend",
          enable:true
        },
        {
          name:"C#",
          type:"backend",
          enable:true
        }
      ]
    );
    //配列の中のオブジェクト
    watch(() => programLanguages[0].enable, ()=> {
      alert(`${programLanguages[0].name} is ${programLanguages[0].enable}`)
    })

    /*オブジェクトをリアクティブにする場合*/
    //オブジェクトの中の値はリアクティブ
    const animals = reactive(
      {
        shark:"",
        fox:"",
        needleMouse:"",
        foods:{
          meat:"",
          vegetable:""
        }
      }
    );
    const otherList = [];
    // const shark = toRef(animals, 'shark');
    // const fox = toRef(animals, 'fox');
    // const needleMouse = toRef(animals, 'needleMouse');

    /**オブジェクトの中身を監視 */
    watch(() => [
      animals.shark,
      animals.fox,
      animals.needleMouse,
      animals.foods.meat,
      animals.foods.vegetable,
      ],
        (newValue) => {
          //引数の配列がnewValueに渡される
          console.log(newValue)
          otherList.push("🌱");
      }
    );

    const updateProsess = (newValue,oldValue)=>{
      console.log("")
        newInputValue.value = newValue;
        oldInputValue.value = oldValue;
    }

    /**Addボタン押下 */
    const onAddClicked = () => {
      store.commit('addTodo',newTodo.value);
      newTodo.value = "";
    }

    /**×ボタン押下 */
    const onDeleteClicked = (index) => {
      store.commit('deleteTodo',index);
    }

    /**チェック */
    const onStatusChecked = (index)=>{
      store.commit('updateStatus',index);
    }

    onBeforeMount(() => {
       console.log('mounted in the composition api!')
    });


/**TODO:axiosを試してみる */
    // reqPut() {
    //   const url = this.url;
    //   const body = this.edit;
    //   axios
    //     .put(url, body, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Accept-Language": "ja"
    //       },
    //     })
    //     .then((resp) => {
    //       this.debugLog("resp.data" + JSON.stringify(resp.data));

    //     })
    //     .catch((err) => {
    //       this.debugLog(err);
    //     });
    // },

    //テンプレートへ出力するものは以下に記述
    return {
      //
      todos,
      newTodo,
      listLength,
      isTask,
      taskAlertMessage,
      newInputValue,
      oldInputValue,
      onAddClicked,
      onDeleteClicked,
      onStatusChecked,
      animals,
      otherList,
      programLanguages
    }
  },

}
</script>

<style>
.vue_logo{
  margin-top: 2rem;
  text-align: center;
}

.todo_finished{
  position: relative;
  top:1rem;
  left: -0.5rem;
}

.delete_button{
  position: relative;
  top:-0.2rem;
  left: -0.2rem;
}

.todo_content{
  margin-right:1rem;
  font-size: 2rem;
}

.todo{
  width: 50%;
  margin: 0 auto;
}

p{
  padding: 0;
  margin: 0 auto;
}



h1{
  margin-top: 2rem;
  text-align: center;
}

.shark,
.fox,
.needleMouse,
.meat,
.vegetable{
  font-size:3rem;
}

</style>
