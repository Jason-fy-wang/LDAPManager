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
            <el-form-item label="dn">
                <div class="class-for-dn">
                    <el-select class="class-for-dn-select" placeholder="attribute" v-model="formval.attr">
                        <el-option v-for="item in getAllMustAttributes()" :label="item" :value="item" />
                    </el-select>
                    <el-input
                    type="string"
                    @blur="onInputBlur()"
                    v-model="formval.attrval"/>
                </div>
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
                <el-select @change="objectClassChange" placeholder="objectclass" v-model="tempobjclass">
                    <el-option v-for="item in allObjectClass()" :label="item" :value="item" />
                </el-select>
            </el-form-item>
            <el-form-item class="class-for-add-btn">
                <div>
                    <el-button type="primary" @click="handCreate">Create</el-button>
                    <el-button type="primary" @click="addObjectClass">{{ addObjectBtn }}</el-button>
                </div>
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

// define event to send
const emit = defineEmits(['created'])

const route = useRoute()
const objects = reactive([])
const addObjectBtn = ref("select objectclass")

const attributeStore = useObjectAttributes()
const {addEntry} = useLdap()


const formval = reactive({
    objectClass: [],
    attr: '',
    attrval: '',
})
const tempobjclass = ref('')

function objectClassChange(value){
    console.log("objectClassChange", value)
    if (value !== ''){
        addObjectBtn.value = "add objectclass"
    }
}

function handCreate(){
    var dn = route.query.dn
    const attr = formval['attr']
    const attrval = formval['attrval']
    delete formval['dn']
    delete formval['attr']
    delete formval['attrval']
    dn = attr + '=' + attrval + ',' +dn
    //console.log("form value: ", formval, dn, JSON.stringify(formval))
    //console.log("dn: ", {...Object.fromEntries(Object.entries(formval)), objectClass: Array.from(formval.objectClass), [attr]: attrval})
    // [attr]: attrval,   // use attr'value as key
    const entry = {
        ...Object.fromEntries(Object.entries(formval)),
        objectClass: formval.objectClass.slice(),   // overwrite objectClass
    }

    addEntry(dn, entry).then((res) => {
        console.log('addEntry entry response:', res)
        if(res.success){
            ElMessage.success('Create entry success')
            emit('created', {dn, entry})
        }else{
            ElMessage.error('Create entry failed '+ res.error)
        }
    }).catch((error) => {
        console.log(error)
        ElMessage.error('Create entry failed')
    })
}

function allObjectClass() {
    if (objects.length > 0){
        return attributeStore.attributes['auxiliaries']
    }else{
        return attributeStore.attributes['structuals']
    }
}

// copy dn to formval
function onInputBlur(){
    console.log("onInputBlur", formval.attr, formval.attrval)
    if (formval.attr !== '' && formval.attrval !== ''){
        formval[formval.attr] = formval.attrval
    }
}

function getAllMustAttributes() {
    const must = []
    for (const obj of objects){
        if (attributeStore.attributes[obj]?.MUST){
            must.push(...attributeStore.attributes[obj].MUST)
        }
        // get parent objectclass MUST attributes
        if (attributeStore.attributes[obj]?.SUP){
            for (const sup of attributeStore.attributes[obj].SUP){
                if (attributeStore.attributes[sup]?.MUST){
                    must.push(...attributeStore.attributes[sup].MUST)
                }
            }
        }
    }
    return must
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
<style lang="less" scoped>
    .class-for-dn{
        display: flex;
        max-width: 35vw;
        width: 35vw;
        flex-direction: row;
        justify-content: space-between;

        .class-for-dn-select{
            width: 15vw;
        }
    }

    .class-for-add-btn{
        :deep(.el-form-item__content){
            justify-content: center;
            gap: 20px;
        }

    }

</style>