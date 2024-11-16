<template>
    <div>
        <h2>Detail</h2>

        <h3>parameters: {{ route.params.dn }}</h3>

        <h5>obj: {{  dnObject?.dn || "" }}</h5>

        
    </div>
</template>
<script setup name="Detail">
import { useRoute } from 'vue-router'
import useLdap from '@/pages/api/useLdap'
import { onMounted, reactive, watch } from 'vue'
import {useObjectAttributes} from '@/store/ldapobjects'

const route = useRoute()
const {searchDn} = useLdap()
const attributeStore = useObjectAttributes()
const dnObject = reactive({})


watch(
    () => route.params.dn,
    async (newDn, oldDn) => {
        if (newDn !== oldDn) {
            console.log("watch searching: ",route.params.dn)
            const obj = await searchDn(route.params.dn)
            console.log(" obj = ", obj)
            if (obj) {
                attributeStore.fetchAttribute()
                Object.assign(dnObject, obj[0])
                console.log("attrobutes", attributeStore.attributes)
            }
        }
    }
)

onMounted( async () => {
    console.log("onMounted ")
    const {searchDn} = useLdap()
    console.log("onMounted searching: ",route.params.dn)
    const obj = await searchDn(route.params.dn)
    console.log("onMounted obj = ", obj)
    if (obj) {
        Object.assign(dnObject, obj[0])
        console.log("onMounted dnObject", dnObject)
        attributeStore.fetchAttribute()
    }
})


</script>


<style lang="less">
    
</style>