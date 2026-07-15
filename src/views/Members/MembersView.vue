<template>
  <PageHero
    overline="Hall of Fame"
    title="Community Members"
    subtitle="The people who make CppIndia what it is — founders, speakers, contributors, and moderators."
  />

  <section class="section" style="background: #07091C;">
    <div class="container">

      <!-- Badge filter -->
      <div class="flex flex-wrap gap-2 mb-10">
        <button v-for="b in badges" :key="b.value"
          @click="activeBadge = b.value"
          class="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
          :style="activeBadge === b.value
            ? `background:${b.bg}; color:${b.color}; border:1px solid ${b.border};`
            : 'background:transparent; color:rgba(148,163,184,0.6); border:1px solid rgba(99,102,241,0.15);'"
        >{{ b.label }}</button>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="member in filtered"
          :key="member.id"
          class="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200"
          style="background: rgba(15,17,45,0.85); border: 1px solid rgba(99,102,241,0.18);"
          onmouseover="this.style.borderColor='rgba(99,102,241,0.4)'; this.style.boxShadow='0 0 24px rgba(99,102,241,0.15)'; this.style.transform='translateY(-3px)'"
          onmouseout="this.style.borderColor='rgba(99,102,241,0.18)'; this.style.boxShadow='none'; this.style.transform='translateY(0)'"
        >
          <!-- Avatar placeholder -->
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-lg"
              :style="`background: ${badgeMap[member.badge].avatarBg}; color: ${badgeMap[member.badge].color};`">
              {{ member.name.split(' ').map(n => n[0]).join('') }}
            </div>
            <div>
              <h3 class="font-display font-bold text-base" style="color:#E2E8F5;">{{ member.name }}</h3>
              <p class="text-xs" style="color:rgba(148,163,184,0.6);">{{ member.city }}</p>
            </div>
          </div>

          <!-- Badge + role -->
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
              :style="`background:${badgeMap[member.badge].bg}; color:${badgeMap[member.badge].color}; border:1px solid ${badgeMap[member.badge].border};`">
              {{ member.badge }}
            </span>
            <span class="text-xs" style="color:rgba(148,163,184,0.55);">{{ member.role }}</span>
          </div>

          <p class="text-sm flex-1" style="color:rgba(148,163,184,0.75);">{{ member.bio }}</p>

          <!-- Stats -->
          <div class="flex items-center gap-4 text-xs" style="color:rgba(148,163,184,0.55);">
            <span>🎤 {{ member.talks }} talks</span>
            <span>📅 Since {{ member.joinedYear }}</span>
          </div>

          <!-- Links -->
          <div class="flex items-center gap-3 mt-auto pt-2">
            <a v-if="member.github" :href="member.github" target="_blank" rel="noopener noreferrer"
              class="text-xs font-semibold transition-colors duration-150" style="color:rgba(148,163,184,0.55);"
              onmouseover="this.style.color='#E2E8F5'" onmouseout="this.style.color='rgba(148,163,184,0.55)'">GitHub</a>
            <a v-if="member.linkedin" :href="member.linkedin" target="_blank" rel="noopener noreferrer"
              class="text-xs font-semibold transition-colors duration-150" style="color:rgba(148,163,184,0.55);"
              onmouseover="this.style.color='#818CF8'" onmouseout="this.style.color='rgba(148,163,184,0.55)'">LinkedIn</a>
          </div>
        </article>
      </div>

      <!-- Join CTA -->
      <div class="mt-14 text-center rounded-2xl p-8" style="background: rgba(15,17,45,0.6); border: 1px solid rgba(99,102,241,0.2);">
        <p class="font-semibold mb-1" style="color:#E2E8F5;">Want to be featured here?</p>
        <p class="text-sm mb-5" style="color:rgba(148,163,184,0.6);">Contribute to the community — give a talk, help others on Discord, or maintain a project.</p>
        <RouterLink to="/join" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
          style="background: linear-gradient(135deg,#6366F1,#818CF8);">Join the Community</RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHero from '@/components/common/PageHero.vue'
import membersData from '@/data/members.json'

const badgeMap = {
  founder:     { bg: 'rgba(99,102,241,0.15)',  color: '#818CF8', border: 'rgba(99,102,241,0.4)',  avatarBg: 'rgba(99,102,241,0.2)' },
  speaker:     { bg: 'rgba(34,211,238,0.12)',  color: '#22D3EE', border: 'rgba(34,211,238,0.35)', avatarBg: 'rgba(34,211,238,0.15)' },
  contributor: { bg: 'rgba(52,211,153,0.12)',  color: '#34D399', border: 'rgba(52,211,153,0.35)', avatarBg: 'rgba(52,211,153,0.15)' },
  moderator:   { bg: 'rgba(167,139,250,0.12)', color: '#A78BFA', border: 'rgba(167,139,250,0.35)',avatarBg: 'rgba(167,139,250,0.15)' },
}

const badges = [
  { value: 'all',         label: 'All Members',   bg: 'rgba(99,102,241,0.2)',  color: '#818CF8', border: 'rgba(99,102,241,0.45)' },
  { value: 'founder',     label: 'Founders',      bg: 'rgba(99,102,241,0.15)', color: '#818CF8', border: 'rgba(99,102,241,0.4)'  },
  { value: 'speaker',     label: 'Speakers',      bg: 'rgba(34,211,238,0.12)', color: '#22D3EE', border: 'rgba(34,211,238,0.35)' },
  { value: 'contributor', label: 'Contributors',  bg: 'rgba(52,211,153,0.12)', color: '#34D399', border: 'rgba(52,211,153,0.35)' },
  { value: 'moderator',   label: 'Moderators',    bg: 'rgba(167,139,250,0.12)',color: '#A78BFA', border: 'rgba(167,139,250,0.35)'},
]

const activeBadge = ref('all')

const filtered = computed(() =>
  activeBadge.value === 'all'
    ? membersData
    : membersData.filter(m => m.badge === activeBadge.value)
)
</script>
