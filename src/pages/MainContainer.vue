<template>
<div>
    <el-container class="main-container">
      <el-aside class="main-side" v-show="store.isLogin">
        <div class="left-side-image">
          <el-image :src="ldapimage"/>
        </div>
        <div class="spliter"></div>
      <el-tree 
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        highlight-current
        @node-click="nodeClick"
        :render-content="renderTreeNode"
        class="left-side-tree"
      >
      </el-tree>
      </el-aside>
      <el-container class="main-content">
        <el-header class="main-header" v-show="store.isLogin">
          <div>
            <h2>Ldapmanager</h2>
          </div>
            <div class="user-profile">
              <UserProfile :username="store.userName"/>
              <el-image :src="ldapimage" style="height: 38px; width: 38px;" class="user-profile-image"/>
            </div>
        </el-header>
        <el-main class="display-content">
          <RouterView v-slot="{Component}">
            <component :is="Component" @created="entryCreated" @delete="entryDelete" @login="handleLogin"/>
            </RouterView>
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
import { ElMessage, ElMessageBox } from 'element-plus'

import {useObjectAttributes} from '@/store/ldapobjects'
import UserProfile from '@/components/UserProfile.vue'

const {searchAll, objectClasses, delEntry} = useLdap()

let allAccount = ref([])
const store = useObjectAttributes()

//console.log("isLogin = ", ", store = ", store.isLogin)
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

function entryCreated(dn, entry) {
  console.log("entry created: ", dn, entry)
  reloadAllAccount()
}

function entryDelete(entry) {
  const childNode = getChildNode(entry.dn, treeData.value)
  if (childNode && childNode.length > 0) {
    ElMessage({
      type: 'error',
      message: 'Delete failed, please delete child node first!'
    })
  }else{
    ElMessageBox.confirm('Are you sure to delete this entry?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        console.log("delete entry: ", entry.dn)
        delEntry(entry.dn).then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete success!'
          })
          reloadAllAccount()
        })
      }).catch((e) => {
        console.log("delete cancel: ", e)
        ElMessage({
          type: 'info',
          message: 'Delete canceled'
        })
      })
  }
}


function reloadAllAccount() {
  searchAll().then(res => {
    allAccount.value = res
  })
}

async function handleLogin() {
  allAccount.value = await searchAll()
    //const res = await objectClasses()  
    //console.log("object class:", res)

}

// onMounted( async () => {
//     allAccount.value = await searchAll()
//     //console.log(allAccount)
//     const res = await objectClasses()  
//     console.log("object class:", res)

//     //const dn = await searchDn("uid=john,ou=person,dc=example,dc=com")
//     //console.log("dn : ", dn)
//   }
  
// );

// get dn correcponding child node 
function getChildNode(dn, treeData) {
  const firstLevel = dn.split(",")[0]
  
  for (const element of treeData) {
    if (element.label === firstLevel) {
      return element.children
    }
    if (element.children && element.children.length > 0) {
      const child = getChildNode(dn, element.children)
      if (child) {
        return child
      }
    }
  }
}

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
      height: 18vh;
      background-color: #16142a;
      color: #97b1cd;
      border-bottom: 2px solid rgb(45, 49, 49);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      
      .user-profile {
        margin-left: auto;
        margin-right: 2vw;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
      }
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