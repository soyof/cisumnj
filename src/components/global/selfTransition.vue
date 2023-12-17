<template>
  <transition
    @beforeEnter="beforeEnter"
    @enter="enter"
    @afterEnter="afterEnter"
    @beforeLeave="beforeLeave"
    @leave="leave"
    @afterLeave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SelfTransition',
  data() {
    return {
      tranStyle: 'height 0.3s ease-in-out'
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.transition = this.tranStyle
      if (!el.dataset) el.dataset = {}
      el.style.height = 0
    },
    enter(el) {
      if (el.scrollHeight !== 0) {
        el.style.height = `${el.scrollHeight}px`
      } else {
        el.style.height = ''
      }
      el.style.overflow = 'hidden'
    },
    afterEnter(el) {
      el.style.transition = ''
      el.style.height = ''
    },
    beforeLeave(el) {
      if (!el.dataset) el.dataset = {}
      el.style.height = `${el.scrollHeight}px`
      el.style.overflow = 'hidden'
    },
    leave(el) {
      if (el.scrollHeight !== 0) {
        el.style.transition = this.tranStyle
        el.style.height = 0
      }
    },
    afterLeave(el) {
      el.style.transition = ''
      el.style.height = ''
    }
  }
})
</script>
