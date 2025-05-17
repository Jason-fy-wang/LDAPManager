<template>
    <div>
        <el-dropdown>
            <span class="el-dropdown-link">
                {{ username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>profile</el-dropdown-item>
                    <el-dropdown-item @click="handLogout">logout</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script setup name="UserProfile">

import {useRouter} from 'vue-router'
import { useObjectAttributes } from '@/store/ldapobjects'

const router = useRouter()

defineProps({
    username: {
        type: String,
        required: true
    }
})


const store = useObjectAttributes()

function handLogout() {
    store.logout()
    router.push({name: 'login'})
}

</script>
<style lang="less" scoped>
    
</style>