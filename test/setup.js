import {cleanup} from '@testing-library/vue'
import {expect, afterEach, beforeEach} from 'vitest'
import '@testing-library/jest-dom'
import {setActivePinia, createPinia} from 'pinia'
import 'element-plus/dist/index.css'


expect.extend({})

beforeEach(() => {
  // setup the Pinia store before each test
  const pinia = createPinia()
  setActivePinia(pinia)
})

afterEach(() => {
  // cleanup the DOM after each test
  cleanup()
})
// reset the localStorage after each test  
afterEach(() => {
  localStorage.clear()
})
