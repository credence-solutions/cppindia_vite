<template>
  <div class="conf-page">
    <PageHero
      overline="Annual C++ Conference"
      title="CppIndiaCon"
      subtitle="India's premier C++ conference — bringing together global experts for talks, workshops, and community networking."
      :breadcrumb="[{ label: 'CppIndiaCon', path: '/conference' }]"
    />

    <section class="section conf-page__body">
      <div class="container">

        <!-- Year tabs -->
        <div class="conf-page__year-tabs" role="tablist">
          <button
            v-for="yr in years"
            :key="yr"
            role="tab"
            class="conf-page__year-tab"
            :class="{ 'conf-page__year-tab--active': activeYear === yr }"
            :aria-selected="activeYear === yr"
            @click="setYear(yr)"
          >
            {{ yr }}
            <span v-if="yr === latestYear" class="conf-page__year-badge">Latest</span>
          </button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="skeleton conf-page__skeleton" />

        <!-- Conference content -->
        <template v-else-if="conf">

          <!-- Header -->
          <div class="conf-header">
            <div class="conf-header__text">
              <h2 class="conf-header__title">{{ conf.name }}</h2>
              <p class="conf-header__meta">
                <span>{{ conf.dates }}</span>
                <span class="conf-header__dot" aria-hidden="true">·</span>
                <span>{{ conf.format }}</span>
                <span class="conf-header__dot" aria-hidden="true">·</span>
                <span>Edition {{ conf.edition }}</span>
              </p>
              <p class="conf-header__tagline">{{ conf.tagline }}</p>
            </div>
            <div class="conf-header__actions">
              <a
                v-if="conf.registrationUrl"
                :href="conf.registrationUrl"
                class="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >Register Now</a>
              <a
                :href="conf.videosUrl"
                class="btn btn--outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconYoutube />
                Watch Talks
              </a>
            </div>
          </div>

          <!-- Conference banner -->
          <div v-if="conf.banner" class="conf-banner-wrap">
            <img :src="conf.banner" :alt="conf.name + ' banner'" class="conf-banner-img" />
          </div>

          <p class="conf-desc">{{ conf.description }}</p>

          <!-- 2023 Stats strip -->
          <div v-if="conf.stats" class="conf-stats">
            <div class="conf-stats__item">
              <span class="conf-stats__value">{{ conf.stats.registrations }}</span>
              <span class="conf-stats__label">Registrations</span>
            </div>
            <div class="conf-stats__item">
              <span class="conf-stats__value">{{ conf.stats.day1Attendees }}</span>
              <span class="conf-stats__label">Day 1 Attendees</span>
            </div>
            <div class="conf-stats__item">
              <span class="conf-stats__value">{{ conf.stats.day2Attendees }}</span>
              <span class="conf-stats__label">Day 2 Attendees</span>
            </div>
            <div class="conf-stats__item">
              <span class="conf-stats__value">{{ conf.stats.talkProposals }}+</span>
              <span class="conf-stats__label">Talk Proposals</span>
            </div>
            <div class="conf-stats__item">
              <span class="conf-stats__value">{{ conf.stats.volunteers }}</span>
              <span class="conf-stats__label">Volunteers</span>
            </div>
          </div>

          <!-- Schedule (2024) -->
          <div v-if="conf.schedule?.length" class="conf-schedule">
            <h3 class="conf-section-title">Conference Schedule</h3>
            <div class="conf-schedule__days">
              <div
                v-for="day in conf.schedule"
                :key="day.day"
                class="conf-schedule__day"
              >
                <div class="conf-schedule__day-header">
                  <span class="conf-schedule__day-num">Day {{ day.day }}</span>
                  <span class="conf-schedule__day-date">{{ day.date }}</span>
                </div>

                <div class="conf-schedule__sessions">
                  <div
                    v-for="session in day.sessions"
                    :key="session.time + session.title"
                    class="conf-session"
                    :class="`conf-session--${session.type}`"
                  >
                    <div class="conf-session__time">{{ session.time }}</div>
                    <div class="conf-session__content">
                      <div class="conf-session__header">
                        <p class="conf-session__title">{{ session.title }}</p>
                        <span
                          v-if="session.type === 'keynote'"
                          class="conf-session__badge conf-session__badge--keynote"
                        >Keynote</span>
                        <span
                          v-else-if="session.type === 'lightning'"
                          class="conf-session__badge conf-session__badge--lightning"
                        >Lightning</span>
                      </div>
                      <p v-if="session.speaker" class="conf-session__speaker">{{ session.speaker }}</p>
                      <p v-if="session.abstract" class="conf-session__abstract">{{ session.abstract }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Speakers -->
          <div v-if="conf.speakers.length" class="conf-speakers">
            <h3 class="conf-section-title">Speakers</h3>
            <div class="conf-speakers__grid">
              <div
                v-for="s in conf.speakers"
                :key="s.name"
                class="speaker-card"
                :class="{ 'speaker-card--keynote': s.role === 'Keynote' }"
              >
                <div class="speaker-photo-wrap">
                  <span class="speaker-photo-wrap__initial">{{ s.name.charAt(0) }}</span>
                  <img v-if="s.image" :src="s.image" :alt="s.name" class="speaker-photo" />
                </div>
                <div class="speaker-card__body">
                  <div class="speaker-card__name-row">
                    <p class="speaker-card__name">{{ s.name }}</p>
                    <span v-if="s.role === 'Keynote'" class="speaker-card__badge">Keynote</span>
                  </div>
                  <p v-if="s.topic" class="speaker-card__topic">"{{ s.topic }}"</p>
                  <div v-if="s.rating" class="speaker-card__rating">
                    <span class="speaker-card__star">★</span>
                    <span>{{ s.rating.toFixed(2) }} / 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Lightning Talks (2023) -->
          <div v-if="conf.lightningTalks?.length" class="conf-lightning">
            <h3 class="conf-section-title">Lightning Talks</h3>
            <div class="conf-lightning__grid">
              <div
                v-for="lt in conf.lightningTalks"
                :key="lt.speaker"
                class="conf-lightning__item"
              >
                <p class="conf-lightning__speaker">{{ lt.speaker }}</p>
                <p class="conf-lightning__topic">{{ lt.topic }}</p>
              </div>
            </div>
          </div>

          <!-- Sponsors -->
          <div class="conf-sponsors">
            <template v-if="conf.sponsors.gold.length">
              <h3 class="conf-section-title">Gold Sponsors</h3>
              <div class="conf-sponsors__grid">
                <div
                  v-for="s in conf.sponsors.gold"
                  :key="s.name"
                  class="conf-sponsors__card conf-sponsors__card--gold"
                >
                  <p class="conf-sponsors__name">{{ s.name }}</p>
                  <p v-if="s.description" class="conf-sponsors__desc">{{ s.description }}</p>
                  <a
                    v-if="s.website"
                    :href="s.website"
                    class="conf-sponsors__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Visit Website →</a>
                </div>
              </div>
            </template>

            <template v-if="conf.sponsors.community.length">
              <h3 class="conf-section-title conf-section-title--sm">Community Sponsors</h3>
              <div class="conf-sponsors__community">
                <a
                  v-for="s in conf.sponsors.community"
                  :key="s.name"
                  :href="s.website"
                  class="conf-sponsors__pill"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{ s.name }}</a>
              </div>
            </template>
          </div>

          <!-- Watch CTA -->
          <div class="conf-watch-cta">
            <p class="conf-watch-cta__label">All sessions recorded and available on YouTube</p>
            <a
              :href="conf.videosUrl"
              class="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconYoutube />
              Watch {{ conf.name }} Sessions
            </a>
          </div>

        </template>

        <div v-else class="conf-page__empty">
          No conference data found for {{ activeYear }}.
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@/composables/useHead'
import PageHero from '@/components/common/PageHero.vue'
import { fetchConferenceByYear } from '@/services/api/conferences'

