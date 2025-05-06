<template>
        <h2>add operation</h2>
        <el-card style="width:60%" shadow="hover">
            <el-form label-width="auto" style="max-width: 35vw;">
                <el-form-item label="parent">
                    <el-input 
                        type="string"
                        :readonly="true"
                        :value="route.query.dn"
                    />
                </el-form-item>
                <el-form-item label="dn">
                    <el-input 
                        type="string"
                    />
                </el-form-item>
                <el-form-item v-for="obj in objects">
                    <el-input 
                        type="string"
                    />
                </el-form-item>

                <el-form-item label="objectclass">
                    <el-select placeholder="objectclass" >
                        <el-option v-for="item in allObjectClass()" :label="item" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="allObjectClass">Create</el-button>
                    <el-button>new objectclass</el-button>
                </el-form-item>
            </el-form>
        </el-card>
</template>
<script setup name="Entryadd">
import { useRoute,useRouter } from 'vue-router'
import {reactive} from 'vue'
import { useObjectAttributes } from '@/store/ldapobjects'


const route = useRoute()
const router = useRouter()
const objects = reactive([])
const attributeStore = useObjectAttributes()


function allObjectClass() {
    return Object.keys(attributeStore.attributes)
}

</script>
<style lang="less">
    
</style>