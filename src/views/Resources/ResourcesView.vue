<template>
  <div>
    <PageHero
      overline="C++ Learning"
      title="Resources"
      subtitle="Curated C++ references, standards, articles, and community-recommended learning materials."
      :breadcrumb="[{ label: 'Resources', path: '/resources' }]"
    />

    <section class="section" style="background: #0B0D2E;">
      <div class="container">

        <!-- References -->
        <div id="references" class="mb-14">
          <h2 class="font-display text-xl lg:text-3xl font-bold mb-6 pb-4"
            style="background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; border-bottom: 2px solid rgba(99,102,241,0.2);">
            C++ Language &amp; References
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <a
              v-for="r in resources.references"
              :key="r.id"
              :href="r.url"
              class="flex flex-col gap-3 p-6 rounded-xl transition-all duration-200"
              style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(99,102,241,0.45)'; this.style.boxShadow='0 0 20px rgba(99,102,241,0.15)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(99,102,241,0.2)'; this.style.boxShadow='none'"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.04em]"
                  style="background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2); color: rgba(148,163,184,0.65);">{{ r.type }}</span>
                <span v-if="r.free" class="px-2 py-0.5 rounded text-[10px] font-bold"
                  style="background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); color: #34D399;">Free</span>
              </div>
              <h3 class="font-display text-base font-bold leading-snug" style="color: #E2E8F5;">{{ r.title }}</h3>
              <p class="text-sm leading-relaxed flex-1" style="color: rgba(148,163,184,0.75);">{{ r.description }}</p>
              <span class="flex items-center gap-1 text-xs font-semibold mt-auto" style="color: #A78BFA;">
                Open resource
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </span>
            </a>
          </div>
        </div>

        <!-- Articles -->
        <div id="articles" class="mb-14">
          <h2 class="font-display text-xl lg:text-3xl font-bold mb-6 pb-4"
            style="background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; border-bottom: 2px solid rgba(99,102,241,0.2);">
            Articles &amp; Blogs
          </h2>
          <div v-if="resources.articles.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <a
              v-for="r in resources.articles"
              :key="r.id"
              :href="r.url"
              class="flex flex-col gap-3 p-6 rounded-xl transition-all duration-200"
              style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2);"
              onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(99,102,241,0.45)'; this.style.boxShadow='0 0 20px rgba(99,102,241,0.15)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(99,102,241,0.2)'; this.style.boxShadow='none'"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="flex items-center justify-between gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-[0.04em]"
                  style="background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2); color: rgba(148,163,184,0.65);">{{ r.type }}</span>
                <span v-if="r.free" class="px-2 py-0.5 rounded text-[10px] font-bold"
                  style="background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); color: #34D399;">Free</span>
              </div>
              <h3 class="font-display text-base font-bold leading-snug" style="color: #E2E8F5;">{{ r.title }}</h3>
              <p class="text-sm leading-relaxed flex-1" style="color: rgba(148,163,184,0.75);">{{ r.description }}</p>
            </a>
          </div>
          <div v-else class="p-8 rounded-xl text-base leading-relaxed"
            style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2); color: rgba(148,163,184,0.75);">
            <p>Community-curated articles coming soon. Check out the
              <a :href="SITE.social.github" target="_blank" rel="noopener noreferrer"
                style="color: #A78BFA;"
                class="underline transition-colors"
                onmouseover="this.style.color='#818CF8'"
                onmouseout="this.style.color='#A78BFA'"
              >GitHub repo</a>
              for session materials from past talks.
            </p>
          </div>
        </div>

        <!-- Monthly picks -->
        <div id="monthly">
          <h2 class="font-display text-xl lg:text-3xl font-bold mb-6 pb-4"
            style="background: linear-gradient(100deg, #818CF8 0%, #22D3EE 50%, #34D399 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; border-bottom: 2px solid rgba(99,102,241,0.2);">
            Book / Blog / Video of the Month
          </h2>
          <div class="p-8 rounded-xl text-base leading-relaxed"
            style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2); color: rgba(148,163,184,0.75);">
            <p>Monthly community picks are shared on our
              <a :href="SITE.social.discord" target="_blank" rel="noopener noreferrer"
                style="color: #A78BFA;"
                class="underline transition-colors"
                onmouseover="this.style.color='#818CF8'"
                onmouseout="this.style.color='#A78BFA'"
              >Discord server</a>
              and
              <a :href="SITE.social.linkedin" target="_blank" rel="noopener noreferrer"
                style="color: #A78BFA;"
                class="underline transition-colors"
                onmouseover="this.style.color='#818CF8'"
                onmouseout="this.style.color='#A78BFA'"
              >LinkedIn</a>.
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
