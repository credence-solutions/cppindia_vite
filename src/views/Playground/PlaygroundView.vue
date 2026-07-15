<template>
  <PageHero
    overline="Try it Live"
    title="C++ Playground"
    subtitle="Curated C++17/20/23 code snippets with live Compiler Explorer integration. Click, explore, experiment."
  />

  <section class="section" style="background: #07091C; min-height: 70vh;">
    <div class="container">
      <div class="flex flex-col lg:flex-row gap-6" style="min-height: 600px;">

        <!-- Snippet sidebar -->
        <aside class="lg:w-72 flex-shrink-0">
          <div class="rounded-2xl overflow-hidden" style="background: rgba(15,17,45,0.9); border: 1px solid rgba(99,102,241,0.2);">
            <!-- Standard filter -->
            <div class="flex gap-1 p-2 flex-wrap" style="border-bottom: 1px solid rgba(99,102,241,0.15);">
              <button v-for="std in standards" :key="std"
                @click="activeStd = std"
                class="px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-150"
                :style="activeStd === std
                  ? 'background:rgba(99,102,241,0.25); color:#818CF8;'
                  : 'background:transparent; color:rgba(148,163,184,0.5);'"
              >{{ std }}</button>
            </div>

            <!-- Snippet list -->
            <ul class="py-2">
              <li
                v-for="s in filteredSnippets"
                :key="s.id"
                @click="active = s"
                class="flex flex-col gap-1 px-4 py-3 cursor-pointer transition-all duration-150"
                :style="active?.id === s.id
                  ? 'background:rgba(99,102,241,0.15); border-left:2px solid #818CF8;'
                  : 'border-left:2px solid transparent;'"
                onmouseover="if(!this.classList.contains('active')) this.style.background='rgba(99,102,241,0.06)'"
                onmouseout="if(!this.classList.contains('active')) this.style.background='transparent'"
              >
                <span class="text-sm font-semibold" style="color:#E2E8F5;">{{ s.title }}</span>
                <span class="text-[10px] font-bold px-1.5 py-[1px] rounded w-fit"
                  :style="stdColor(s.standard)">{{ s.standard }}</span>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Main panel -->
        <div class="flex-1 flex flex-col gap-4 min-w-0">
          <div v-if="active" class="flex flex-col gap-4 h-full">
            <!-- Snippet header -->
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 class="font-display font-bold text-lg" style="color:#E2E8F5;">{{ active.title }}</h2>
                <p class="text-sm mt-1" style="color:rgba(148,163,184,0.7);">{{ active.description }}</p>
              </div>
              <a :href="active.godboltUrl" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white flex-shrink-0"
                style="background: linear-gradient(135deg, #6366F1, #818CF8);">
                Open in Godbolt
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>

            <!-- Code block -->
            <div class="rounded-2xl overflow-hidden flex-shrink-0" style="background: #0D1117; border: 1px solid rgba(99,102,241,0.2);">
              <!-- macOS titlebar -->
              <div class="flex items-center gap-2 px-4 py-3" style="background:#161B22; border-bottom:1px solid rgba(99,102,241,0.1);">
                <span class="w-3 h-3 rounded-full" style="background:#FF5F56;"></span>
                <span class="w-3 h-3 rounded-full" style="background:#FFBD2E;"></span>
                <span class="w-3 h-3 rounded-full" style="background:#27C93F;"></span>
                <span class="ml-3 text-xs font-mono" style="color:rgba(148,163,184,0.4);">{{ active.id }}.cpp</span>
                <span class="ml-auto text-[10px] font-bold px-2 py-[1px] rounded" :style="stdColor(active.standard)">{{ active.standard }}</span>
              </div>
              <pre class="p-5 overflow-x-auto text-sm font-mono leading-relaxed" style="color:#E2E8F5; margin:0;">{{ active.code }}</pre>
            </div>

            <!-- Godbolt embed -->
            <div class="rounded-2xl overflow-hidden flex-1" style="min-height:320px; border: 1px solid rgba(99,102,241,0.2);">
              <div class="flex items-center gap-2 px-4 py-2.5" style="background:rgba(15,17,45,0.95); border-bottom:1px solid rgba(99,102,241,0.15);">
                <span class="w-2 h-2 rounded-full" style="background:#34D399;"></span>
                <span class="text-xs font-mono" style="color:rgba(148,163,184,0.55);">Compiler Explorer — godbolt.org</span>
              </div>
              <iframe
                :key="active.id"
                :src="`${active.godboltUrl}#embed`"
                allow="clipboard-write"
                class="w-full h-full"
                style="min-height:300px; border:none; background:#0D1117;"
                title="Compiler Explorer"
              ></iframe>
            </div>

            <p class="text-xs" style="color:rgba(148,163,184,0.4);">by {{ active.author }}</p>
          </div>

          <!-- Empty state -->
          <div v-else class="flex-1 flex items-center justify-center rounded-2xl" style="border: 1px dashed rgba(99,102,241,0.25);">
            <div class="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-3" style="color:rgba(99,102,241,0.3);"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              <p class="font-semibold" style="color:rgba(148,163,184,0.5);">Select a snippet to explore</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHero from '@/components/common/PageHero.vue'
import snippetsData from '@/data/snippets.json'

const standards = ['All', 'C++17', 'C++20', 'C++23']
const activeStd = ref('All')
const active = ref(snippetsData[0])

const filteredSnippets = computed(() =>
  activeStd.value === 'All'
    ? snippetsData
    : snippetsData.filter(s => s.standard === activeStd.value)
)

function stdColor(std) {
  if (std === 'C++23') return 'background:rgba(167,139,250,0.15); color:#A78BFA; border:1px solid rgba(167,139,250,0.3);'
  if (std === 'C++20') return 'background:rgba(34,211,238,0.12); color:#22D3EE; border:1px solid rgba(34,211,238,0.3);'
  return 'background:rgba(52,211,153,0.12); color:#34D399; border:1px solid rgba(52,211,153,0.3);'
}
</script>
