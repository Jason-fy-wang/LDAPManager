import { createPinia, setActivePinia } from "pinia"

export function createTestPinia(){
    const pinia = createPinia()
    setActivePinia(pinia)
    return pinia
}






