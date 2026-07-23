<template>
  <div>
    <PageHero
      overline="Get in Touch"
      title="Contact Us"
      subtitle="Questions, suggestions, or just want to say hi? We'd love to hear from you."
      :breadcrumb="[{ label: 'Contact', path: '/contact' }]"
    />

    <section class="section--sm">
      <div class="container grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 lg:gap-10 items-start">

        <!-- Left: contact channels -->
        <div class="flex flex-col gap-6">

          <!-- Direct contact -->
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest mb-3" style="color: var(--color-secondary)">Direct Contact</p>
            <div class="flex flex-col gap-3">
              <a :href="`mailto:${SITE.email}`"
                class="flex items-center gap-4 px-5 py-4 bg-surface border border-wire-light rounded-xl transition-all duration-150 hover:border-primary/40 hover:shadow-sm group">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white bg-gradient-to-br from-primary to-secondary shadow-sm" v-html="IconMailSvg" />
                <div class="min-w-0">
                  <p class="text-xs font-semibold uppercase tracking-wide text-ink-3 mb-0.5">Email Us</p>
                  <p class="text-sm font-semibold text-ink truncate group-hover:text-primary transition-colors">{{ SITE.email }}</p>
                  <p class="text-xs text-ink-3 mt-0.5">Reply within 24–48 hrs</p>
                </div>
              </a>
              <a :href="SITE.discordInvite" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-4 px-5 py-4 bg-surface border border-wire-light rounded-xl transition-all duration-150 hover:border-[var(--color-discord)]/40 hover:shadow-sm group">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white bg-[var(--color-discord)] shadow-sm" v-html="IconDiscordSvg" />
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-ink-3 mb-0.5">Discord Community</p>
                  <p class="text-sm font-semibold text-ink group-hover:text-[var(--color-discord)] transition-colors">Join our server</p>
                  <p class="text-xs text-ink-3 mt-0.5">Chat with the community in real time</p>
                </div>
              </a>
            </div>
          </div>

          <!-- Social links -->
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest mb-3" style="color: var(--color-secondary)">Follow Us</p>
            <div class="flex flex-col gap-2">
              <a
                v-for="link in socialLinks"
                :key="link.label"
                :href="link.url"
                class="flex items-center gap-3 px-4 py-3 bg-surface border border-wire-light rounded-lg transition-all duration-150 hover:border-secondary/40 hover:bg-secondary/[0.04] group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="w-8 h-8 flex items-center justify-center rounded-md bg-secondary/[0.08] text-secondary flex-shrink-0" v-html="link.iconSvg" />
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-ink group-hover:text-secondary transition-colors">{{ link.label }}</p>
                  <p class="text-xs text-ink-3 truncate">{{ link.handle }}</p>
                </div>
                <span class="ml-auto text-ink-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </span>
              </a>
            </div>
          </div>

          <!-- Team card -->
          <div class="p-5 bg-surface-alt border border-wire-light rounded-xl">
            <p class="text-sm font-semibold text-ink mb-1">Meet the Team</p>
            <p class="text-xs text-ink-3 mb-4">Want to see who's behind CppIndia?</p>
            <RouterLink to="/team" class="btn btn--outline btn--sm w-full justify-center">View Team →</RouterLink>
          </div>
        </div>

        <!-- Right: contact form -->
        <div class="bg-surface border border-wire-light rounded-2xl p-5 sm:p-8 lg:p-10 sticky top-[calc(var(--navbar-height,64px)+1.5rem)]">
          <h2 class="font-display text-2xl font-bold text-ink mb-2">Send a Message</h2>
          <p class="text-sm text-ink-3 mb-6">
            For talk proposals, use the
            <RouterLink to="/call-for-speakers" class="text-secondary underline">Call for Speakers</RouterLink>
            form instead.
          </p>

          <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
              <label for="cf-name" class="text-sm font-medium text-ink">Your Name *</label>
              <input
                id="cf-name"
                v-model="form.name"
                type="text"
                required
                placeholder="e.g. Priya Sharma"
                class="px-4 py-3 border border-wire rounded-md font-sans text-sm text-ink bg-canvas placeholder:text-ink-3 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-colors resize-y"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="cf-email" class="text-sm font-medium text-ink">Email Address *</label>
              <input
                id="cf-email"
                v-model="form.email"
                type="email"
                required
                placeholder="you@example.com"
                class="px-4 py-3 border border-wire rounded-md font-sans text-sm text-ink bg-canvas placeholder:text-ink-3 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-colors"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="cf-subject" class="text-sm font-medium text-ink">Subject *</label>
              <select
                id="cf-subject"
                v-model="form.subject"
                required
                class="px-4 py-3 border border-wire rounded-md font-sans text-sm text-ink bg-canvas focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-colors"
              >
                <option value="">Select a topic</option>
                <option value="General Question">General Question</option>
                <option value="Sponsorship Inquiry">Sponsorship Inquiry</option>
                <option value="Media / Press">Media / Press</option>
                <option value="Community Collaboration">Community Collaboration</option>
                <option value="Report a Code of Conduct Issue">Report a Code of Conduct Issue</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="flex flex-col gap-2">
              <label for="cf-message" class="text-sm font-medium text-ink">Message *</label>
              <textarea
                id="cf-message"
                v-model="form.message"
                required
                rows="5"
                placeholder="What's on your mind?"
                class="px-4 py-3 border border-wire rounded-md font-sans text-sm text-ink bg-canvas placeholder:text-ink-3 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-colors resize-y min-h-[120px]"
              />
            </div>

            <Transition name="fade-msg">
              <div
                v-if="status === 'success'"
                class="p-4 rounded-md text-sm font-medium bg-[rgba(74,222,128,0.08)] border border-[rgba(74,222,128,0.25)] text-green-400"
              >
                ✓ Your email client should be opening. Complete and send the email to reach us.
              </div>
              <div
                v-else-if="status === 'error'"
                class="p-4 rounded-md text-sm font-medium bg-[rgba(248,113,113,0.08)] border border-[rgba(248,113,113,0.25)] text-red-400"
              >
                ✗ Something went wrong. Please email us at
                <a :href="`mailto:${SITE.email}`" class="text-primary">{{ SITE.email }}</a>
              </div>
            </Transition>

            <button
              type="submit"
              class="btn btn--primary w-full justify-center"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
