<template>
  <div class="join-page">
    <PageHero
      overline="Become Part of the Community"
      title="Join CppIndia"
      subtitle="Connect with C++ developers across India. It's free, welcoming, and full of learning opportunities."
      :breadcrumb="[{ label: 'Join Us', path: '/join' }]"
    />

    <section class="section join-page__body">
      <div class="container">
        <!-- Primary CTA — Discord -->
        <div class="join-page__discord-card">
          <div class="join-page__discord-content">
            <div class="join-page__discord-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            </div>
            <div>
              <h2 class="join-page__discord-title">Join our Discord Server</h2>
              <p class="join-page__discord-body">
                The heart of the CppIndia community. Chat about C++, ask questions, share resources,
                and stay updated on upcoming sessions — all in real time.
              </p>
            </div>
          </div>
          <a
            :href="SITE.discordInvite"
            class="btn btn--lg join-page__discord-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Discord
          </a>
        </div>

        <!-- Ways to engage -->
        <h2 class="join-page__section-title">More ways to stay connected</h2>
        <div class="join-page__platforms">
          <a
            v-for="p in platforms"
            :key="p.label"
            :href="p.url"
            class="join-page__platform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="join-page__platform-icon" v-html="p.icon" />
            <div>
              <p class="join-page__platform-name">{{ p.label }}</p>
              <p class="join-page__platform-desc">{{ p.desc }}</p>
            </div>
          </a>
        </div>

        <!-- What you get -->
        <h2 class="join-page__section-title">What you get as a member</h2>
        <div class="join-page__benefits">
          <div v-for="b in benefits" :key="b.title" class="join-page__benefit">
            <div class="join-page__benefit-icon" v-html="b.icon" />
            <h3 class="join-page__benefit-title">{{ b.title }}</h3>
            <p class="join-page__benefit-body">{{ b.body }}</p>
          </div>
        </div>

        <!-- Speak CTA -->
        <div class="join-page__speak-cta">
          <h2>Want to give a talk?</h2>
          <p>All experience levels welcome — from your first lightning talk to a full 60-minute session.</p>
          <RouterLink to="/call-for-speakers" class="btn btn--outline">Submit a Talk Proposal</RouterLink>
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
  title: "Join CppIndia | India's C++ Community",
  description: 'Join CppIndia on Discord, YouTube, LinkedIn, and GitHub. Attend free tech talks and our annual C++ conference.',
})

const platforms = [
  {
    label: 'YouTube',
    desc: 'Watch all recorded tech talks and conference sessions.',
    url: SITE.social.youtube,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>`,
  },
  {
    label: 'LinkedIn',
    desc: 'Follow for announcements and community news.',
    url: SITE.social.linkedin,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`,
  },
  {
    label: 'Twitter / X',
    desc: 'Quick updates, talk announcements, and C++ content.',
    url: SITE.social.twitter,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  },
  {
    label: 'GitHub',
    desc: 'Access session slides and documents from all talks.',
    url: SITE.social.github,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
  },
]

const benefits = [
  {
    title: 'Bi-Monthly Tech Talks',
    body: 'Attend free sessions every alternate Saturday, live or catch up via recordings on YouTube.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  },
  {
    title: 'Annual CppIndiaCon',
    body: 'Access to India\'s premier C++ conference with international speakers — typically free or heavily discounted for community members.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  },
  {
    title: 'Mentorship',
    body: 'Connect with experienced C++ developers who can guide your learning journey and career decisions.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
  },
  {
    title: 'Job Opportunities',
    body: 'Hear about C++ roles from companies that support the community, and network with hiring engineers.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>`,
  },
  {
    title: 'Curated Resources',
    body: 'Access our community-curated collection of C++ references, articles, and monthly recommendations.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
  },
  {
    title: 'Give a Talk',
    body: 'Share your expertise with hundreds of developers. We welcome speakers at all experience levels.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 1a3 3 0 003 3V4a3 3 0 00-6 0v4a3 3 0 003 3z"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/></svg>`,
  },
]
</script>

<style lang="scss" scoped>
.join-page {
  &__body { background: var(--color-bg); }

  &__discord-card {
    @include flex(center, space-between);
    gap: var(--space-8);
    flex-wrap: wrap;
    padding: var(--space-8) var(--space-10);
    background: rgba(88,101,242,0.06);
    border: 2px solid rgba(88,101,242,0.25);
    border-radius: var(--radius-2xl);
    margin-bottom: var(--space-12);

    @include below(md) { padding: var(--space-6); }
  }

  &__discord-content {
    @include flex(flex-start, flex-start, var(--space-5));
    flex: 1;
  }

  &__discord-icon {
    width: 64px; height: 64px;
    background: #5865F2;
    border-radius: var(--radius-xl);
    @include flex(center, center);
    color: white;
    flex-shrink: 0;
  }

  &__discord-title {
    font-family: var(--font-secondary);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-2);
  }

  &__discord-body {
    font-size: var(--text-base);
    color: var(--color-text-secondary);
    line-height: var(--leading-relaxed);
  }

  &__discord-btn {
    background: #5865F2;
    color: white;
    flex-shrink: 0;
    font-weight: var(--weight-bold);
    &:hover { background: #4752C4; }
  }

  &__section-title {
    font-family: var(--font-secondary);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-6);
  }

  &__platforms {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: var(--space-4);
    margin-bottom: var(--space-12);
  }

  &__platform {
    @include flex(flex-start, flex-start, var(--space-4));
    padding: var(--space-5);
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    transition: all var(--transition-base);

    &:hover {
      border-color: rgba(79, 142, 247, 0.25);
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }

    &-icon {
      width: 44px; height: 44px;
      @include flex(center, center);
      background: rgba(79, 142, 247, 0.08);
      border-radius: var(--radius-lg);
      color: $color-secondary;
      flex-shrink: 0;
    }

    &-name {
      font-weight: var(--weight-bold);
      color: var(--color-text);
      margin-bottom: var(--space-1);
    }

    &-desc {
      font-size: var(--text-sm);
      color: var(--color-text-secondary);
      line-height: var(--leading-relaxed);
    }
  }

  &__benefits {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
    margin-bottom: var(--space-12);

    @include below(lg) { grid-template-columns: repeat(2, 1fr); }
    @include below(sm) { grid-template-columns: 1fr; }
  }

  &__benefit {
    padding: var(--space-6);
    background: var(--color-surface);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-xl);
    transition: all var(--transition-base);

    &:hover {
      border-color: rgba(79, 142, 247, 0.25);
      box-shadow: var(--shadow-sm);
    }

    &-icon {
      width: 52px; height: 52px;
      @include flex(center, center);
      background: rgba(79, 142, 247, 0.08);
      border-radius: var(--radius-lg);
      color: $color-secondary;
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

  &__speak-cta {
    text-align: center;
    padding: var(--space-12);
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-2xl);

    h2 {
      font-family: var(--font-secondary);
      font-size: var(--text-2xl);
      font-weight: var(--weight-bold);
      color: var(--color-text);
      margin-bottom: var(--space-3);
    }

    p {
      font-size: var(--text-base);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-6);
    }
  }
}
</style>
