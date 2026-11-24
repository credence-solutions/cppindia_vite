<template>
  <div class="playground-page flex flex-col flex-1">
  <PageHero
    overline="Try it Live"
    title="C++ Playground"
    subtitle="Curated C++17/20/23 code snippets with live Compiler Explorer integration. Click, explore, experiment."
  />

  <section class="section--sm flex-1" style="background: var(--emphasis-bg);">
    <div class="container">
      <div class="flex flex-col lg:flex-row gap-6" style="min-height: 600px;">

        <!-- Snippet sidebar -->
        <aside class="lg:w-64 flex-shrink-0 flex flex-col gap-3 lg:gap-4">
          <div class="rounded-2xl overflow-hidden flex flex-col lg:flex-1 lg:min-h-0" style="background: var(--card-bg); border: 1px solid var(--card-border);">
            <!-- Standard filter -->
            <div class="flex gap-1 p-2 flex-wrap" style="border-bottom: 1px solid var(--color-border);">
              <button v-for="std in standards" :key="std"
                @click="activeStd = std"
                class="px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-150"
                :style="activeStd === std
                  ? 'background:rgba(8,145,178,0.25); color:var(--color-primary-soft);'
                  : 'background:transparent; color:var(--color-text-muted);'"
              >{{ std }}</button>
            </div>

            <!-- Topic filter -->
            <div class="flex gap-1 p-2 flex-wrap" style="border-bottom: 1px solid var(--color-border);">
              <button v-for="topic in topics" :key="topic"
                @click="activeTopic = topic"
                class="px-2 py-0.5 rounded-md text-[10px] font-bold transition-all duration-150"
                :style="activeTopic === topic
                  ? 'background:rgba(34,211,238,0.2); color:#22D3EE;'
                  : 'background:transparent; color:var(--color-text-muted);'"
              >{{ topic }}</button>
            </div>

            <!-- Snippet list -->
            <div class="relative lg:flex-1" :style="sideBySide && listFitHeight ? `min-height:${listFitHeight}px` : null">
              <ul ref="listEl" class="snippet-list py-2 overflow-y-auto lg:absolute lg:inset-0"
                :style="!sideBySide && listFitHeight ? `max-height:${listFitHeight}px` : null">
                <li
                  v-for="s in filteredSnippets"
                  :key="s.id"
                  @click="active = s"
                  class="flex flex-col gap-1 px-4 py-3 cursor-pointer transition-all duration-150"
                  :style="active?.id === s.id
                    ? 'background:var(--badge-bg-strong); border-left:2px solid var(--color-primary-soft);'
                    : 'border-left:2px solid transparent;'"
                  onmouseover="if(!this.classList.contains('active')) this.style.background='rgba(8,145,178,0.06)'"
                  onmouseout="if(!this.classList.contains('active')) this.style.background='transparent'"
                >
                  <span class="text-sm font-semibold" style="color: var(--color-text);">{{ s.title }}</span>
                  <div class="flex items-center gap-1 flex-wrap">
                    <span class="text-[10px] font-bold px-1.5 py-[1px] rounded"
                      :style="stdColor(s.standard)">{{ s.standard }}</span>
                    <span v-for="tag in s.tags.filter(t => !t.startsWith('C++'))" :key="tag"
                      class="text-[10px] px-1.5 py-[1px] rounded"
                      style="background:rgba(34,211,238,0.08); color:rgba(34,211,238,0.7);">{{ tag }}</span>
                  </div>
                </li>
                <li v-if="!filteredSnippets.length" class="px-4 py-6 text-center text-xs" style="color:var(--color-text-muted);">
                  No snippets match these filters.
                </li>
              </ul>
            </div>
          </div>

          <!-- Submit CTA -->
          <a
            :href="`${SITE.social.github}/issues`"
            target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 lg:mt-auto"
            style="background:rgba(8,145,178,0.07); border:1px solid rgba(8,145,178,0.2);"
            onmouseover="this.style.borderColor='rgba(8,145,178,0.45)'; this.style.background='rgba(8,145,178,0.12)'"
            onmouseout="this.style.borderColor='rgba(8,145,178,0.2)'; this.style.background='rgba(8,145,178,0.07)'"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-soft)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            <div>
              <p class="text-xs font-semibold" style="color:var(--color-text);">Submit a Snippet</p>
              <p class="text-[10px]" style="color:var(--color-text-muted);">Share your C++ tip on GitHub</p>
            </div>
          </a>
        </aside>

        <!-- Main panel -->
        <div class="flex-1 flex flex-col gap-4 min-w-0">
          <div v-if="active" class="flex flex-col gap-4 flex-1">
            <!-- Snippet header -->
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div class="min-w-0 sm:flex-1">
                <h2 class="font-display font-bold text-lg" style="color: var(--color-text);">{{ active.title }}</h2>
                <p class="text-sm mt-1" style="color: var(--color-text-muted);">{{ active.description }}</p>
              </div>
              <a :href="godboltLink(active)" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white flex-shrink-0"
                style="background: var(--gradient-btn);">
                Open in Godbolt
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>

            <!-- Code block -->
            <div class="rounded-2xl overflow-hidden flex-1" style="background: #0D1117; border: 1px solid rgba(8,145,178,0.2);">
              <!-- macOS titlebar -->
              <div class="flex items-center gap-2 px-4 py-3" style="background:#161B22; border-bottom:1px solid rgba(8,145,178,0.1);">
                <span class="w-3 h-3 rounded-full" style="background:#FF5F56;"></span>
                <span class="w-3 h-3 rounded-full" style="background:#FFBD2E;"></span>
                <span class="w-3 h-3 rounded-full" style="background:#27C93F;"></span>
                <span class="ml-3 text-xs font-mono" style="color:var(--color-text-muted);">{{ active.id }}.cpp</span>
                <span class="ml-auto text-[10px] font-bold px-2 py-[1px] rounded" :style="stdColor(active.standard)">{{ active.standard }}</span>
              </div>
              <div class="code-block text-sm font-mono leading-relaxed" v-html="highlightedCode" />
            </div>

            <p v-if="active.author && active.author !== TEAM_AUTHOR" class="text-xs" style="color:var(--color-text-muted);">by {{ active.author }}</p>

            <!-- Run in Godbolt CTA -->
            <a
              :href="godboltLink(active)"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-150"
              style="background: rgba(8,145,178,0.07); border: 1px solid rgba(8,145,178,0.25);"
              onmouseover="this.style.borderColor='rgba(8,145,178,0.5)'; this.style.background='rgba(8,145,178,0.12)'"
              onmouseout="this.style.borderColor='rgba(8,145,178,0.25)'; this.style.background='rgba(8,145,178,0.07)'"
            >
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background:rgba(8,145,178,0.15);">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-soft)" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </div>
                <div class="min-w-0">
                  <p class="text-xs font-semibold" style="color: var(--color-text);">Run in Compiler Explorer</p>
                  <p class="text-[10px] truncate" style="color:var(--color-text-muted);">Opens cppindia.godbolt.org — compile and run live with GCC, Clang, or MSVC</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-soft)" stroke-width="2" style="flex-shrink:0;opacity:0.7;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>

          <!-- Empty state -->
          <div v-else class="flex-1 flex items-center justify-center rounded-2xl" style="border: 1px dashed rgba(8,145,178,0.25);">
            <div class="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-3" style="color:rgba(8,145,178,0.3);"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              <p class="font-semibold" style="color:var(--color-text-muted);">Select a snippet to explore</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useHead } from '@/composables/useHead'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import cpp from 'shiki/langs/cpp.mjs'
