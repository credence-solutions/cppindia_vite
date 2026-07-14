<template>
  <div>
    <PageHero
      overline="C++ Learning"
      title="Resources"
      subtitle="Curated C++ references, standards, articles, and community-recommended learning materials."
      :breadcrumb="[{ label: 'Resources', path: '/resources' }]"
    />

    <section class="section">
      <div class="container">

        <!-- References -->
        <div id="references" class="mb-14">
          <h2 class="font-display text-xl lg:text-3xl font-bold text-ink mb-6 pb-4 border-b-2 border-wire-light">
            C++ Language &amp; References
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <a
              v-for="r in resources.references"
              :key="r.id"
              :href="r.url"
              class="flex flex-col gap-3 p-6 bg-surface border border-wire-light rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="px-2 py-0.5 bg-surface-alt border border-wire-light rounded text-[10px] font-semibold text-ink-3 uppercase tracking-[0.04em]">{{ r.type }}</span>
                <span v-if="r.free" class="px-2 py-0.5 bg-[rgba(46,125,50,0.1)] border border-[rgba(46,125,50,0.3)] rounded text-[10px] font-bold text-green-400">Free</span>
              </div>
              <h3 class="font-display text-base font-bold text-ink leading-snug">{{ r.title }}</h3>
              <p class="text-sm text-ink-2 leading-relaxed flex-1">{{ r.description }}</p>
              <span class="flex items-center gap-1 text-xs font-semibold text-secondary mt-auto">
                Open resource
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </a>
          </div>
        </div>

        <!-- Articles -->
        <div id="articles" class="mb-14">
          <h2 class="font-display text-xl lg:text-3xl font-bold text-ink mb-6 pb-4 border-b-2 border-wire-light">
            Articles &amp; Blogs
          </h2>
          <div v-if="resources.articles.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <a
              v-for="r in resources.articles"
              :key="r.id"
              :href="r.url"
              class="flex flex-col gap-3 p-6 bg-surface border border-wire-light rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="px-2 py-0.5 bg-surface-alt border border-wire-light rounded text-[10px] font-semibold text-ink-3 uppercase tracking-[0.04em]">{{ r.type }}</span>
                <span v-if="r.free" class="px-2 py-0.5 bg-[rgba(46,125,50,0.1)] border border-[rgba(46,125,50,0.3)] rounded text-[10px] font-bold text-green-400">Free</span>
              </div>
              <h3 class="font-display text-base font-bold text-ink leading-snug">{{ r.title }}</h3>
              <p class="text-sm text-ink-2 leading-relaxed flex-1">{{ r.description }}</p>
            </a>
          </div>
          <div v-else class="p-8 bg-surface-alt border border-wire-light rounded-xl text-base text-ink-2 leading-relaxed">
            <p>Community-curated articles coming soon. Check out the
              <a :href="SITE.social.github" target="_blank" rel="noopener noreferrer" class="text-secondary underline hover:text-primary transition-colors">GitHub repo</a>
              for session materials from past talks.
            </p>
          </div>
        </div>

        <!-- Monthly picks -->
        <div id="monthly">
          <h2 class="font-display text-xl lg:text-3xl font-bold text-ink mb-6 pb-4 border-b-2 border-wire-light">
            Book / Blog / Video of the Month
          </h2>
          <div class="p-8 bg-surface-alt border border-wire-light rounded-xl text-base text-ink-2 leading-relaxed">
            <p>Monthly community picks are shared on our
              <a :href="SITE.social.discord" target="_blank" rel="noopener noreferrer" class="text-secondary underline hover:text-primary transition-colors">Discord server</a>
              and
              <a :href="SITE.social.linkedin" target="_blank" rel="noopener noreferrer" class="text-secondary underline hover:text-primary transition-colors">LinkedIn</a>.
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
