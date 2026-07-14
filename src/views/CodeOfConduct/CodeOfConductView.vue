<template>
  <div class="coc-page">
    <PageHero
      overline="Community Standards"
      title="Code of Conduct"
      subtitle="CppIndia is committed to providing a safe, inclusive, and welcoming environment for everyone."
      :breadcrumb="[{ label: 'Code of Conduct', path: '/code-of-conduct' }]"
    />

    <section class="section coc-page__body">
      <div class="container coc-page__content">
        <div class="coc-page__card">
          <div class="coc-page__intro">
            <h2 class="coc-page__section-title">Our Commitment</h2>
            <p>
              CppIndia events and spaces are open, inclusive, and positive environments.
              We want everyone — regardless of gender, gender identity and expression, sexual orientation,
              disability, physical appearance, body size, race, age, religion, or programming background —
              to feel welcome and safe.
            </p>
          </div>

          <div class="coc-page__berlin">
            <h2 class="coc-page__section-title">Berlin Code of Conduct</h2>
            <p>
              We apply the
              <a href="https://berlincodeofconduct.org/" class="coc-page__link" target="_blank" rel="noopener noreferrer">
                Berlin Code of Conduct
              </a>
              to all CppIndia events, tech talks, online spaces, and community interactions.
            </p>
            <a
              href="https://berlincodeofconduct.org/"
              class="btn btn--outline coc-page__berlin-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the Berlin Code of Conduct
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
          </div>

          <div class="coc-page__principles">
            <h2 class="coc-page__section-title">Core Principles</h2>
            <div class="coc-page__principle-grid">
              <div v-for="p in principles" :key="p.title" class="coc-page__principle">
                <div class="coc-page__principle-icon" v-html="p.icon" />
                <h3>{{ p.title }}</h3>
                <p>{{ p.body }}</p>
              </div>
            </div>
          </div>

          <div class="coc-page__reporting">
            <h2 class="coc-page__section-title">Reporting Issues</h2>
            <p>
              If you experience or witness behaviour that violates this code of conduct,
              please reach out to the CppIndia team:
            </p>
            <a :href="`mailto:${SITE.email}`" class="coc-page__email">{{ SITE.email }}</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import { SITE } from '@/constants'

useHead({
  title: 'Code of Conduct | CppIndia',
  description: 'CppIndia applies the Berlin Code of Conduct to all events and community spaces.',
})

const principles = [
  {
    title: 'Be Respectful',
    body: 'Treat everyone with respect. Disagreements happen — address issues, not people.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
  },
  {
    title: 'Be Inclusive',
    body: 'Welcome developers at all skill levels — beginners are just as important as experts.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>`,
  },
  {
    title: 'Be Constructive',
    body: 'Offer feedback kindly. Criticism should help people grow, not discourage them.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  },
  {
    title: 'Be Patient',
    body: 'Not everyone has the same background. Take time to explain and understand.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  },
]
</script>

<style lang="scss" scoped>
.coc-page {
  &__body { background: var(--color-bg); }

  &__content { max-width: 800px; margin: 0 auto; }

  &__card {
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-2xl);
    overflow: hidden;

    > div {
      padding: var(--space-10) var(--space-12);
      border-bottom: 1px solid var(--color-border-light);

      &:last-child { border-bottom: none; }

      @include below(md) { padding: var(--space-7) var(--space-6); }
    }

    p {
      font-size: var(--text-base);
      color: var(--color-text-secondary);
      line-height: var(--leading-relaxed);
    }
  }

  &__section-title {
    font-family: var(--font-secondary);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-4);
  }

  &__link {
    color: $color-secondary;
    text-decoration: underline;
    &:hover { color: $color-primary; }
  }

  &__berlin-btn {
    @include flex(center, flex-start, var(--space-2));
    margin-top: var(--space-5);
    width: fit-content;
  }

  &__principle-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-5);
    margin-top: var(--space-5);

    @include below(sm) { grid-template-columns: 1fr; }
  }

  &__principle {
    padding: var(--space-5);
    background: var(--color-surface-alt);
    border-radius: var(--radius-xl);

    &-icon {
      width: 44px; height: 44px;
      @include flex(center, center);
      background: rgba(79, 142, 247, 0.10);
      border-radius: var(--radius-lg);
      color: $color-secondary;
      margin-bottom: var(--space-3);
    }

    h3 {
      font-family: var(--font-secondary);
      font-size: var(--text-base);
      font-weight: var(--weight-bold);
      color: var(--color-text);
      margin-bottom: var(--space-2);
    }

    p {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      line-height: var(--leading-relaxed);
    }
  }

  &__email {
    display: inline-block;
    margin-top: var(--space-4);
    color: $color-secondary;
    font-weight: var(--weight-semibold);
    font-size: var(--text-base);
    text-decoration: underline;
    transition: color var(--transition-fast);
    &:hover { color: $color-primary; }
  }
}
</style>