// mailto: opens the user's default mail client with form data pre-filled
import { useHead } from '@/composables/useHead'
import { SITE } from '@/constants'
import PageHero from '@/components/common/PageHero.vue'

useHead({
  title: 'Contact Us | CppIndia',
  description: 'Get in touch with CppIndia — questions, sponsorship inquiries, or community collaboration.',
})

const IconMailSvg    = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
const IconDiscordSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`

const socialLinks = [
  {
    label: 'YouTube',
    handle: '@CppIndiaUG',
    url: SITE.social.youtube,
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>`,
  },
  {
    label: 'LinkedIn',
    handle: 'linkedin.com/company/cppindia',
    url: SITE.social.linkedin,
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`,
  },
  {
    label: 'Twitter / X',
    handle: '@CppIndiaUG',
    url: SITE.social.twitter,
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  },
  {
    label: 'GitHub',
    handle: 'CppIndia-UserGroup',
    url: SITE.social.github,
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
  },
  {
    label: 'Facebook',
    handle: 'CppIndiaUG',
    url: SITE.social.facebook,
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>`,
  },
]

const form   = reactive({ name: '', email: '', subject: '', message: '' })
const status = ref(null)

function handleSubmit() {
  const subject = encodeURIComponent(`[${SITE.name} Contact] ${form.subject}`)
  const body    = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`
  )
  window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`
  status.value = 'success'
  Object.keys(form).forEach((k) => { form[k] = '' })
}
</script>

<style scoped>
.fade-msg-enter-active, .fade-msg-leave-active { transition: opacity 0.25s; }
.fade-msg-enter-from, .fade-msg-leave-to { opacity: 0; }
</style>
