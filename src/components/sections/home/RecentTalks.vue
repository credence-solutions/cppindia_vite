<!--
  RecentTalks — Recent tech talks on homepage
-->
<template>
  <section class="section recent-talks">
    <div class="container">
      <div class="recent-talks__header gsap-reveal">
        <div>
          <p class="recent-talks__overline">Community Tech Talks</p>
          <h2 class="recent-talks__title">Recent Sessions</h2>
        </div>
        <RouterLink to="/tech-talks" class="btn btn--outline recent-talks__all-btn">
          All Talks
          <IconArrow />
        </RouterLink>
      </div>

      <div class="recent-talks__grid">
        <article
          v-for="talk in recentTalks"
          :key="talk.id"
          class="talk-card gsap-reveal"
        >
          <div class="talk-card__meta">
            <time class="talk-card__date" :datetime="talk.date">{{ formatDate(talk.date) }}</time>
            <div class="talk-card__tags">
              <span
                v-for="tag in talk.tags.slice(0, 2)"
                :key="tag"
                class="talk-card__tag"
              >{{ tag }}</span>
            </div>
          </div>

          <h3 class="talk-card__title">{{ talk.title }}</h3>
          <p class="talk-card__speaker">{{ talk.speaker }}</p>

          <div class="talk-card__actions">
            <a
              v-if="talk.video"
              :href="talk.video"
              class="talk-card__btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconPlay />
              Watch Talk
            </a>
            <a
              v-if="talk.slides"
              :href="talk.slides"
              class="talk-card__btn talk-card__btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconSlides />
              Slides
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchTalksByYear } from '@/services/api/talks'
import { useGsap } from '@/composables/useGsap'

const IconPlay   = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>` }
const IconSlides = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>` }
const IconArrow  = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>` }

const recentTalks = ref([])
const { staggerReveal } = useGsap()

onMounted(async () => {
  const talks = await fetchTalksByYear(2024)
  recentTalks.value = talks.slice(0, 3)
  staggerReveal('.gsap-reveal', { y: 30 })
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}
</script>

<style lang="scss" scoped>
.recent-talks {
  background: var(--color-surface-alt);

  &__header {
    @include flex(center, space-between);
    margin-bottom: var(--space-10);
    flex-wrap: wrap;
    gap: var(--space-4);
  }

  &__overline {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: $color-secondary;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-2);
  }

  &__title {
    font-family: var(--font-secondary);
    font-size: clamp(var(--text-2xl), 3vw, var(--text-4xl));
    font-weight: var(--weight-bold);
    color: var(--color-text);
  }

  &__all-btn {
    @include flex(center, flex-start, var(--space-1));
    flex-shrink: 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);

    @include below(lg) { grid-template-columns: repeat(2, 1fr); }
    @include below(sm) { grid-template-columns: 1fr; }
  }
}

.talk-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  transition: all var(--transition-base);

  &:hover {
    border-color: rgba(79, 142, 247, 0.25);
    box-shadow: $glow-primary;
    transform: translateY(-3px);
  }

  &__meta {
    @include flex(center, space-between);
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  &__date {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    font-family: var(--font-mono);
  }

  &__tags {
    @include flex(center, flex-start, var(--space-1));
  }

  &__tag {
    padding: 2px var(--space-2);
    background: rgba(155, 116, 245, 0.12);
    color: $color-secondary;
    border-radius: var(--radius-sm);
    font-size: 10px;
    font-weight: var(--weight-semibold);
  }

  &__title {
    font-family: var(--font-secondary);
    font-size: var(--text-base);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    line-height: 1.3;
    flex: 1;
  }

  &__speaker {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    font-weight: var(--weight-medium);
  }

  &__actions {
    @include flex(center, flex-start, var(--space-2));
    margin-top: var(--space-2);
    flex-wrap: wrap;
  }

  &__btn {
    @include flex(center, flex-start, var(--space-1));
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    background: $color-secondary;
    color: white;
    transition: all var(--transition-fast);

    &:hover { background: $color-secondary-dark; }

    &--ghost {
      background: transparent;
      border: 1px solid var(--color-border);
      color: var(--color-text-secondary);

      &:hover { border-color: $color-secondary; color: $color-secondary; }
    }
  }
}
</style>
