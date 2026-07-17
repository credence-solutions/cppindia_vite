<template>
  <div>
  <PageHero
    overline="Aspiring Speakers"
    title="CFP Tracker"
    subtitle="Open Calls for Proposals at C++ conferences worldwide — deadlines, links, and everything you need to submit."
  />

  <section class="section" style="background: #07091C;">
    <div class="container">

      <!-- Status filter -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button v-for="s in statuses" :key="s.value"
          @click="activeStatus = s.value"
          class="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
          :style="activeStatus === s.value
            ? `background:${s.bg}; color:${s.color}; border:1px solid ${s.border};`
            : 'background:transparent; color:rgba(148,163,184,0.6); border:1px solid rgba(99,102,241,0.15);'"
        >{{ s.label }}</button>
      </div>

      <!-- Table -->
      <div class="rounded-2xl overflow-hidden" style="border: 1px solid rgba(99,102,241,0.18);">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr style="background: rgba(15,17,45,0.95); border-bottom: 1px solid rgba(99,102,241,0.18);">
                <th class="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider" style="color:rgba(148,163,184,0.55);">Conference</th>
                <th class="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider" style="color:rgba(148,163,184,0.55);">CFP Deadline</th>
                <th class="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider hidden md:table-cell" style="color:rgba(148,163,184,0.55);">Event Date</th>
                <th class="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell" style="color:rgba(148,163,184,0.55);">Location</th>
                <th class="text-left px-5 py-3 font-semibold text-xs uppercase tracking-wider" style="color:rgba(148,163,184,0.55);">Status</th>
                <th class="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="cfp in filtered"
                :key="cfp.id"
                style="border-bottom: 1px solid rgba(99,102,241,0.1);"
                onmouseover="this.style.background='rgba(99,102,241,0.05)'"
                onmouseout="this.style.background='transparent'"
              >
                <td class="px-5 py-4">
                  <div class="font-semibold" style="color:#E2E8F5;">{{ cfp.conference }}</div>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <span v-for="tag in cfp.tags" :key="tag"
                      class="text-[10px] font-semibold px-1.5 py-[1px] rounded"
                      style="background:rgba(99,102,241,0.12); color:#818CF8;">{{ tag }}</span>
                  </div>
                </td>
                <td class="px-5 py-4 font-mono text-xs" :style="`color:${isUrgent(cfp.cfpDeadline) ? '#F87171' : 'rgba(148,163,184,0.7)'};`">
                  {{ formatDate(cfp.cfpDeadline) }}
                  <span v-if="isUrgent(cfp.cfpDeadline) && cfp.status === 'open'" class="ml-1 text-[10px] font-bold" style="color:#F87171;">Soon!</span>
                </td>
                <td class="px-5 py-4 font-mono text-xs hidden md:table-cell" style="color:rgba(148,163,184,0.7);">{{ formatDate(cfp.eventDates) }}</td>
                <td class="px-5 py-4 text-xs hidden sm:table-cell" style="color:rgba(148,163,184,0.7);">
                  <span v-if="cfp.remote" class="flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" style="background:#34D399;"></span>
                    {{ cfp.location }}
                  </span>
                  <span v-else>{{ cfp.location }}</span>
                </td>
                <td class="px-5 py-4">
                  <span class="text-[11px] font-bold px-2 py-0.5 rounded-full"
                    :style="statusStyle(cfp.status)">{{ cfp.status }}</span>
                </td>
                <td class="px-5 py-4">
                  <a :href="cfp.url" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 text-xs font-semibold transition-colors duration-150"
                    style="color:#818CF8;">
                    Submit
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Speak at CppIndia CTA -->
      <div class="mt-12 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4"
        style="background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(52,211,153,0.06)); border: 1px solid rgba(99,102,241,0.25);">
        <div>
          <p class="font-semibold" style="color:#E2E8F5;">Start with CppIndia</p>
          <p class="text-sm mt-0.5" style="color:rgba(148,163,184,0.65);">First-time speaker? Give your talk at CppIndia before submitting to larger conferences.</p>
        </div>
        <RouterLink to="/call-for-speakers"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white flex-shrink-0"
          style="background: linear-gradient(135deg, #6366F1, #818CF8);">Submit a Talk Proposal</RouterLink>
      </div>

    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHero from '@/components/common/PageHero.vue'
import cfpData from '@/data/cfp.json'

const statuses = [
  { value: 'all',       label: 'All',      bg: 'rgba(99,102,241,0.2)',  color: '#818CF8', border: 'rgba(99,102,241,0.45)' },
  { value: 'open',      label: 'Open',     bg: 'rgba(52,211,153,0.15)', color: '#34D399', border: 'rgba(52,211,153,0.4)'  },
  { value: 'closed',    label: 'Closed',   bg: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: 'rgba(148,163,184,0.3)' },
]

const activeStatus = ref('all')

const filtered = computed(() =>
  activeStatus.value === 'all'
    ? cfpData
    : cfpData.filter(c => c.status === activeStatus.value)
)

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

function isUrgent(deadline) {
  const diff = new Date(deadline) - new Date()
  return diff > 0 && diff < 1000 * 60 * 60 * 24 * 30
}

function statusStyle(status) {
  if (status === 'open')   return 'background:rgba(52,211,153,0.15); color:#34D399; border:1px solid rgba(52,211,153,0.35);'
  if (status === 'closed') return 'background:rgba(148,163,184,0.1); color:#94A3B8; border:1px solid rgba(148,163,184,0.25);'
  return 'background:rgba(251,191,36,0.12); color:#FBBF24; border:1px solid rgba(251,191,36,0.3);'
}
</script>
