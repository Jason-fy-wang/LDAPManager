<template>
<div>
    <el-container class="main-container">
      <el-header class="main-header">
        <h2>Ldapmanager</h2>
      </el-header>
      <el-container class="main-content">
        <el-aside class="main-side">

          <el-tree 
            :data="treeData"
            :props="defaultProps"
            @node-click="nodeClick"
          >
          </el-tree>
        </el-aside>
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
import {ref, onMounted, reactive, computed} from 'vue'


const defaultProps = {
  children: 'children',
  label: 'label'
}

function nodeClick(data) {
  console.log(data)
}

let allAccount = ref([])

onMounted( async () => {
  allAccount.value = await ldap.searchAll()
    console.log(allAccount)
  });

const treeData = computed(() => {
     let data = {}
     var current  = data
     allAccount.value.forEach(element => {
        let groups = element.dn.split(',').toReversed()
        //console.log("ele = ", groups)
        groups.forEach(val => {
          if (null != val && val != "") {
            if (!current[val]){
                current[val] = {}
            }
            current = current[val]
        }
        })
        current = data
    })
    //console.log("data = ", data)
    let tree = []
    buildDn(data, tree)
    return tree
})

function buildDn(maps,res) {
  if (maps) {
   Object.keys(maps).forEach(k => {
    const item = res.find((ele) => ele.label === k)
    if (item) {
      item.children.push({
        label: k,
        children: []
      })
    }else{
      res.push({
        label: k,
        children: []
      })
    }
    
    const val = maps[k]
    if (val) {
      const item = res.find((ele) => ele.label === k)
      buildDn(val, item.children)
    }
   })
  }
}

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
      background-color: whitesmoke;
    }

    .main-side{
      width: 18vw;
      height: 100vh;
      background-color: blueviolet;
    }

    .display-content{
      height: 100vh;
      background-color: antiquewhite;
    }
  }

</style>