import githubDark from 'shiki/themes/github-dark.mjs'
import PageHero from '@/components/common/PageHero.vue'
import snippetsData from '@/data/snippets.json'
import { SITE } from '@/constants'

useHead({
  title: 'C++ Playground | CppIndia',
  description: 'Curated C++17/20/23 code snippets with live Compiler Explorer integration — click, explore, experiment.',
})

// Only credit community contributors; team-written snippets need no byline.
const TEAM_AUTHOR = 'CppIndia Team'

const standards = ['All', 'C++17', 'C++20', 'C++23']
const activeStd   = ref('All')
const activeTopic = ref('All')
const active = ref(snippetsData[0])

const stdTags = new Set(['C++17', 'C++20', 'C++23'])
const topics = ['All', ...new Set(snippetsData.flatMap(s => s.tags.filter(t => !stdTags.has(t))))]

const filteredSnippets = computed(() => {
  return snippetsData.filter(s => {
    const stdOk   = activeStd.value === 'All' || s.standard === activeStd.value
    const topicOk = activeTopic.value === 'All' || s.tags.includes(activeTopic.value)
    return stdOk && topicOk
  })
})

// The list shows VISIBLE_SNIPPETS names, then scrolls. Stacked (below lg) that
// is its exact height; side by side it is the minimum, and the list stretches
// so the box ends level with the code panel. Titles wrap, so item heights
// vary — measure where the next item starts instead of assuming one.
const VISIBLE_SNIPPETS = 4
const listEl = ref(null)
const listFitHeight = ref(null)
const sideBySide = ref(false)
const lgQuery = typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)') : null