const IconYoutube = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>` }

useHead({
  title: "CppIndiaCon | India's Annual C++ Conference",
  description: "CppIndiaCon is India's premier annual C++ conference featuring international speakers, talks, workshops, and networking.",
})

const route      = useRoute()
const router     = useRouter()
const years      = [2024, 2023, 2022, 2021]
const latestYear = 2024
const activeYear = ref(Number(route.query.year) || 2024)
const conf       = ref(null)
const loading    = ref(true)

async function loadConference(year) {
  loading.value = true
  conf.value = await fetchConferenceByYear(year)
  loading.value = false
}

function setYear(yr) {
  activeYear.value = yr
  router.replace({ query: { year: yr } })
}

watch(activeYear, loadConference)
onMounted(() => loadConference(activeYear.value))
</script>

<style lang="scss" scoped>
.conf-page {
  &__body { background: var(--color-bg); }

  &__year-tabs {
    @include flex(center, flex-start, var(--space-2));
    flex-wrap: wrap;
    margin-bottom: var(--space-10);
    border-bottom: 1px solid var(--color-border-light);
    padding-bottom: var(--space-4);
    gap: var(--space-2);
  }

  &__year-tab {
    @include flex(center, flex-start, var(--space-2));
    padding: var(--space-2) var(--space-5);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    border: 1px solid transparent;

    &:hover {
      color: $color-secondary;
      background: rgba(155, 116, 245, 0.08);
    }

    &--active {
      background: $color-secondary;
      color: white;
      border-color: $color-secondary;
    }
  }

  &__year-badge {
    padding: 1px 6px;
    background: rgba(255,255,255,0.2);
    border-radius: var(--radius-full);
    font-size: 10px;
    font-weight: var(--weight-bold);
  }

  &__skeleton { height: 500px; border-radius: var(--radius-xl); }

  &__empty {
    text-align: center;
    padding: var(--space-16) 0;
    color: var(--color-text-muted);
  }
}

// Header
.conf-header {
  @include flex(flex-start, space-between);
  gap: var(--space-8);
  flex-wrap: wrap;
  margin-bottom: var(--space-5);

  &__title {
    font-family: var(--font-secondary);
    font-size: clamp(var(--text-2xl), 4vw, var(--text-5xl));
    font-weight: var(--weight-extrabold);
    color: var(--color-text);
    margin-bottom: var(--space-2);
  }

  &__meta {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    font-family: var(--font-mono);
    margin-bottom: var(--space-3);
  }

  &__dot { margin: 0 var(--space-2); opacity: 0.4; }

  &__tagline {
    font-family: var(--font-secondary);
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    color: $color-secondary;
  }

  &__actions {
    @include flex(center, flex-start, var(--space-3));
    flex-shrink: 0;
    flex-wrap: wrap;
    .btn { @include flex(center, flex-start, var(--space-2)); }
  }
}


.conf-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  max-width: 780px;
  margin-bottom: var(--space-10);
}

// Stats (2023)
.conf-stats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-4);
  margin-bottom: var(--space-12);
  padding: var(--space-6);
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-2xl);

  @include below(lg) { grid-template-columns: repeat(3, 1fr); }
  @include below(sm) { grid-template-columns: repeat(2, 1fr); }

  &__item {
    text-align: center;
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    background: var(--color-surface-alt);
  }

  &__value {
    display: block;
    font-family: var(--font-secondary);
    font-size: var(--text-3xl);
    font-weight: var(--weight-extrabold);
    color: $color-primary;
    line-height: 1;
    margin-bottom: var(--space-2);
  }

  &__label {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
}

// Section title
.conf-section-title {
  font-family: var(--font-secondary);
  font-size: var(--text-xl);
  font-weight: var(--weight-bold);
  color: var(--color-text);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-3);
  border-bottom: 2px solid var(--color-border-light);

  &--sm {
    font-size: var(--text-base);
    margin-top: var(--space-8);
    border-bottom: 1px solid var(--color-border-light);
  }
}

// Schedule
.conf-schedule {
  margin-bottom: var(--space-12);

  &__days {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);

    @include below(lg) { grid-template-columns: 1fr; }
  }

  &__day {
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-2xl);
    overflow: hidden;
  }

  &__day-header {
    @include flex(center, space-between);
    padding: var(--space-4) var(--space-6);
    background: linear-gradient(135deg, rgba(79,142,247,0.12), rgba(155,116,245,0.12));
    border-bottom: 1px solid var(--color-border-light);
  }

  &__day-num {
    font-family: var(--font-secondary);
    font-weight: var(--weight-bold);
    font-size: var(--text-base);
    color: var(--color-text);
  }

  &__day-date {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    font-family: var(--font-mono);
  }

  &__sessions { padding: var(--space-3); }
}

.conf-session {
  @include flex(flex-start, flex-start, var(--space-4));
  padding: var(--space-3) var(--space-3);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-1);

  &--break, &--intro, &--outro, &--activity {
    opacity: 0.55;
    .conf-session__time { color: var(--color-text-muted); }
  }

  &--talk, &--keynote, &--lightning {
    background: var(--color-surface-alt);

    &:hover { background: var(--color-surface-raised); }
  }

  &--keynote {
    border-left: 3px solid $color-secondary;
    background: rgba(155,116,245,0.06);
  }

  &__time {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--color-text-muted);
    white-space: nowrap;
    min-width: 92px;
    padding-top: 2px;
    flex-shrink: 0;
  }

  &__content { flex: 1; min-width: 0; }

  &__header {
    @include flex(flex-start, space-between, var(--space-2));
  }

  &__title {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--color-text);
    line-height: 1.3;
    flex: 1;
  }

  &__badge {
    flex-shrink: 0;
    padding: 2px 7px;
    border-radius: var(--radius-full);
    font-size: 9px;
    font-weight: var(--weight-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &--keynote { background: $color-secondary; color: white; }
    &--lightning { background: $color-accent; color: #000; }
  }

  &__speaker {
    font-size: var(--text-xs);
    color: $color-primary;
    margin-top: var(--space-1);
    font-weight: var(--weight-medium);
  }

  &__abstract {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    line-height: var(--leading-relaxed);
    margin-top: var(--space-2);
  }
}

// Speakers
.conf-speakers {
  margin-bottom: var(--space-12);

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--space-5);
  }
}

.speaker-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);

  &:hover {
    border-color: rgba(79,142,247,0.3);
    box-shadow: $glow-primary;
    transform: translateY(-3px);
  }

  &--keynote {
    border-color: rgba(155,116,245,0.35);
    background: var(--color-surface);
  }

  &__body {
    padding: var(--space-4);
    flex: 1;
  }

  &__name-row {
    @include flex(flex-start, space-between, var(--space-2));
    margin-bottom: var(--space-1);
    flex-wrap: wrap;
    gap: var(--space-1);
  }

  &__name {
    font-weight: var(--weight-bold);
    font-size: var(--text-sm);
    color: var(--color-text);
    line-height: 1.3;
  }

  &__badge {
    padding: 2px 7px;
    background: $color-secondary;
    color: white;
    border-radius: var(--radius-full);
    font-size: 9px;
    font-weight: var(--weight-bold);
    flex-shrink: 0;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    align-self: flex-start;
    margin-top: 2px;
  }

  &__topic {
    font-size: var(--text-xs);
    color: var(--color-text-secondary);
    line-height: 1.5;
    font-style: italic;
  }

  &__rating {
    @include flex(center, flex-start, 3px);
    margin-top: var(--space-2);
    font-size: var(--text-xs);
    color: $color-warning;
    font-weight: var(--weight-semibold);
  }

  &__star { font-size: 12px; }
}

// Lightning talks
.conf-lightning {
  margin-bottom: var(--space-12);

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--space-4);
  }

  &__item {
    padding: var(--space-4) var(--space-5);
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-left: 3px solid $color-accent;
    border-radius: var(--radius-lg);
  }

  &__speaker {
    font-size: var(--text-sm);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-1);
  }

  &__topic {
    font-size: var(--text-xs);
    color: var(--color-text-secondary);
    line-height: 1.4;
  }
}

// Sponsors
.conf-sponsors {
  margin-bottom: var(--space-12);

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  &__card {
    padding: var(--space-6);
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);

    &--gold {
      border-color: rgba(251,191,36,0.3);
      background: rgba(251,191,36,0.04);
    }
  }

  &__name {
    font-family: var(--font-secondary);
    font-size: var(--text-lg);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-3);
  }

  &__desc {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
  }

  &__link {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: $color-primary;
    transition: color var(--transition-fast);
    &:hover { color: $color-secondary; }
  }

  &__community {
    @include flex(center, flex-start, var(--space-3));
    flex-wrap: wrap;
  }

  &__pill {
    padding: var(--space-2) var(--space-5);
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--color-text-secondary);
    transition: all var(--transition-fast);

    &:hover {
      border-color: $color-secondary;
      color: $color-secondary;
    }
  }
}

// Watch CTA
.conf-watch-cta {
  @include flex(center, center);
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-10);
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-2xl);
  text-align: center;

  &__label {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }

  .btn { @include flex(center, flex-start, var(--space-2)); }
}
</style>
