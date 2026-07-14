// =============================================================================
// useGsap — Composable wrapping GSAP ScrollTrigger animations
// Handles cleanup automatically on component unmount
// =============================================================================
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Returns animate helpers pre-wired to the component lifecycle.
 * All created ScrollTriggers are killed on unmount.
 */
export function useGsap() {
  const triggers = []

  // Cleanup on unmount
  onUnmounted(() => {
    triggers.forEach((t) => t.kill())
  })

  /**
   * Fade-up reveal on scroll
   * @param {string|Element} target — CSS selector or DOM element
   * @param {Object} options
   */
  const fadeUp = (target, options = {}) => {
    const {
      delay = 0,
      duration = 0.8,
      ease = 'power3.out',
      y = 40,
      start = 'top 88%',
      stagger = 0,
    } = options

    const tl = gsap.fromTo(
      target,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        stagger,
        scrollTrigger: {
          trigger: typeof target === 'string' ? target : target,
          start,
          once: true,
        },
      }
    )
    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
    return tl
  }

  /**
   * Slide in from left
   */
  const slideLeft = (target, options = {}) => {
    const { duration = 0.8, ease = 'power3.out', x = -60, start = 'top 85%' } = options
    const tl = gsap.fromTo(
      target,
      { opacity: 0, x },
      {
        opacity: 1,
        x: 0,
        duration,
        ease,
        scrollTrigger: { trigger: target, start, once: true },
      }
    )
    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
    return tl
  }

  /**
   * Slide in from right
   */
  const slideRight = (target, options = {}) => {
    const { duration = 0.8, ease = 'power3.out', x = 60, start = 'top 85%' } = options
    const tl = gsap.fromTo(
      target,
      { opacity: 0, x },
      {
        opacity: 1,
        x: 0,
        duration,
        ease,
        scrollTrigger: { trigger: target, start, once: true },
      }
    )
    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
    return tl
  }

  /**
   * Stagger reveal — animates multiple elements one after another
   */
  const staggerReveal = (targets, options = {}) => {
    const {
      duration = 0.7,
      stagger = 0.12,
      y = 32,
      ease = 'power3.out',
      start = 'top 85%',
      trigger = targets,
    } = options

    const tl = gsap.fromTo(
      targets,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: { trigger, start, once: true },
      }
    )
    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
    return tl
  }

  /**
   * Animated counter (number counts up on scroll)
   */
  const counter = (el, { end = 100, duration = 2, start = 'top 85%' } = {}) => {
    const obj = { val: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString()
          },
        })
      },
    })
    triggers.push(st)
    return st
  }

  /**
   * Parallax — element moves at a different rate to scroll
   */
  const parallax = (target, { speed = 0.3, start = 'top bottom', end = 'bottom top' } = {}) => {
    const st = gsap.to(target, {
      y: () => (window.innerHeight * speed),
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        start,
        end,
        scrub: true,
      },
    })
    if (st.scrollTrigger) triggers.push(st.scrollTrigger)
    return st
  }

  /**
   * Scale in on scroll
   */
  const scaleIn = (target, options = {}) => {
    const { duration = 0.7, ease = 'power3.out', scale = 0.9, start = 'top 88%' } = options
    const tl = gsap.fromTo(
      target,
      { opacity: 0, scale },
      {
        opacity: 1,
        scale: 1,
        duration,
        ease,
        scrollTrigger: { trigger: target, start, once: true },
      }
    )
    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
    return tl
  }

  return { gsap, ScrollTrigger, fadeUp, slideLeft, slideRight, staggerReveal, counter, parallax, scaleIn }
}