function fitList() {
  const ul = listEl.value
  if (!ul) return
  sideBySide.value = !!lgQuery?.matches
  const next = ul.children[VISIBLE_SNIPPETS]
  listFitHeight.value = next
    ? next.getBoundingClientRect().top - ul.getBoundingClientRect().top + ul.scrollTop
    : null
}

let resizeObserver = null
onMounted(() => {
  fitList()
  resizeObserver = new ResizeObserver(fitList)
  resizeObserver.observe(listEl.value)
})
onBeforeUnmount(() => resizeObserver?.disconnect())
watch(filteredSnippets, () => nextTick(fitList))

// Shared highlighter instance — created once, reused for every snippet.
// Fine-grained core bundle (only cpp + github-dark) so the build doesn't
// pull in Shiki's full 200+ language/theme registry.
let highlighterPromise = null
function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [githubDark],
      langs: [cpp],
      engine: createJavaScriptRegexEngine(),
    })
  }
  return highlighterPromise
}

const highlightedCode = ref('')
watchEffect(async () => {
  const snippet = active.value
  if (!snippet) return
  const highlighter = await getHighlighter()
  highlightedCode.value = highlighter.codeToHtml(snippet.code, { lang: 'cpp', theme: 'github-dark' })
})

// Snippets without a saved short link open via Compiler Explorer's
// clientstate URL, which carries the source and compiler setup inline.
function godboltLink(snippet) {
  if (snippet.godboltUrl) return snippet.godboltUrl
  const options = `-std=${snippet.standard.toLowerCase()} -O2`
  const state = {
    sessions: [{
      id: 1,
      language: 'c++',
      source: snippet.code,
      compilers: [{ id: 'g141', options }],
      executors: [{ compiler: { id: 'g141', options, libs: [] } }],
    }],
  }
  const bytes = new TextEncoder().encode(JSON.stringify(state))
  const base64 = btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  return `https://cppindia.godbolt.org/clientstate/${base64}`
}

function stdColor(std) {
  if (std === 'C++23') return 'background:rgba(8,145,178,0.15); color:var(--color-secondary-mid); border:1px solid rgba(8,145,178,0.3);'
  if (std === 'C++20') return 'background:rgba(34,211,238,0.12); color:#22D3EE; border:1px solid rgba(34,211,238,0.3);'
  return 'background:rgba(52,211,153,0.12); color:#059669; border:1px solid rgba(52,211,153,0.3);'
}
</script>

<style scoped>
.snippet-list {
  scrollbar-width: thin;
  scrollbar-color: rgba(8,145,178,0.35) transparent;
}
.snippet-list::-webkit-scrollbar { width: 6px; }
.snippet-list::-webkit-scrollbar-thumb {
  background: rgba(8,145,178,0.35);
  border-radius: 3px;
}
.code-block :deep(pre.shiki) {
  margin: 0;
  padding: 1.25rem;
  overflow-x: auto;
  background: transparent !important;
}
</style>

<style>
/* On screens taller than the page, let the snippet section's background run
   down to the footer instead of leaving a plain band above it. */
.layout__main:has(> .playground-page) {
  display: flex;
  flex-direction: column;
}
</style>
