<template>
    <div class="main-content">
        <h2>Detail</h2>
        <el-form label-width="auto" style="max-width: 25vw;">
            <el-form-item v-for="item in dnAttributes" :label="item" class="display-input-label">
                <el-input
                    type="string"
                    :readonly="true"
                    :value="dnObject[item]"
                    :show-password="item.indexOf('Password')>=0 || item.indexOf('password')>=0"
                    class="display-input"
                />
            </el-form-item>
        </el-form>

        
    </div>
</template>
<script setup name="Detail">
import { useRoute } from 'vue-router'
import useLdap from '@/pages/api/useLdap'
import { onMounted, reactive, readonly, watch } from 'vue'
import {useObjectAttributes} from '@/store/ldapobjects'

const route = useRoute()
const {searchDn} = useLdap()
const attributeStore = useObjectAttributes()
const dnObject = reactive({})
const dnAttributes = reactive([])


watch(
    () => route.params.dn,
    async (newDn, oldDn) => {
        if (newDn !== oldDn) {
            const obj = await searchDn(route.params.dn)
            if (obj) {
                Object.assign(dnObject, obj[0])
                await attributeStore.fetchAttribute()
                getAllDnAttributes()
                console.log(" dnObject = ", dnObject)
            }
        }
    }
)

function append(clz) {
    console.log("appending object : ", clz)
    const attrObj = attributeStore.attributes
    if( attrObj[clz]?.MAY){
        dnAttributes.push(...attrObj[clz].MAY)
    }

    if( attrObj[clz]?.MUST){
        dnAttributes.push(...attrObj[clz].MUST)
    }
}

function getAllDnAttributes() {
    dnAttributes.splice(0, dnAttributes.length)
    if(Array.isArray(dnObject["objectClass"])){
        for (const clz of dnObject["objectClass"]) {
            append(clz)
        }
    }else{
        append(dnObject["objectClass"])
    }
    dnAttributes.splice(0,0,"dn")
}


onMounted( async () => {
    const {searchDn} = useLdap()
    const obj = await searchDn(route.params.dn)
    console.log("onMounted obj = ", obj)
    if (obj) {
        Object.assign(dnObject, obj[0])
        await attributeStore.fetchAttribute()
        getAllDnAttributes()
    }
})


</script>


<style lang="less">
    .main-content{
        .display-input-label {
            .el-input__wrapper{
                background-color: #16142a;
            }
            .el-form-item__label {
                color: white;
                font-weight: bold;
            }


            .display-input {
                border: 2px solid rgb(45, 49, 49) !important; 
                border-radius: 5px; 

                .el-input__inner {
                    box-shadow: none;
                    color: white;
                    font-weight: 700;
                }

            }
        }

    }
</style>