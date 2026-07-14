<template>
  <div class="contact-page">
    <PageHero
      overline="Get in Touch"
      title="Contact Us"
      subtitle="Questions, suggestions, or just want to say hi? We'd love to hear from you."
      :breadcrumb="[{ label: 'Contact', path: '/contact' }]"
    />

    <section class="section contact-page__body">
      <div class="container contact-page__layout">

        <!-- Left: contact channels -->
        <div class="contact-page__channels">
          <h2 class="contact-page__heading">Reach Us Directly</h2>

          <div class="contact-channel">
            <div class="contact-channel__icon contact-channel__icon--email">
              <IconMail />
            </div>
            <div>
              <p class="contact-channel__label">Email</p>
              <a :href="`mailto:${SITE.email}`" class="contact-channel__value">
                {{ SITE.email }}
              </a>
              <p class="contact-channel__note">We typically reply within 24–48 hours.</p>
            </div>
          </div>

          <div class="contact-channel">
            <div class="contact-channel__icon contact-channel__icon--discord">
              <IconDiscord />
            </div>
            <div>
              <p class="contact-channel__label">Discord Community</p>
              <a :href="SITE.discordInvite" class="contact-channel__value" target="_blank" rel="noopener noreferrer">
                discord.gg/Wz42tX5
              </a>
              <p class="contact-channel__note">Chat with members and moderators in real time.</p>
            </div>
          </div>

          <!-- Social links -->
          <h2 class="contact-page__heading">Follow Us</h2>
          <div class="contact-socials">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.url"
              class="contact-social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <component :is="link.icon" class="contact-social__icon" />
              <div>
                <p class="contact-social__label">{{ link.label }}</p>
                <p class="contact-social__handle">{{ link.handle }}</p>
              </div>
            </a>
          </div>

          <!-- Team card -->
          <div class="contact-team-card">
            <p class="contact-team-card__text">
              Want to meet the people behind CppIndia?
            </p>
            <RouterLink to="/team" class="btn btn--outline">
              Meet the Team →
            </RouterLink>
          </div>
        </div>

        <!-- Right: contact form -->
        <div class="contact-page__form-wrap">
          <div class="contact-form-card">
            <h2 class="contact-form-card__title">Send a Message</h2>
            <p class="contact-form-card__note">
              For talk proposals, use the
              <RouterLink to="/call-for-speakers" class="contact-form-card__link">Call for Speakers</RouterLink>
              form instead.
            </p>

            <form class="contact-form" @submit.prevent="handleSubmit">
              <div class="contact-form__field">
                <label for="cf-name">Your Name *</label>
                <input id="cf-name" v-model="form.name" type="text" required placeholder="e.g. Priya Sharma" />
              </div>

              <div class="contact-form__field">
                <label for="cf-email">Email Address *</label>
                <input id="cf-email" v-model="form.email" type="email" required placeholder="you@example.com" />
              </div>

              <div class="contact-form__field">
                <label for="cf-subject">Subject *</label>
                <select id="cf-subject" v-model="form.subject" required>
                  <option value="">Select a topic</option>
                  <option value="General Question">General Question</option>
                  <option value="Sponsorship Inquiry">Sponsorship Inquiry</option>
                  <option value="Media / Press">Media / Press</option>
                  <option value="Community Collaboration">Community Collaboration</option>
                  <option value="Report a Code of Conduct Issue">Report a Code of Conduct Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div class="contact-form__field">
                <label for="cf-message">Message *</label>
                <textarea id="cf-message" v-model="form.message" required rows="5" placeholder="What's on your mind?" />
              </div>

              <Transition name="fade-msg">
                <div v-if="status === 'success'" class="contact-form__alert contact-form__alert--success">
                  ✓ Message sent! We'll get back to you soon.
                </div>
                <div v-else-if="status === 'error'" class="contact-form__alert contact-form__alert--error">
                  ✗ Something went wrong. Please email us at
                  <a :href="`mailto:${SITE.email}`">{{ SITE.email }}</a>
                </div>
              </Transition>

              <button type="submit" class="btn btn--primary contact-form__submit" :disabled="submitting">
                {{ submitting ? 'Sending…' : 'Send Message' }}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useHead } from '@/composables/useHead'
import { SITE } from '@/constants'
import PageHero from '@/components/common/PageHero.vue'

useHead({
  title: 'Contact Us | CppIndia',
  description: 'Get in touch with CppIndia — questions, sponsorship inquiries, or community collaboration.',
})

const IconMail    = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>` }
const IconDiscord = { template: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>` }

