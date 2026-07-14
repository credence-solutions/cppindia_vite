<template>
  <div class="talks-page">
    <PageHero
      overline="Community Tech Talks"
      title="Learn. Share. Grow."
      subtitle="Recorded sessions from CppIndia's bi-monthly tech talks — covering modern C++, concurrency, performance, tooling, and more."
      :breadcrumb="[{ label: 'Tech Talks', path: '/tech-talks' }]"
    />

    <section class="section talks-page__body">
      <div class="container">
        <!-- Year tabs -->
        <div class="talks-page__year-tabs" role="tablist" aria-label="Select year">
          <button
            v-for="yr in years"
            :key="yr"
            role="tab"
            class="talks-page__year-tab"
            :class="{ 'talks-page__year-tab--active': activeYear === yr }"
            :aria-selected="activeYear === yr"
            @click="setYear(yr)"
          >
            {{ yr }}
            <span class="talks-page__year-count">{{ talksByYear[yr]?.length ?? 0 }}</span>
          </button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="talks-page__skeleton">
          <div v-for="n in 6" :key="n" class="skeleton talks-page__skeleton-card" />
        </div>

        <!-- Empty -->
        <div v-else-if="!talks.length" class="talks-page__empty">
          <p>No talks found for {{ activeYear }}.</p>
        </div>

        <!-- Talks grid -->
        <div v-else class="talks-page__grid">
          <article
            v-for="talk in talks"
            :key="talk.id"
            class="talk-card"
          >
            <div class="talk-card__meta">
              <time class="talk-card__date" :datetime="talk.date">{{ formatDate(talk.date) }}</time>
              <div class="talk-card__tags">
                <span v-for="tag in talk.tags.slice(0, 2)" :key="tag" class="talk-card__tag">{{ tag }}</span>
              </div>
            </div>

            <h2 class="talk-card__title">{{ talk.title }}</h2>
            <p class="talk-card__speaker">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>
              {{ talk.speaker }}
            </p>

            <div class="talk-card__actions">
              <a
                v-if="talk.video"
                :href="talk.video"
                class="talk-card__btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Watch
              </a>
              <a
                v-if="talk.slides"
                :href="talk.slides"
                class="talk-card__btn talk-card__btn--ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                Slides
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="talks-page__cta section--sm">
      <div class="container talks-page__cta-inner">
        <div>
          <h3 class="talks-page__cta-title">Want to give a talk?</h3>
          <p class="talks-page__cta-body">Share your C++ knowledge with the community. All experience levels welcome.</p>
        </div>
        <RouterLink to="/call-for-speakers" class="btn btn--primary">Submit a Talk Proposal</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import { fetchTalks } from '@/services/api/talks'

useHead({
  title: 'Community Tech Talks | CppIndia',
  description: 'Watch recorded CppIndia tech talks from 2020–2024 on modern C++, concurrency, performance, debugging, and more.',
})

const route  = useRoute()
const router = useRouter()

const years       = [2024, 2023, 2022, 2021, 2020]
const activeYear  = ref(Number(route.query.year) || 2024)
const talksByYear = ref({})
const loading     = ref(true)

const talks = computed(() => talksByYear.value[activeYear.value] ?? [])

async function loadTalks() {
  loading.value = true
  talksByYear.value = await fetchTalks()
  loading.value = false
}

function setYear(yr) {
  activeYear.value = yr
  router.replace({ query: { year: yr } })
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

watch(() => route.query.year, (yr) => {
  if (yr) activeYear.value = Number(yr)
})

onMounted(loadTalks)
</script>

<style lang="scss" scoped>
.talks-page {
  &__body { background: var(--color-bg); }

  &__year-tabs {
    @include flex(center, flex-start, var(--space-2));
    flex-wrap: wrap;
    margin-bottom: var(--space-8);
    border-bottom: 1px solid var(--color-border-light);
    padding-bottom: var(--space-4);
  }

  &__year-tab {
    @include flex(center, flex-start, var(--space-2));
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);

    &:hover { color: $color-secondary; background: rgba(79, 142, 247, 0.06); }

    &--active {
      background: $color-secondary;
      color: white;
      &:hover { color: white; background: $color-secondary-dark; }
    }
  }

  &__year-count {
    padding: 1px 6px;
    background: rgba(255,255,255,0.2);
    border-radius: var(--radius-full);
    font-size: 10px;
    font-weight: var(--weight-bold);

    .talks-page__year-tab:not(.talks-page__year-tab--active) & {
      background: var(--color-surface-alt);
      color: var(--color-text-muted);
    }
  }

  &__skeleton {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    @include below(lg) { grid-template-columns: repeat(2, 1fr); }
    @include below(sm) { grid-template-columns: 1fr; }

    &-card {
      height: 200px;
      border-radius: var(--radius-xl);
    }
  }

  &__empty {
    text-align: center;
    padding: var(--space-16) 0;
    color: var(--color-text-muted);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    @include below(lg) { grid-template-columns: repeat(2, 1fr); }
    @include below(sm) { grid-template-columns: 1fr; }
  }

  &__cta {
    background: var(--color-surface-alt);
    border-top: 1px solid var(--color-border-light);

    &-inner {
      @include flex(center, space-between);
      gap: var(--space-8);
      flex-wrap: wrap;
    }

    &-title {
      font-family: var(--font-secondary);
      font-size: var(--text-2xl);
      font-weight: var(--weight-bold);
      color: var(--color-text);
      margin-bottom: var(--space-2);
    }

    &-body {
      font-size: var(--text-base);
      color: var(--color-text-secondary);
    }
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
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
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
    background: rgba(79, 142, 247, 0.10);
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
    line-height: 1.35;
    flex: 1;
  }

  &__speaker {
    @include flex(center, flex-start, var(--space-2));
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    font-weight: var(--weight-medium);
  }

  &__actions {
    @include flex(center, flex-start, var(--space-2));
    margin-top: auto;
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
