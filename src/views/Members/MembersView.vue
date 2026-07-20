<template>
  <div>
  <PageHero
    overline="Hall of Fame"
    title="Hall of Fame"
    subtitle="The founders, moderators, and speakers who make CppIndia what it is."
  />

  <section class="section" style="background: #07091C;">
    <div class="container">

      <!-- Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="member in members"
          :key="member.id"
          class="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200"
          style="background: rgba(15,17,45,0.85); border: 1px solid rgba(99,102,241,0.18);"
          onmouseover="this.style.borderColor='rgba(99,102,241,0.4)'; this.style.boxShadow='0 0 24px rgba(99,102,241,0.15)'; this.style.transform='translateY(-3px)'"
          onmouseout="this.style.borderColor='rgba(99,102,241,0.18)'; this.style.boxShadow='none'; this.style.transform='translateY(0)'"
        >
          <!-- Avatar -->
          <div class="flex items-center gap-4">
            <img v-if="member.avatar" :src="member.avatar" :alt="member.name"
              class="w-14 h-14 rounded-full object-cover flex-shrink-0"
              :style="`border: 2px solid ${badgeMap[member.badge].border};`"
              @error="e => e.target.style.display='none'"
            />
            <div v-else class="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-lg"
              :style="`background: ${badgeMap[member.badge].avatarBg}; color: ${badgeMap[member.badge].color};`">
              {{ member.emoji || member.name.split(' ').map(n => n[0]).join('') }}
            </div>
            <div>
              <h3 class="font-display font-bold text-base" style="color:#E2E8F5;">{{ member.name }}</h3>
              <p class="text-xs" style="color:rgba(148,163,184,0.6);">{{ member.city }}</p>
            </div>
          </div>

          <!-- Badges -->
          <div class="flex items-center gap-2 flex-wrap">
            <span
              v-for="b in getBadges(member)"
              :key="b"
              class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
              :style="`background:${badgeMap[b].bg}; color:${badgeMap[b].color}; border:1px solid ${badgeMap[b].border};`"
            >{{ b }}</span>
          </div>

          <p class="text-sm flex-1" style="color:rgba(148,163,184,0.75);">{{ member.bio }}</p>

          <!-- Stats -->
          <div class="flex items-center gap-4 text-xs" style="color:rgba(148,163,184,0.55);">
            <span v-if="member.talks > 0">{{ member.talks }} talk{{ member.talks !== 1 ? 's' : '' }}</span>
            <span>Since {{ member.joinedYear }}</span>
          </div>

          <!-- Links -->
          <div class="flex items-center gap-3 mt-auto pt-2">
            <a v-if="member.website" :href="member.website" target="_blank" rel="noopener noreferrer"
              class="text-xs font-semibold transition-colors duration-150" style="color:rgba(148,163,184,0.55);"
              onmouseover="this.style.color='#22D3EE'" onmouseout="this.style.color='rgba(148,163,184,0.55)'">Website</a>
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
        <p class="text-sm mb-5" style="color:rgba(148,163,184,0.6);">Give a talk at CppIndia — tech talk or CppIndiaCon — and join the hall of fame.</p>
        <a href="https://discord.gg/Wz42tX5" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
          style="background: linear-gradient(135deg,#6366F1,#818CF8);">Join the Community</a>
      </div>

    </div>
  </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PageHero from '@/components/common/PageHero.vue'
import membersData from '@/data/members.json'

const badgeMap = {
  founder:   { bg: 'rgba(99,102,241,0.15)',  color: '#818CF8', border: 'rgba(99,102,241,0.4)',  avatarBg: 'rgba(99,102,241,0.2)'  },
  speaker:   { bg: 'rgba(34,211,238,0.12)',  color: '#22D3EE', border: 'rgba(34,211,238,0.35)', avatarBg: 'rgba(34,211,238,0.15)' },
  moderator: { bg: 'rgba(167,139,250,0.12)', color: '#A78BFA', border: 'rgba(167,139,250,0.35)',avatarBg: 'rgba(167,139,250,0.15)' },
}

// Show only founders, moderators, and speakers — no contributors
const members = computed(() =>
  membersData.filter(m => m.badge !== 'contributor')
)

// Return all badge labels for a member.
// If a founder/moderator has given talks, they're also a speaker — show both badges.
function getBadges(member) {
  const primary = member.badge
  if (primary !== 'speaker' && member.talks > 0) {
    return [primary, 'speaker']
  }
  return [primary]
}
</script>
