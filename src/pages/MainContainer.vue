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
            :highlight-current="true"
            @node-click="nodeClick"
            :render-content="renderTreeNode"
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
<script setup name="Main" lang="jsx">
import { RouterView } from 'vue-router'
import useLdap from './api/useLdap'
import {ref, onMounted, reactive, computed} from 'vue'
import { useRouter } from 'vue-router'

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
      background-color: whitesmoke;
    }

    .main-side{
      width: 18vw;
      height: 100vh;
      //background-color: blueviolet;
    }

    .display-content{
      height: 100vh;
      background-color: antiquewhite;
    }
  }

</style>