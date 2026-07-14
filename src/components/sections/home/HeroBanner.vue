<!--
  HeroBanner — CppIndia homepage hero
  "India's very own C++ Community"
-->
<template>
  <section class="hero" aria-label="Hero banner">
    <div class="hero__bg-grid" aria-hidden="true" />

    <div class="container hero__inner">
      <!-- Left: text content -->
      <div class="hero__content">
        <div class="hero__badge gsap-reveal">
          <span class="hero__badge-dot" aria-hidden="true" />
          India's C++ User Group · Est. {{ SITE.founded }}
        </div>

        <h1 class="hero__title gsap-reveal">
          India's very own<br />
          <span class="hero__title-accent">C++ Community</span>
        </h1>

        <p class="hero__subtitle gsap-reveal">
          A welcoming space for C++ developers — from students to seasoned engineers —
          to connect, learn, and grow together through regular tech talks and our
          annual conference, CppIndiaCon.
        </p>

        <div class="hero__actions gsap-reveal">
          <a
            :href="SITE.discordInvite"
            class="btn btn--primary btn--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconDiscord />
            Join on Discord
          </a>
          <RouterLink to="/tech-talks" class="btn btn--outline-white btn--lg">
            Watch Tech Talks
          </RouterLink>
        </div>

        <div class="hero__stats gsap-reveal">
          <div v-for="stat in STATS" :key="stat.label" class="hero__stat">
            <span class="hero__stat-value">{{ stat.value }}{{ stat.suffix }}</span>
            <span class="hero__stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <!-- Right: conference card -->
      <div class="hero__card gsap-reveal-right">
        <div class="hero__card-tag">CppIndiaCon 2024</div>
        <h2 class="hero__card-title">The C++ Festival of India</h2>
        <p class="hero__card-desc">
          Our 4th annual conference brought together 8 international C++ experts for
          two days of talks, workshops, and networking.
        </p>

        <div class="hero__card-speakers">
          <span
            v-for="speaker in speakers"
            :key="speaker"
            class="hero__card-speaker"
          >{{ speaker }}</span>
        </div>

        <div class="hero__card-footer">
          <RouterLink to="/conference?year=2024" class="hero__card-btn">
            View Conference
            <IconArrow />
          </RouterLink>
          <RouterLink to="/tech-talks" class="hero__card-btn hero__card-btn--ghost">
            Past Talks
          </RouterLink>
        </div>

        <!-- Decorative code snippet -->
        <pre class="hero__code" aria-hidden="true"><code><span class="tok-kw">template</span>&lt;<span class="tok-kw">typename</span> T&gt;
<span class="tok-kw">concept</span> <span class="tok-type">CppDev</span> =
  std::is_curious_v&lt;T&gt; &amp;&amp;
  std::loves_cpp&lt;T&gt;;</code></pre>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero__scroll" aria-hidden="true">
      <span>Scroll</span>
      <div class="hero__scroll-line" />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { SITE, STATS } from '@/constants'
import { useGsap } from '@/composables/useGsap'

const IconDiscord = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>` }
const IconArrow   = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>` }

const speakers = ['Alex Dathskovsky', 'Ankur Satle', 'Jonathan Müller', 'Mike Shah']

const { staggerReveal, slideRight } = useGsap()

