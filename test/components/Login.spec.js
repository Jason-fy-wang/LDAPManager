import {mount, shallowMount} from '@vue/test-utils'
import {expect, describe, it, beforeEach,vi} from 'vitest'
import Login from '@/components/Login.vue'
import useLdap from '@/pages/api/useLdap'
import {createTestingPinia} from '@pinia/testing'
import { useObjectAttributes } from '@/store/ldapobjects'
import { createRouter,createWebHistory } from 'vue-router'


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
    beforeEach(async () => {
        //await router.isReady()
    })
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
                    pinia,
                    router
                ]
            }
        })
        const store = useObjectAttributes()
        console.log("html:", wrapper.html())
        expect(wrapper.find('el-button').text()).toBe('Login')
    })
})






