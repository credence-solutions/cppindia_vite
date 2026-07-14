<template>
  <footer class="footer" role="contentinfo">
    <div class="footer__body">
      <div class="container footer__grid">

        <!-- Brand column -->
        <div class="footer__brand">
          <RouterLink to="/" class="footer__logo" aria-label="CppIndia">
            <img src="/assets/images/logo.png" alt="CppIndia" class="site-logo-img" />
            <div class="footer__logo-text">
              <span class="footer__logo-name">CppIndia</span>
              <span class="footer__logo-tagline">India's C++ Community</span>
            </div>
          </RouterLink>

          <p class="footer__brand-text">
            A welcoming community for C++ developers across India — from students to
            seasoned engineers. We connect, learn, and grow together through tech talks,
            conferences, and shared resources.
          </p>

          <div class="footer__social">
            <a
              v-for="(item, key) in socialLinks"
              :key="key"
              :href="item.url"
              :aria-label="item.label"
              class="footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <component :is="item.icon" />
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div class="footer__col">
          <h4 class="footer__heading">Community</h4>
          <ul class="footer__links" role="list">
            <li><RouterLink to="/tech-talks" class="footer__link">Tech Talks</RouterLink></li>
            <li><RouterLink to="/conference" class="footer__link">CppIndiaCon</RouterLink></li>
            <li><RouterLink to="/resources" class="footer__link">C++ Resources</RouterLink></li>
            <li><RouterLink to="/code-of-conduct" class="footer__link">Code of Conduct</RouterLink></li>
          </ul>
        </div>

        <!-- About links -->
        <div class="footer__col">
          <h4 class="footer__heading">About</h4>
          <ul class="footer__links" role="list">
            <li><RouterLink to="/about" class="footer__link">About CppIndia</RouterLink></li>
            <li><RouterLink to="/team" class="footer__link">Our Team</RouterLink></li>
            <li><RouterLink to="/call-for-speakers" class="footer__link">Call for Speakers</RouterLink></li>
            <li><RouterLink to="/join" class="footer__link">Join the Community</RouterLink></li>
            <li><RouterLink to="/contact" class="footer__link">Contact Us</RouterLink></li>
          </ul>
        </div>

        <!-- Join Discord CTA -->
        <div class="footer__col">
          <h4 class="footer__heading">Join Us on Discord</h4>
          <p class="footer__discord-text">
            Chat with fellow C++ developers, ask questions, and stay updated on upcoming sessions.
          </p>
          <a
            :href="SITE.discordInvite"
            class="footer__discord-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconDiscord />
            Join Discord Server
          </a>
          <p class="footer__contact-email">
            <a :href="`mailto:${SITE.email}`" class="footer__link">{{ SITE.email }}</a>
          </p>
        </div>

      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p class="footer__copy">
          &copy; {{ currentYear }} CppIndia User Group. All rights reserved.
        </p>
        <div class="footer__bottom-links">
          <RouterLink to="/code-of-conduct" class="footer__bottom-link">Code of Conduct</RouterLink>
          <RouterLink to="/contact" class="footer__bottom-link">Contact</RouterLink>
          <a
            href="https://github.com/CppIndia-UserGroup"
            class="footer__bottom-link"
            target="_blank"
            rel="noopener noreferrer"
          >GitHub</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { SITE } from '@/constants'

const currentYear = computed(() => new Date().getFullYear())

const IconDiscord  = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>` }

const socialLinks = {
  discord:  { url: SITE.social.discord,  label: 'Discord',  icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>` } },
  youtube:  { url: SITE.social.youtube,  label: 'YouTube',  icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>` } },
  github:   { url: SITE.social.github,   label: 'GitHub',   icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>` } },
  linkedin: { url: SITE.social.linkedin, label: 'LinkedIn', icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>` } },
  twitter:  { url: SITE.social.twitter,  label: 'Twitter',  icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>` } },
}
</script>

<style lang="scss" scoped>
.footer {
  background: $color-dark;
  color: rgba(255, 255, 255, 0.75);

  &__body { padding: var(--space-16) 0 var(--space-10); }

  &__grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: var(--space-10);

    @include below(xl) { grid-template-columns: 1fr 1fr; }
    @include below(md) { grid-template-columns: 1fr; }
  }

  // Brand column
  &__logo {
    @include flex(center, flex-start, var(--space-3));
    text-decoration: none;
    margin-bottom: var(--space-4);


    &-text { display: flex; flex-direction: column; }

    &-name {
      font-family: var(--font-secondary);
      font-weight: var(--weight-bold);
      font-size: var(--text-lg);
      color: white;
      line-height: 1.1;
    }

    &-tagline {
      font-size: 10px;
      font-weight: var(--weight-medium);
      color: rgba(255,255,255,0.5);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
  }

  &__brand-text {
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: rgba(255,255,255,0.6);
    margin-bottom: var(--space-5);
  }

  &__social {
    @include flex(center, flex-start, var(--space-2));
  }

  &__social-link {
    width: 34px; height: 34px;
    @include flex(center, center);
    border-radius: var(--radius-md);
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.65);
    transition: all var(--transition-fast);

    &:hover {
      background: rgba(255,255,255,0.15);
      color: white;
    }
  }

  // Columns
  &__col { display: flex; flex-direction: column; }

  &__heading {
    font-family: var(--font-secondary);
    font-weight: var(--weight-semibold);
    font-size: var(--text-sm);
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: var(--space-4);
  }

  &__links { display: flex; flex-direction: column; gap: var(--space-2); }

  &__link {
    font-size: var(--text-sm);
    color: rgba(255,255,255,0.6);
    transition: color var(--transition-fast);
    &:hover { color: white; }
  }

  // Discord CTA
  &__discord-text {
    font-size: var(--text-sm);
    color: rgba(255,255,255,0.6);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-4);
  }

  &__discord-btn {
    @include flex(center, flex-start, var(--space-2));
    padding: var(--space-3) var(--space-5);
    background: #5865F2;
    color: white;
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    transition: all var(--transition-fast);
    margin-bottom: var(--space-4);
    width: fit-content;

    &:hover { background: #4752C4; transform: translateY(-1px); }
  }

  &__contact-email {
    font-size: var(--text-xs);
    color: rgba(255,255,255,0.5);
  }

  // Bottom bar
  &__bottom {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: var(--space-5) 0;

    &-inner {
      @include flex(center, space-between);
      flex-wrap: wrap;
      gap: var(--space-4);
    }
  }

  &__copy {
    font-size: var(--text-xs);
    color: rgba(255,255,255,0.45);
  }

  &__bottom-links {
    @include flex(center, flex-start, var(--space-5));
  }

  &__bottom-link {
    font-size: var(--text-xs);
    color: rgba(255,255,255,0.45);
    transition: color var(--transition-fast);
    &:hover { color: rgba(255,255,255,0.8); }
  }
}
</style>
