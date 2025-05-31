import {cleanup} from '@testing-library/vue'
import {expect, afterEach} from 'vitest'
import '@testing-library/jest-dom'

expect.extend({})

afterEach(() => {
  // cleanup the DOM after each test
  cleanup()
})
// reset the localStorage after each test  
afterEach(() => {
  localStorage.clear()
})
