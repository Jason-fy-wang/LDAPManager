<template>
<div>
    <el-container class="main-container">
      <el-header class="main-header">Header</el-header>
      <el-container class="main-content">
        <el-aside class="main-side">Aside</el-aside>
        <el-main class="display-content">
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup name="Main">
import { RouterView } from 'vue-router'
import {ldap} from './api/ldap'
import {ref, onMounted} from 'vue'

const allAccount = ref(null) 

onMounted( async () => {
  allAccount.value =   await ldap.searchAll()
  console.log(allAccount)
})

</script>
<style lang="less" scoped>
  .main-container{
    width: 100vw;
    height: 100vh;

    .main-content{
      width: 100vw;
      height: 100vh;
    }

    .main-header {
      height: 10vh;
      background-color: darkgreen;
    }

    .main-side{
      width: 10vw;
      height: 100vh;
      background-color: blueviolet;
    }

    .display-content{
      height: 100vh;
      background-color: antiquewhite;
    }
  }

</style>