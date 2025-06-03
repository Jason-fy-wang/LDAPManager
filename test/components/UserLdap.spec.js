import {expect,vi, describe,it} from 'vitest'
import useLdap from '@/pages/api/useLdap'
import {data2,objectclasses,objectclasses2} from '@/../test/data/data2'
import Login from '@/components/Login.vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'


describe('useLdap', () => {
    let pinia, wrapper
    beforeEach(() => {
        pinia = createTestingPinia({
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

        wrapper = mount(Login, {
            global: {
                plugins: [ElementPlus,
                    pinia,
                ]
            }
        })
    })

    afterEach(() => {
        vi.clearAllMocks()
        wrapper.unmount()
    })
    it('import data from file', async () => {
        const { getObjectAttribute} = useLdap()

        expect(data2).toBeDefined()
        expect(objectclasses).toBeDefined()
        expect(objectclasses2).toBeDefined()

        const attributes = getObjectAttribute(objectclasses2)
        console.log("attributes: ", attributes)

        // test arribute : structuals, abstracts, auxiliaries
        expect(attributes['structuals']).toEqual(['OpenLDAProotDSE',    'LDAProotDSE','dNSDomain','organization','organizationalUnit'])
        expect(attributes['abstracts']).toEqual(['top'])
        expect(attributes['auxiliaries']).toEqual(['posixAccount', 'certificationAuthority-V2'])

        // test specific object
        expect(attributes['OpenLDAProotDSE']['MAY']).toEqual(['cn'])
        expect(attributes['OpenLDAProotDSE']['MUST']).undefined
        expect(attributes['OpenLDAProotDSE']['SUP']).toEqual(['top'])
    })

})










