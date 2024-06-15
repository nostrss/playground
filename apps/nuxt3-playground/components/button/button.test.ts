// tests/components/FooterLink.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Button from '@/components/button/button.test'

describe('FooterLink', () => {
  it('renders correctly with given props', async () => {
    const text = 'Test Link'
    const href = '/test-path'

    const wrapper = mount(Button, {
      props: {
        text,
        href,
      },
    })

    // Wait for component to be fully rendered
    await wrapper.vm.$nextTick()

    // Find the NuxtLink component within FooterLink
    const nuxtLink = wrapper.findComponent({ name: 'NuxtLink' })

    // Assert that the NuxtLink component exists
    expect(nuxtLink.exists()).toBe(true)

    // Assert that the text content of NuxtLink matches props.text
    expect(nuxtLink.text()).toBe(text)

    // Assert that the 'to' prop of NuxtLink matches props.href
    expect(nuxtLink.props('to')).toBe(href)
  })
})