onMounted(() => {
  staggerReveal('.gsap-reveal', { y: 30, delay: 0.1 })
  slideRight('.gsap-reveal-right')
})
</script>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
  background: $gradient-hero;
  position: relative;
  overflow: hidden;
  @include flex(center, center);

  // Ambient glow blobs
  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  &::before {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(79, 142, 247, 0.12) 0%, transparent 70%);
    top: -100px;
    left: -100px;
  }

  &::after {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(155, 116, 245, 0.10) 0%, transparent 70%);
    bottom: -80px;
    right: -60px;
  }

  &__bg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(79, 142, 247, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(79, 142, 247, 0.05) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
    align-items: center;
    padding-top: calc(var(--navbar-height) + var(--space-12));
    padding-bottom: var(--space-16);
    position: relative;
    z-index: 1;

    @include below(lg) {
      grid-template-columns: 1fr;
      gap: var(--space-10);
    }
  }

  &__badge {
    @include flex(center, flex-start, var(--space-2));
    display: inline-flex;
    padding: var(--space-2) var(--space-4);
    background: rgba(79, 142, 247, 0.12);
    border: 1px solid rgba(79, 142, 247, 0.28);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: $color-primary-light;
    letter-spacing: 0.04em;
    margin-bottom: var(--space-5);
  }

  &__badge-dot {
    width: 7px; height: 7px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  &__title {
    font-family: var(--font-secondary);
    font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: var(--weight-extrabold);
    color: white;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: var(--space-5);

    &-accent {
      @include text-gradient($color-secondary, #60a5fa);
    }
  }

  &__subtitle {
    font-size: clamp(var(--text-base), 1.8vw, var(--text-lg));
    color: rgba(255,255,255,0.75);
    line-height: var(--leading-relaxed);
    max-width: 520px;
    margin-bottom: var(--space-8);
  }

  &__actions {
    @include flex(center, flex-start, var(--space-4));
    flex-wrap: wrap;
    margin-bottom: var(--space-10);

    .btn { @include flex(center, flex-start, var(--space-2)); }
  }

  &__stats {
    @include flex(center, flex-start, var(--space-8));
    flex-wrap: wrap;
    padding-top: var(--space-6);
    border-top: 1px solid rgba(255,255,255,0.1);
  }

  &__stat {
    display: flex;
    flex-direction: column;
    gap: 2px;

    &-value {
      font-family: var(--font-secondary);
      font-size: var(--text-2xl);
      font-weight: var(--weight-extrabold);
      color: white;
      line-height: 1;
    }

    &-label {
      font-size: var(--text-xs);
      color: rgba(255,255,255,0.55);
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
  }

  // Conference card
  &__card {
    background: rgba(255,255,255,0.07);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    position: relative;
    overflow: hidden;

    &-tag {
      display: inline-block;
      padding: var(--space-1) var(--space-3);
      background: $color-secondary;
      color: white;
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
      font-weight: var(--weight-bold);
      letter-spacing: 0.04em;
      margin-bottom: var(--space-4);
    }

    &-title {
      font-family: var(--font-secondary);
      font-size: var(--text-2xl);
      font-weight: var(--weight-bold);
      color: white;
      margin-bottom: var(--space-3);
      line-height: 1.2;
    }

    &-desc {
      font-size: var(--text-sm);
      color: rgba(255,255,255,0.65);
      line-height: var(--leading-relaxed);
      margin-bottom: var(--space-5);
    }

    &-speakers {
      @include flex(flex-start, flex-start, var(--space-2));
      flex-wrap: wrap;
      margin-bottom: var(--space-6);
    }

    &-speaker {
      padding: var(--space-1) var(--space-3);
      background: rgba(255,255,255,0.1);
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
      color: rgba(255,255,255,0.8);
    }

    &-footer {
      @include flex(center, flex-start, var(--space-3));
      margin-bottom: var(--space-6);
    }

    &-btn {
      @include flex(center, flex-start, var(--space-1));
      padding: var(--space-2) var(--space-4);
      background: $color-secondary;
      color: white;
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      font-weight: var(--weight-semibold);
      transition: all var(--transition-fast);

      &:hover { background: $color-secondary-dark; }

      &--ghost {
        background: transparent;
        border: 1px solid rgba(255,255,255,0.25);
        &:hover { background: rgba(255,255,255,0.08); }
      }
    }
  }

  // Code snippet decoration
  &__code {
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--radius-lg);
    padding: var(--space-4) var(--space-5);
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255,255,255,0.6);

    .tok-kw   { color: #c792ea; }
    .tok-type { color: #82aaff; }
  }

  // Scroll indicator
  &__scroll {
    position: absolute;
    bottom: var(--space-8);
    left: 50%;
    transform: translateX(-50%);
    @include flex(center, center);
    flex-direction: column;
    gap: var(--space-2);
    color: rgba(255,255,255,0.4);
    font-size: var(--text-xs);
    letter-spacing: 0.1em;
    text-transform: uppercase;

    @include below(md) { display: none; }
  }

  &__scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
    animation: fadeDown 2s ease-in-out infinite;
  }
}
</style>
