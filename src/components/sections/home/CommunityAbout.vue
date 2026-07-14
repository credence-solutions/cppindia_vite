<!--
  CommunityAbout — Brief about section on homepage
-->
<template>
  <section class="section about-strip">
    <div class="container">
      <div class="about-strip__inner">
        <div class="about-strip__text gsap-reveal">
          <p class="about-strip__overline">About CppIndia</p>
          <h2 class="about-strip__title">
            A community for C++ developers — at every stage of their journey
          </h2>
          <p class="about-strip__body">
            CppIndia was founded to create a common platform that brings together
            people from all walks of life — students, fresh graduates, and experienced
            engineers — united by a mutual interest in C++. We run meetups on alternate
            Saturdays, mentor junior programmers, and connect companies with talented developers.
          </p>
          <div class="about-strip__actions">
            <RouterLink to="/about" class="btn btn--primary">Learn More</RouterLink>
            <RouterLink to="/join" class="btn btn--outline">Join the Community</RouterLink>
          </div>
        </div>

        <div class="about-strip__pillars gsap-reveal">
          <div
            v-for="pillar in pillars"
            :key="pillar.title"
            class="about-strip__pillar"
          >
            <div class="about-strip__pillar-icon" v-html="pillar.icon" />
            <h3 class="about-strip__pillar-title">{{ pillar.title }}</h3>
            <p class="about-strip__pillar-body">{{ pillar.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGsap } from '@/composables/useGsap'

const { staggerReveal } = useGsap()
onMounted(() => staggerReveal('.gsap-reveal', { y: 30 }))

const pillars = [
  {
    title: 'Tech Talks',
    body: 'Regular sessions every alternate Saturday — 60-minute talks on modern C++, tooling, and best practices.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  },
  {
    title: 'CppIndiaCon',
    body: 'Our annual C++ conference featuring international speakers, hands-on workshops, and networking.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  },
  {
    title: 'Mentorship',
    body: 'Connecting junior developers with experienced engineers for career guidance and code reviews.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
  },
  {
    title: 'Resources',
    body: 'Curated C++ standards, references, articles, and community-recommended learning materials.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
  },
]
</script>

<style lang="scss" scoped>
.about-strip {
  background: var(--color-bg);

  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: center;

    @include below(lg) { grid-template-columns: 1fr; gap: var(--space-10); }
  }

  &__overline {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: $color-secondary;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-3);
  }

  &__title {
    font-family: var(--font-secondary);
    font-size: clamp(var(--text-2xl), 3vw, var(--text-4xl));
    font-weight: var(--weight-bold);
    color: var(--color-text);
    line-height: 1.2;
    margin-bottom: var(--space-5);
  }

  &__body {
    font-size: var(--text-base);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-7);
  }

  &__actions {
    @include flex(center, flex-start, var(--space-4));
    flex-wrap: wrap;
  }

  &__pillars {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-5);
  }

  &__pillar {
    padding: var(--space-6);
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    transition: all var(--transition-base);

    &:hover {
      border-color: rgba(79, 142, 247, 0.25);
      box-shadow: $glow-primary;
      transform: translateY(-2px);
    }

    &-icon {
      width: 52px; height: 52px;
      @include flex(center, center);
      background: rgba(79, 142, 247, 0.08);
      border-radius: var(--radius-lg);
      color: $color-primary;
      margin-bottom: var(--space-4);
    }

    &-title {
      font-family: var(--font-secondary);
      font-size: var(--text-base);
      font-weight: var(--weight-bold);
      color: var(--color-text);
      margin-bottom: var(--space-2);
    }

    &-body {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      line-height: var(--leading-relaxed);
    }
  }
}
</style>
