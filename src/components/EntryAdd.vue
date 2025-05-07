<template>
    <h2>add operation</h2>
    <el-card style="width:60%" shadow="hover">
        <el-form label-width="auto" :model="formval" style="max-width: 35vw;">
            <el-form-item label="parent">
                <el-input 
                    type="string"
                    :readonly="true"
                    :value="route.query.dn"
                />
            </el-form-item>
            <el-form-item v-for="obj in objects" label="objectclass">
                <el-collapse accordion>
                        <el-collapse-item :title="obj" :name="obj">
                            <div>
                                <div v-for="attr in attributeStore.attributes[obj]?.MUST">
                                    <span>{{attr}}</span>
                                    <el-input
                                        type="string"
                                        required
                                        v-model="formval[attr]"
                                    />
                                </div>
                                <el-divider content-position="center">Optional</el-divider>
                                <div v-for="attr in attributeStore.attributes[obj]?.MAY">
                                    <span>{{attr}}</span>
                                    <el-input
                                        type="string"
                                        v-model="formval[attr]"
                                    />
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
            </el-form-item>

            <el-form-item label="objectclass">
                <el-select placeholder="objectclass" v-model="tempobjclass">
                    <el-option v-for="item in allObjectClass()" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handCreate">Create</el-button>
                <el-button @click="addObjectClass">new objectclass</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script setup name="Entryadd">
import { useRoute,useRouter } from 'vue-router'
import {reactive, ref} from 'vue'
import { useObjectAttributes } from '@/store/ldapobjects'
import { ElMessage,ElMessageBox } from 'element-plus'
import useLdap from '@/pages/api/useLdap'


const route = useRoute()
const router = useRouter()
const objects = reactive([])
const attributeStore = useObjectAttributes()
const {addEntry, delEntry} = useLdap()

const formval = reactive({
    objectClass: [],
})
const tempobjclass = ref('')

function handCreate(){
    const dn = route.query.dn
    delete formval['dn']
    console.log("form value: ", formval, dn, JSON.stringify(formval))
    addEntry("ou=HR,dc=example,dc=com", {
        objectClass: ["organizationalUnit"],
        ou: "HR"
    })
}

function allObjectClass() {
    return Object.keys(attributeStore.attributes)
}

function addObjectClass(){
    if (tempobjclass.value === ''){
        ElMessageBox.alert('please select a valid objectclass', 'Warning')
    }else{
        // ignore duplicate value
        const val = tempobjclass.value
        if(objects.indexOf(val) < 0){
            objects.push(val)
            formval.objectClass.push(val)
        }
    }
}

</script>
<style lang="less">
    
</style>