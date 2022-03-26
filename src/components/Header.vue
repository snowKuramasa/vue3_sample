<template>
  <div>
   <header class="p-3 bg-success text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="/top" class="nav-link px-2 text-white">Top</a></li>
          <li><a href="/" class="nav-link px-2 text-white">Home</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
          <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" class="nav-link px-2 text-white">About</a></li>
        </ul>

        <!-- <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
        </form> -->

        <div class="text-end">
          <!-- <button type="button" class="btn btn-outline-light me-2">Login</button>
          <button type="button" class="btn btn-warning">Sign-up</button> -->

          <button type="button" class="px-3 py-1 btn btn-outline-warning mb-2" @click="isTask">Emit Event Button</button>
          <h3><i class="bi bi-chat-right-text"></i> Tasks {{taskCount}} 🔥</h3>
        </div>
      </div>
    </div>
  </header>
  </div>
</template>
<script>
// import { computed,reactive } from '@vue/reactivity'

import { onBeforeMount } from 'vue'
export default{
  props:{
    taskCount: Number,
  },
  setup(prop,context) {
    const isTask = () => {
      /**@param1 'is-task' => 親コンポーネントで定義するイベント名
       * @param2 第2引数以降は親コンポーネントでparam1のイベントが発火した時に渡される値
      */
      context.emit('is-task', prop.taskCount == 0,"Vue3 Emit Event")
    }


    //beforeMount
    onBeforeMount(() => {
       console.log('mounted in the composition api!')
     })

    return{
      isTask
    }
  },

}
</script>