const socialLinks = [
  {
    label: 'YouTube',
    handle: '@CppIndiaUG',
    url: SITE.social.youtube,
    icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>` },
  },
  {
    label: 'LinkedIn',
    handle: 'linkedin.com/company/cppindia',
    url: SITE.social.linkedin,
    icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>` },
  },
  {
    label: 'Twitter / X',
    handle: '@CppIndiaUG',
    url: SITE.social.twitter,
    icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>` },
  },
  {
    label: 'GitHub',
    handle: 'CppIndia-UserGroup',
    url: SITE.social.github,
    icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>` },
  },
  {
    label: 'Facebook',
    handle: 'CppIndiaUG',
    url: SITE.social.facebook,
    icon: { template: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>` },
  },
]

const form       = reactive({ name: '', email: '', subject: '', message: '' })
const submitting = ref(false)
const status     = ref(null)

async function handleSubmit() {
  submitting.value = true
  status.value = null
  try {
    await new Promise((r) => setTimeout(r, 800))
    status.value = 'success'
    Object.keys(form).forEach((k) => { form[k] = '' })
  } catch {
    status.value = 'error'
  } finally {
    submitting.value = false
  }
}
</script>

<style lang="scss" scoped>
.contact-page {
  &__body { background: var(--color-bg); }

  &__layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: flex-start;

    @include below(lg) { grid-template-columns: 1fr; }
  }

  &__heading {
    font-family: var(--font-secondary);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-6);
    margin-top: var(--space-8);

    &:first-child { margin-top: 0; }
  }

  &__channels { display: flex; flex-direction: column; }
}

// Channel rows
.contact-channel {
  @include flex(flex-start, flex-start, var(--space-5));
  padding: var(--space-5);
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-4);
  transition: all var(--transition-base);

  &:hover {
    border-color: rgba(79,142,247,0.25);
    box-shadow: $glow-primary;
  }

  &__icon {
    width: 48px; height: 48px;
    border-radius: var(--radius-lg);
    @include flex(center, center);
    flex-shrink: 0;
    color: white;

    &--email   { background: linear-gradient(135deg, $color-primary, $color-secondary); }
    &--discord { background: #5865F2; }
  }

  &__label {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: var(--space-1);
  }

  &__value {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: $color-primary;
    transition: color var(--transition-fast);
    &:hover { color: $color-secondary; }
  }

  &__note {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    margin-top: var(--space-1);
  }
}

// Social grid
.contact-socials {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
  margin-bottom: var(--space-8);

  @include below(sm) { grid-template-columns: 1fr; }
}

.contact-social {
  @include flex(center, flex-start, var(--space-3));
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);

  &:hover {
    border-color: rgba(155,116,245,0.3);
    background: rgba(155,116,245,0.06);
  }

  &__icon { color: $color-secondary; flex-shrink: 0; }

  &__label {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: var(--color-text);
  }

  &__handle {
    font-size: 10px;
    color: var(--color-text-muted);
    margin-top: 1px;
  }
}

// Team card
.contact-team-card {
  @include flex(center, space-between);
  gap: var(--space-4);
  padding: var(--space-5) var(--space-6);
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  flex-wrap: wrap;

  &__text {
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
  }
}

// Form card
.contact-form-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  position: sticky;
  top: calc(var(--navbar-height) + var(--space-6));

  &__title {
    font-family: var(--font-secondary);
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--color-text);
    margin-bottom: var(--space-2);
  }

  &__note {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    margin-bottom: var(--space-6);
  }

  &__link {
    color: $color-secondary;
    text-decoration: underline;
  }
}

// Form
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  &__field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);

    label {
      font-size: var(--text-sm);
      font-weight: var(--weight-medium);
      color: var(--color-text);
    }

    input, select, textarea {
      padding: var(--space-3) var(--space-4);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-family: var(--font-primary);
      font-size: var(--text-sm);
      color: var(--color-text);
      background: var(--color-bg);
      transition: border-color var(--transition-fast);
      resize: vertical;

      option { background: var(--color-surface); }

      &:focus {
        outline: none;
        border-color: $color-secondary;
        box-shadow: 0 0 0 3px rgba(155, 116, 245, 0.12);
      }

      &::placeholder { color: var(--color-text-muted); }
    }

    textarea { min-height: 120px; }
  }

  &__alert {
    padding: var(--space-4);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);

    &--success {
      background: rgba(74, 222, 128, 0.08);
      border: 1px solid rgba(74, 222, 128, 0.25);
      color: $color-success;
    }

    &--error {
      background: rgba(248, 113, 113, 0.08);
      border: 1px solid rgba(248, 113, 113, 0.25);
      color: $color-error;
      a { color: $color-primary; }
    }
  }

  &__submit { width: 100%; justify-content: center; }
}

.fade-msg-enter-active, .fade-msg-leave-active { transition: opacity 0.25s; }
.fade-msg-enter-from, .fade-msg-leave-to { opacity: 0; }
</style>
