<template>
  <div class="resources-page">
    <PageHero
      overline="C++ Learning"
      title="Resources"
      subtitle="Curated C++ references, standards, articles, and community-recommended learning materials."
      :breadcrumb="[{ label: 'Resources', path: '/resources' }]"
    />

    <section class="section resources-page__body">
      <div class="container">
        <!-- References -->
        <div id="references" class="resources-page__group">
          <h2 class="resources-page__group-title">C++ Language &amp; References</h2>
          <div class="resources-page__grid">
            <a
              v-for="r in resources.references"
              :key="r.id"
              :href="r.url"
              class="resource-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="resource-card__top">
                <span class="resource-card__type">{{ r.type }}</span>
                <span v-if="r.free" class="resource-card__free">Free</span>
              </div>
              <h3 class="resource-card__title">{{ r.title }}</h3>
              <p class="resource-card__desc">{{ r.description }}</p>
              <span class="resource-card__cta">
                Open resource
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </a>
          </div>
        </div>

        <!-- Articles -->
        <div id="articles" class="resources-page__group">
          <h2 class="resources-page__group-title">Articles &amp; Blogs</h2>
          <div v-if="resources.articles.length" class="resources-page__grid">
            <a
              v-for="r in resources.articles"
              :key="r.id"
              :href="r.url"
              class="resource-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="resource-card__top">
                <span class="resource-card__type">{{ r.type }}</span>
                <span v-if="r.free" class="resource-card__free">Free</span>
              </div>
              <h3 class="resource-card__title">{{ r.title }}</h3>
              <p class="resource-card__desc">{{ r.description }}</p>
            </a>
          </div>
          <div v-else class="resources-page__empty">
            <p>Community-curated articles coming soon. Check out the
              <a :href="SITE.social.github" target="_blank" rel="noopener noreferrer" class="resources-page__link">GitHub repo</a>
              for session materials from past talks.
            </p>
          </div>
        </div>

        <!-- Monthly picks -->
        <div id="monthly" class="resources-page__group">
          <h2 class="resources-page__group-title">Book / Blog / Video of the Month</h2>
          <div class="resources-page__empty">
            <p>Monthly community picks are shared on our
              <a :href="SITE.social.discord" target="_blank" rel="noopener noreferrer" class="resources-page__link">Discord server</a>
              and
              <a :href="SITE.social.linkedin" target="_blank" rel="noopener noreferrer" class="resources-page__link">LinkedIn</a>.
              Join us to stay updated!
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import resourcesData from '@/data/resources.json'
import { SITE } from '@/constants'

useHead({
  title: 'C++ Resources | CppIndia',
  description: 'Curated C++ standards, references, articles, and community-recommended learning materials.',
})

const resources = resourcesData
</script>

<style lang="scss" scoped>
.resources-page {
  &__body { background: var(--color-bg); }

  &__group {
    margin-bottom: var(--space-14);

    &:last-child { margin-bottom: 0; }
  }

  &__group-title {
    font-family: var(--font-secondary);
    font-size: clamp(var(--text-xl), 2.5vw, var(--text-3xl));
    font-weight: var(--weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-6);
    padding-bottom: var(--space-4);
    border-bottom: 2px solid var(--color-border-light);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--space-5);
  }

  &__empty {
    padding: var(--space-8);
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    font-size: var(--text-base);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
  }

  &__link {
    color: $color-secondary;
    text-decoration: underline;
    &:hover { color: $color-primary; }
  }
}

.resource-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  transition: all var(--transition-base);

  &:hover {
    border-color: rgba(79, 142, 247, 0.25);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  &__top {
    @include flex(center, space-between);
    gap: var(--space-2);
  }

  &__type {
    padding: 2px var(--space-2);
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-sm);
    font-size: 10px;
    font-weight: var(--weight-semibold);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &__free {
    padding: 2px var(--space-2);
    background: rgba(46,125,50,0.1);
    border: 1px solid rgba(46,125,50,0.3);
    border-radius: var(--radius-sm);
    font-size: 10px;
    font-weight: var(--weight-bold);
    color: var(--color-success);
  }

  &__title {
    font-family: var(--font-secondary);
    font-size: var(--text-base);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    line-height: 1.3;
  }

  &__desc {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    flex: 1;
  }

  &__cta {
    @include flex(center, flex-start, var(--space-1));
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: $color-secondary;
    margin-top: auto;
  }
}
</style>
