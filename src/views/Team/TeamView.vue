<template>
  <div class="team-page">
    <PageHero
      overline="The People Behind CppIndia"
      title="Our Team"
      subtitle="CppIndia is run by a small team of passionate C++ developers who volunteer their time to build and grow the community."
      :breadcrumb="[{ label: 'About', path: '/about' }, { label: 'Team', path: '/team' }]"
    />

    <section class="section team-page__body">
      <div class="container">
        <div class="team-page__grid">
          <div
            v-for="member in team"
            :key="member.id"
            class="team-card"
          >
            <div class="team-photo-wrap">
              <img
                v-if="member.photo"
                :src="member.photo"
                :alt="member.name"
                class="team-photo-img"
                loading="lazy"
              />
              <span v-else class="team-card__avatar-initial">{{ member.name.charAt(0) }}</span>
            </div>

            <div class="team-card__info">
              <p class="team-card__role">{{ member.role }}</p>
              <h2 class="team-card__name">{{ member.name }}</h2>
              <p class="team-card__bio">{{ member.bio }}</p>

              <div class="team-card__links">
                <a
                  v-if="member.links.website"
                  :href="member.links.website"
                  class="team-card__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                </a>
                <a
                  v-if="member.links.linkedin"
                  :href="member.links.linkedin"
                  class="team-card__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="team-page__volunteer">
          <h2 class="team-page__volunteer-title">Want to help run CppIndia?</h2>
          <p class="team-page__volunteer-body">
            We're always looking for enthusiastic volunteers — whether you want to help
            organise events, moderate Discord, curate resources, or bring in speakers.
          </p>
          <RouterLink to="/contact" class="btn btn--primary">Get in Touch</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import teamData from '@/data/team.json'

useHead({
  title: 'Our Team | CppIndia',
  description: 'Meet the volunteers who run CppIndia — founders, co-founders, and moderators.',
})

const team = teamData
</script>

<style lang="scss" scoped>
.team-page {
  &__body { background: var(--color-bg); }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-6);
    margin-bottom: var(--space-16);
  }

  &__volunteer {
    text-align: center;
    padding: var(--space-12);
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-2xl);
    max-width: 600px;
    margin: 0 auto;

    &-title {
      font-family: var(--font-secondary);
      font-size: var(--text-2xl);
      font-weight: var(--weight-bold);
      color: var(--color-text);
      margin-bottom: var(--space-3);
    }

    &-body {
      font-size: var(--text-base);
      color: var(--color-text-secondary);
      line-height: var(--leading-relaxed);
      margin-bottom: var(--space-6);
    }
  }
}

.team-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  transition: all var(--transition-base);

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-3px);
  }

  &__avatar-initial {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-secondary);
    font-size: 5rem;
    font-weight: var(--weight-extrabold);
    color: rgba(255, 255, 255, 0.35);
  }

  &__info { padding: var(--space-6); }

  &__role {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: $color-secondary;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: var(--space-1);
  }

  &__name {
    font-family: var(--font-secondary);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-3);
  }

  &__bio {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
  }

  &__links {
    @include flex(center, flex-start, var(--space-3));
  }

  &__link {
    width: 32px; height: 32px;
    @include flex(center, center);
    background: var(--color-surface-alt);
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
    transition: all var(--transition-fast);

    &:hover { background: $color-secondary; color: white; }
  }
}
</style>
