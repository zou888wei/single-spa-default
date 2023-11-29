<template>
  <div class="about">
    <h1>This is an about page, I'm is Vue2</h1>
    <div>
      第一种方案修改VUEX
    </div>
    <input type="text" v-model="name">
    <button @click="editName">修改名称</button>

    <div>
      第二种方案修改VUEX
    </div>
    <input type="text" v-model="name1">
    <button @click="editName1">修改名称</button>
    <!-- <VTest text="我是root基座下的test组件，现在在vue2中使用，没想到我能在子应用中使用吧！哈哈哈" /> -->
  </div>
</template>

<script>
import { dispatch } from '@/shared'

export default {
  data() {
    return {
      name: '',
      name1: ''
    }
  },
  methods: {
    editName() {
      console.log(this.name, window.Store)
      window.Store.dispatch('test/setUserName', this.name)
    },
    editName1() {
      dispatch('editName', this.name1)
    }
  }
}
</script>
