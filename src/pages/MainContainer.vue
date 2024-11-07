<template lang="">
<div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main> {{ allAccount }}</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import {ldap} from './api/ldap'
import {ref, onMounted} from 'vue'

const allAccount = ref(null) 

onMounted( async () => {
  allAccount.value =   await ldap.searchAll()
  console.log(allAccount)
})

</script>
<style lang="less" scoped>
    
</style>