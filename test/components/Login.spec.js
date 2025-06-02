import {flushPromises, mount, shallowMount} from '@vue/test-utils'
import {expect, describe, it, beforeEach,vi} from 'vitest'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {createTestingPinia} from '@pinia/testing'
import { useObjectAttributes } from '@/store/ldapobjects'
import { createRouter,createWebHistory } from 'vue-router'
import {fireEvent, render} from '@testing-library/vue'
import Login from '@/components/Login.vue'


// Create mock router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: { template: '<div>Home</div>' }
        }
    ]
})

// mock login function
const loginMock = vi.fn().mockResolvedValue(true)
vi.mock('@/pages/api/useLdap', () => ({
    default: () => ({
        login: loginMock
    })
}))

describe('Login.vue',  () => {
    it('render properly', async()=> {
        const pinia = createTestingPinia({
            initialState: {
                objectattribute: {
                    attributes: {},
                    loginState: false,
                    loginName: "anonymous",
                    displayName: "anonymous",
                    domainName: "anonymous",
                }
            },
            stubActions: false
        })
        const wrapper = mount(Login, {
            global: {
                plugins: [
                    ElementPlus,
                    pinia,
                    router
                ]
            }
        })
        //console.log("html:", wrapper.html())  

        //await wrapper.vm.$nextTick()
        await flushPromises()
        //console.log("element plus:", ElementPlus)

        const userInput = wrapper.find('[data-testid="username-input"]')
        const pwdInput = wrapper.find('[data-testid="pwd-input"]')
        const hostInput = wrapper.find('[data-testid="host-input"]')
        const port = wrapper.find('[data-testid="port-input"]')
        expect(userInput.exists()).toBe(true)
        expect(pwdInput.exists()).toBe(true)
        expect(hostInput.exists()).toBe(true)
        expect(port.exists()).toBe(true)

        // input value
        userInput.setValue('testuser')
        pwdInput.setValue('testpassword')
        hostInput.setValue('testhost')
        port.setValue('389')
        await flushPromises()

        // begin trigger login function
        const loginButton = wrapper.find('[data-testid="login-btn"]')
        expect(loginButton.exists()).toBe(true)
        await loginButton.trigger('click')
        expect(loginMock).toHaveBeenCalledTimes(1)
        expect(loginMock).toHaveBeenCalledWith(
            'testhost',
            '389',
            'testuser',
            'testpassword'
        )
    })
})






