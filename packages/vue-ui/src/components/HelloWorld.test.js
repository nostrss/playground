import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HelloWorld from './HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders the message and default greeting', () => {
    const wrap = mount(HelloWorld, {
      props: {
        msg: 'Welcome to the test, ',
      },
    })
    expect(wrap.text()).toContain('Welcome to the test, Hello world')
  })
})
