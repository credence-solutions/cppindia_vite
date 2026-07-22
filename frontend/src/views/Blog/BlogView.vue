<template>
  <div>
  <PageHero
    overline="Knowledge Base"
    title="Blog & Articles"
    subtitle="Tutorials, trip reports, and C++ insights from community members."
    :breadcrumb="[{ label: 'Blog', path: '/blog' }]"
  />

  <section class="section--sm" style="background: var(--emphasis-bg);">
    <div class="container">

      <!-- Tag filter -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button v-for="tag in allTags" :key="tag"
          @click="activeTag = tag"
          class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
          :style="activeTag === tag
            ? 'background:rgba(8,145,178,0.2); color:var(--color-primary-soft); border:1px solid rgba(8,145,178,0.45);'
            : 'background:transparent; color:var(--color-text-secondary); border:1px solid var(--color-border);'"
        >{{ tag }}</button>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="post in filtered"
          :key="post.slug"
          class="rounded-2xl overflow-hidden flex flex-col transition-all duration-200 cursor-pointer"
          style="background: var(--card-bg); border: 1px solid var(--card-border);"
          onmouseover="this.style.borderColor='rgba(8,145,178,0.45)'; this.style.boxShadow='0 0 24px rgba(8,145,178,0.15)'; this.style.transform='translateY(-3px)'"
          onmouseout="this.style.borderColor='var(--card-border)'; this.style.boxShadow='none'; this.style.transform='translateY(0)'"
          @click="$router.push(`/blog/${post.slug}`)"
        >
          <!-- Cover placeholder -->
          <div class="aspect-video flex items-center justify-center"
            :style="`background: ${coverGradient(post.slug)};`">
            <span class="font-display font-bold text-2xl opacity-40 select-none" style="color:var(--color-primary-soft);">{{ post.tags[0] }}</span>
          </div>

          <div class="flex flex-col flex-1 gap-3 p-5">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <time class="font-mono text-xs" style="color:var(--color-text-muted);" :datetime="post.date">{{ formatDate(post.date) }}</time>
              <div class="flex flex-wrap gap-1">
                <span v-for="tag in post.tags.slice(0,2)" :key="tag"
                  class="text-[10px] font-semibold px-2 py-[2px] rounded-full"
                  style="background:rgba(8,145,178,0.12); color:var(--color-primary-soft); border:1px solid rgba(8,145,178,0.25);">{{ tag }}</span>
              </div>
            </div>
            <h3 class="font-display font-bold text-base leading-snug flex-1" style="color:var(--color-text);">{{ post.title }}</h3>
            <p class="text-sm" style="color:var(--color-text-secondary);">{{ post.excerpt }}</p>
            <div class="flex items-center justify-between mt-auto pt-2">
              <div class="text-xs" style="color:var(--color-text-muted);">
                <span class="font-medium" style="color: var(--color-text-secondary);">{{ post.author }}</span>
                &middot; {{ post.readingTime }} min read
              </div>
              <RouterLink :to="`/blog/${post.slug}`" class="text-xs font-semibold" style="color:var(--color-primary-soft);">Read →</RouterLink>
            </div>
          </div>
        </article>
      </div>

      <!-- Newsletter signup -->
      <div class="mt-10">
        <NewsletterSignup
          title="Get the CppIndia Newsletter"
          description="Monthly digest of talks, resources, and community highlights. Delivered to your inbox via Discord."
          :showArchive="true"
        />
      </div>

      <!-- Write CTA -->
      <div class="mt-10 sm:mt-14 rounded-2xl p-5 sm:p-8 text-center" style="background: linear-gradient(135deg, rgba(8,145,178,0.1), rgba(52,211,153,0.05)); border:1px solid rgba(8,145,178,0.25);">
        <p class="font-display font-bold text-lg mb-2" style="color:var(--color-text);">Want to write for CppIndia?</p>
        <p class="text-sm mb-5" style="color:var(--color-text-secondary);">Share a tutorial, trip report, or C++ insight with 1,000+ readers. We welcome all levels.</p>
        <a href="mailto:info@cppindia.co.in"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
          style="background: var(--gradient-btn);">Submit an Article</a>
      </div>

    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHero from '@/components/common/PageHero.vue'
import NewsletterSignup from '@/components/common/NewsletterSignup.vue'
import blogData from '@/data/blog.json'

const allTags = ['All', ...new Set(blogData.flatMap(p => p.tags))]
const activeTag = ref('All')

const filtered = computed(() =>
  activeTag.value === 'All'
    ? blogData
    : blogData.filter(p => p.tags.includes(activeTag.value))
)

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

const gradients = [
  'linear-gradient(135deg, rgba(8,145,178,0.25) 0%, rgba(34,211,238,0.15) 100%)',
  'linear-gradient(135deg, rgba(8,145,178,0.25) 0%, rgba(8,145,178,0.15) 100%)',
  'linear-gradient(135deg, rgba(34,211,238,0.2) 0%, rgba(52,211,153,0.15) 100%)',
  'linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(8,145,178,0.12) 100%)',
  'linear-gradient(135deg, rgba(8,145,178,0.2) 0%, rgba(34,211,238,0.12) 100%)',
]
function coverGradient(slug) {
  const idx = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % gradients.length
  return gradients[idx]
}
</script>
