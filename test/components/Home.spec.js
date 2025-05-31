import {expect, describe, it} from 'vitest'
import {mount,shallowMount} from '@vue/test-utils'

describe('Home.vue', () => {

    it('render properly', async () => {
        const Home = (await import('@/components/Home.vue')).default
        const wrapper = mount(Home, ()=>{

        })
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.find('h1').text()).toBe('Ldapmanager')
    })

    it('shadow render', async ()=> {
        const Home = (await import('@/components/Home.vue')).default
        const wrapper = shallowMount(Home, {
            props: {
                msg: 'Ldapmanager'
            }
        })
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.find('h1').text()).toBe('Ldapmanager')
    })
})


