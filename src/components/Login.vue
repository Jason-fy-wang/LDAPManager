<template>
    <div class="login-page">
        <el-card style="max-width:50%;width:45vw;margin:100px auto;">
            <el-form @submit.prevent="handleLogin" @keyup.enter="handleLogin" class="login-form" label-width="80px">
                <el-form-item label="Username">
                    <el-input v-model="username" autocomplete="off"  data-testid="username-input"/>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="password" type="password" autocomplete="off" data-testid="pwd-input"/>
                </el-form-item>
                <el-form-item label="Host">
                    <el-input v-model="host" autocomplete="off" data-testid="host-input"/>
                </el-form-item>
                <el-form-item label="Port">
                    <el-input v-model="port" autocomplete="off" data-testid="port-input"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleLogin" data-testid="login-btn">Login</el-button>
                    <el-button type="primary" @click="handleReset" data-testid="reset-btn">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-card>
  </div>
</template>
<script setup name="Login">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import useLdap from '@/pages/api/useLdap'
import {useObjectAttributes} from '@/store/ldapobjects'

const store = useObjectAttributes()
const {login} = useLdap()
const username = ref('cn=admin,dc=example,dc=com')
const password = ref('')
const host = ref('192.168.20.10')
const port = ref('389')
const router = useRouter()
const emit = defineEmits(['login'])


function handleLogin(){
    login(host.value, port.value,username.value, password.value)
        .then((res) => {
            console.log('Login response:', res)
            if (res === true) {
                store.login(username.value)
                ElMessage.success('Login successful')
                emit('login')
                router.push({ name: 'home' })
            } else {
                ElMessage.error('Login failed')
            }
        })
        .catch((error) => {
            console.error(error)
            ElMessage.error('Login failed')
        })
}

function handleReset(){
    username.value = ''
    password.value = ''
    host.value = ''
    port.value = ''
}

</script>
<style lang="less" scoped>
    
</style>