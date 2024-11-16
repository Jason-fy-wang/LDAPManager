<template>
<div>
    <el-container class="main-container">
      <el-aside class="main-side">
        <div class="left-side-image">
          <el-image :src="ldapimage"/>
        </div>
        <div class="spliter"></div>
      <el-tree 
        :data="treeData"
        :props="defaultProps"
        highlight-current
        @node-click="nodeClick"
        :render-content="renderTreeNode"
        class="left-side-tree"
      >
      </el-tree>
      </el-aside>
      <el-container class="main-content">
        <el-header class="main-header">
            <h2>Ldapmanager</h2>
        </el-header>
        <el-main class="display-content">
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup name="Main" lang="jsx">
import { RouterView } from 'vue-router'
import useLdap from './api/useLdap'
import {ref, onMounted, reactive, computed} from 'vue'
import { useRouter } from 'vue-router'
import ldapimage from '@/assets/ldap.png'

const router = useRouter()
const defaultProps = {
  children: 'children',
  label: 'label'
}

function renderTreeNode (h, {node, data}) {
  //console.log("data = ", data)
  return (
    <span>
      <el-icon size="20" style="margin-right: 5px;"><Folder /></el-icon>
      {data.label}
    </span>
  )
}

function nodeClick(data) {
  const dn = getFullDn(treeData.value, data.label)
  console.log(dn)
  router.push({name: "detail", params: {dn}})
}

function getFullDn(data, targetLabel){
    let path = []

    function search(nodes, curpath) {
        for (let node of nodes) {

            const newpath = [...curpath, node.label]

            if (node.label === targetLabel) {
                path = newpath
                return path
            }

            if (node.children && node.children.length > 0) {
                if(search(node.children,  newpath)){
                    return true
                }
            }
        }
    }

    search(data, [])

    return path.length >0 ? path.reverse().join(","):null

}

let allAccount = ref([])

onMounted( async () => {
    const {searchAll, objectClasses} = useLdap()
    allAccount.value = await searchAll()
    //console.log(allAccount)
    const res = await objectClasses()  
    console.log("object class:", res)

    //const dn = await searchDn("uid=john,ou=person,dc=example,dc=com")
    //console.log("dn : ", dn)
  }
  
);

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
      background-color: #16142a;
      color: #97b1cd;
      border-bottom: 2px solid rgb(45, 49, 49);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      
    }

    .main-side{
      width: 18vw;
      height: 100vh;
      background-color: #16142a;
      border-right: 2px solid rgb(45, 49, 49);
      // side image
      .left-side-image {
        width: 10vw;
        margin-top: 1vh;
        margin-left: 3vw;

      }

      .spliter{
        height: 1px;
        margin-top: 10px;
        margin-bottom: 15px;
        margin-left: 16px;
        width: 90%;
        background-color: rgb(45, 49, 49);
      }

      .left-side-tree {
        margin-left: 1vw;
        background-color: #16142a;
        font-size: 17px;
        font-weight: 800;
        color: #4b458d;
          .el-tree-node__content {
            &:hover {
            background-color: #4e72ec; /* 鼠标悬停时的背景色 */
            }
        }
        // hightlight selected tree node 
        .el-tree-node {
          .is-current {
            background-color: #2451f4;
          }
        }
      }
    }

    .display-content{
      height: 100vh;
      background-color: #16142a;
      font-size: 17px;
      font-weight: bold;
      color:white;
      border-left-width: 10px;
      border-left-color: white;
    }
  }

</style>