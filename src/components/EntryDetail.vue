<template>
    <div class="main-content">
        <!-- <h2>{{ route.params.dn }}</h2> -->
        <el-card style="width:60%" shadow="hover">
            <el-form label-width="auto" style="max-width: 35vw;">
                <template v-for="item in Object.keys(dnObject)">
                    <div v-if="item === 'objectClass'" >
                        <el-form-item v-for="objclass in getObjectClassAsArray(item)" :label="objclass" class="display-input-label">
                            <el-collapse accordion>
                                <el-collapse-item :title="objclass" name="1">
                                    <div v-for="objattr in attributeStore.attributes[objclass]?.MUST">
                                        <div>
                                            <span>{{objattr}}</span>
                                            <el-input
                                                type="string"
                                                :readonly="true"
                                                :value="dnObject[objattr]"
                                                :show-password="objattr.indexOf('Password')>=0 || objattr.indexOf('password')>=0"
                                                class="display-input"
                                            />
                                        </div>
                                    </div>
                                    <div v-for="objclassAttr in attributeStore.attributes[objclass]?.MAY">
                                        <div>
                                            <span>{{objclassAttr}}</span>
                                            <el-input
                                                type="string"
                                                :readonly="true"
                                                :value="dnObject[objclassAttr]"
                                                :show-password="objclassAttr.indexOf('Password')>=0 || objclassAttr.indexOf('password')>=0"
                                                class="display-input"
                                            />
                                        </div>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </el-form-item>
                    </div>
                    <el-form-item v-if="!dnAttributes.includes(item) && item !=='objectClass'"  :label="item" class="display-input-label">
                        <el-input
                            type="string"
                            :readonly="true"
                            :value="dnObject[item]"
                            :show-password="item.indexOf('Password')>=0 || item.indexOf('password')>=0"
                            class="display-input"
                        />
                    </el-form-item>
                </template>
            </el-form>
        </el-card>
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

function getObjectClassAsArray(objclass){
    var clz = []
    if (Array.isArray(dnObject[objclass])){
        clz.push(...dnObject[objclass])
    }else{
        clz.push(dnObject[objclass])
    }
    return clz
}

function getAllDnAttributes() {
    dnAttributes.splice(0, dnAttributes.length)
    console.log("dnObject[objectClass]", dnObject["objectClass"])
    if(Array.isArray(dnObject["objectClass"])){
        for (const clz of dnObject["objectClass"]) {
            append(clz)
        }
    }else{
        append(dnObject["objectClass"])
    }
    //dnAttributes.splice(0,1,"dn") 
    console.log("dnAttributes == ", dnAttributes)
}


onMounted( async () => {
    const {searchDn} = useLdap()
    const obj = await searchDn(route.params.dn)
    console.log("onMounted obj = ", obj)
    if (obj) {
        Object.assign(dnObject, obj[0])
        console.log(Object.keys(dnObject))
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
                color: rgb(24, 21, 21);
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