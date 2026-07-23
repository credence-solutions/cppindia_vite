<template>
  <div>
  <PageHero
    overline="Hall of Fame"
    title="Hall of Fame"
    subtitle="The founders, moderators, and speakers who make CppIndia what it is."
  />

  <section class="section--sm" style="background: var(--emphasis-bg);">
    <div class="container">

      <!-- Search -->
      <div class="mb-8">
        <SearchBar v-model="query" placeholder="Search by name, role, city…" />
        <p v-if="query" class="text-xs mt-2" style="color: var(--card-text-muted);">
          <span v-if="displayMembers.length">{{ displayMembers.length }} result{{ displayMembers.length !== 1 ? 's' : '' }}</span>
          <span v-else>No members match "<span style="color: var(--card-text);">{{ query }}</span>"</span>
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <article
          v-for="member in displayMembers"
          :key="member.id"
          class="rounded-xl p-4 flex flex-col gap-3 transition-all duration-200 cursor-pointer"
          style="background: var(--card-bg); border: 1px solid var(--card-border);"
          onmouseover="this.style.borderColor='rgba(8,145,178,0.4)'; this.style.boxShadow='0 0 24px rgba(8,145,178,0.12)'; this.style.transform='translateY(-3px)'"
          onmouseout="this.style.borderColor='var(--card-border)'; this.style.boxShadow='none'; this.style.transform='translateY(0)'"
          @click="openBioPopup(member)"
        >
          <!-- Avatar -->
          <div class="flex items-center gap-3">
            <img v-if="member.avatar" :src="assetPath(member.avatar)" :alt="member.name"
              class="w-11 h-11 rounded-full object-cover flex-shrink-0"
              :style="`border: 2px solid ${badgeMap[member.badge].border};`"
              @error="e => e.target.style.display='none'"
            />
            <div v-else class="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-base"
              :style="`background: ${badgeMap[member.badge].avatarBg}; color: ${badgeMap[member.badge].color};`">
              {{ member.emoji || member.name.split(' ').map(n => n[0]).join('') }}
            </div>
            <div>
              <h3 class="font-display font-bold text-sm" style="color: var(--card-text);">{{ member.name }}</h3>
              <p class="text-xs" style="color: var(--card-text-muted);">{{ member.city }}</p>
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

          <p class="text-xs flex-1" style="color: var(--card-text-muted);">{{ member.bio }}</p>

          <!-- Inline recent talks -->
          <div v-if="member.talks > 0" class="flex flex-col gap-1.5">
            <a
              v-for="talk in recentTalks(member)"
              :key="talk.id"
              :href="talk.video || undefined"
              :target="talk.video ? '_blank' : undefined"
              :rel="talk.video ? 'noopener noreferrer' : undefined"
              class="flex items-center gap-2 text-xs rounded-lg px-2.5 py-1.5 transition-all duration-150"
              :class="talk.video ? 'cursor-pointer' : 'cursor-default'"
              style="background:rgba(255,0,0,0.06); border:1px solid rgba(255,0,0,0.12);"
              :onmouseover="talk.video ? 'this.style.background=\'rgba(255,0,0,0.12)\'; this.style.borderColor=\'rgba(255,0,0,0.3)\'' : ''"
              :onmouseout="talk.video ? 'this.style.background=\'rgba(255,0,0,0.06)\'; this.style.borderColor=\'rgba(255,0,0,0.12)\'' : ''"
              @click.stop
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="#FF0000" class="flex-shrink-0"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span class="truncate" style="color:var(--card-text-muted);">{{ talk.title }}</span>
            </a>
            <button
              v-if="member.talks > 2"
              class="text-left text-[10px] font-semibold px-2.5 transition-colors duration-150"
              style="color:var(--color-primary-soft);"
              @click.stop="openPopup(member)"
            >View all {{ member.talks }} talks →</button>
          </div>

          <!-- Stats -->
          <div class="flex items-center gap-4 text-xs" style="color: var(--card-text-muted);">
            <span>Since {{ member.joinedYear }}</span>
          </div>

          <!-- Social links — icon buttons (same style as Team page) -->
          <div class="flex items-center gap-2 mt-auto pt-2">
            <a
              v-if="member.website"
              :href="member.website"
              target="_blank" rel="noopener noreferrer"
              aria-label="Website"
              class="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
              style="background: rgba(8,145,178,0.08); color: var(--color-text-muted);"
              onmouseover="this.style.background='linear-gradient(135deg,#2563EB,#0891B2)'; this.style.color='white'"
              onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'"
              @click.stop
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
            </a>
            <a
              v-if="member.github"
              :href="member.github"
              target="_blank" rel="noopener noreferrer"
              aria-label="GitHub"
              class="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
              style="background: rgba(8,145,178,0.08); color: var(--color-text-muted);"
              onmouseover="this.style.background='linear-gradient(135deg,#2563EB,#0891B2)'; this.style.color='white'"
              onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'"
              @click.stop
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
            <a
              v-if="member.linkedin"
              :href="member.linkedin"
              target="_blank" rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
              style="background: rgba(8,145,178,0.08); color: var(--color-text-muted);"
              onmouseover="this.style.background='linear-gradient(135deg,#2563EB,#0891B2)'; this.style.color='white'"
              onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'"
              @click.stop
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </article>
      </div>

      <!-- Join CTA -->
      <div class="mt-10 sm:mt-14 text-center rounded-2xl p-5 sm:p-8" style="background: var(--card-bg); border: 1px solid var(--card-border);">
        <p class="font-semibold mb-1" style="color: var(--card-text);">Want to be featured here?</p>
        <p class="text-sm mb-5" style="color: var(--card-text-muted);">Give a talk at CppIndia — tech talk or CppIndiaCon — and join the hall of fame.</p>
        <a :href="SITE.discordInvite" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
          style="background: var(--gradient-btn);">Join the Community</a>
      </div>

    </div>
  </section>

  <!-- Talks popup -->
  <Teleport to="body">
    <Transition name="popup">
      <div
        v-if="popup.member"
        class="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style="background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);"
        @click.self="closePopup"
      >
        <div
          class="w-full max-w-lg rounded-2xl overflow-hidden flex flex-col"
          style="background: var(--color-surface); border: 1px solid var(--card-border); box-shadow: 0 24px 80px rgba(0,0,0,0.3); max-height: 80vh;"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b" style="border-color: var(--color-border);">
            <div>
              <p class="text-xs font-semibold uppercase tracking-widest mb-0.5" style="color: var(--color-secondary);">Talks</p>
              <h3 class="font-display font-bold text-lg" style="color: var(--color-text);">{{ popup.member.name }}</h3>
            </div>
            <button
              class="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-150 cursor-pointer"
              style="color: var(--color-text-muted);"
              onmouseover="this.style.background='rgba(8,145,178,0.10)'; this.style.color='var(--color-text)'"
              onmouseout="this.style.background='transparent'; this.style.color='var(--color-text-muted)'"
              @click="closePopup"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <!-- Talk list -->
          <div class="overflow-y-auto p-4 flex flex-col gap-2">
            <template v-if="popup.talks.length">
              <a
                v-for="talk in popup.talks"
                :key="talk.id"
                :href="talk.video || undefined"
                :target="talk.video ? '_blank' : undefined"
                :rel="talk.video ? 'noopener noreferrer' : undefined"
                class="flex items-start gap-3 p-3 rounded-xl transition-all duration-150 group"
                :class="talk.video ? 'cursor-pointer' : 'cursor-default opacity-50'"
                :style="talk.video
                  ? 'background:rgba(8,145,178,0.06); border:1px solid rgba(8,145,178,0.12);'
                  : 'background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05);'"
                @mouseover="talk.video && ($event.currentTarget.style.background='rgba(8,145,178,0.14)', $event.currentTarget.style.borderColor='rgba(8,145,178,0.3)')"
                @mouseout="talk.video && ($event.currentTarget.style.background='rgba(8,145,178,0.06)', $event.currentTarget.style.borderColor='rgba(8,145,178,0.12)')"
              >
                <!-- Play / no-video icon -->
                <div
                  class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  :style="talk.video ? 'background:#FF0000;' : 'background:rgba(148,163,184,0.1);'"
                >
                  <svg v-if="talk.video" width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  <svg v-else width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(148,163,184,0.4)" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium leading-snug" style="color: var(--color-text);">{{ talk.title }}</p>
                  <p class="text-[11px] mt-1" style="color: var(--color-text-muted);">
                    {{ talk.source }} · {{ talk.year }}
                    <span v-if="!talk.video" class="ml-2 italic">No recording available</span>
                  </p>
                </div>
                <svg v-if="talk.video" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  class="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style="color:var(--color-primary-soft);"
                ><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </template>
            <p v-else class="text-sm text-center py-6" style="color: var(--color-text-muted);">No talks found.</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- Bio popup -->
  <Teleport to="body">
    <Transition name="bio-popup">
      <div
        v-if="selectedMember"
        class="fixed inset-0 z-[300] flex items-center justify-center p-4"
        style="background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);"
        @click.self="closeBioPopup"
      >
        <div
          class="relative w-full max-w-lg rounded-2xl overflow-hidden flex flex-col"
          style="background: var(--color-surface); border: 1px solid rgba(8,145,178,0.25); box-shadow: 0 24px 80px rgba(0,0,0,0.3); max-height: 85vh;"
        >
          <!-- Close button -->
          <button
            class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors z-10"
            style="color: var(--card-text-muted);"
            onmouseover="this.style.background='rgba(8,145,178,0.10)'; this.style.color='var(--color-text)'"
            onmouseout="this.style.background='transparent'; this.style.color='var(--card-text-muted)'"
            @click="closeBioPopup"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          <!-- Header: avatar + name + badges -->
          <div class="flex items-center gap-5 p-6 pb-4 border-b" style="border-color: var(--color-border);">
            <img v-if="selectedMember.avatar" :src="assetPath(selectedMember.avatar)" :alt="selectedMember.name"
              class="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              :style="`border: 2px solid ${badgeMap[selectedMember.badge].border};`"
              @error="e => e.target.style.display='none'"
            />
            <div v-else class="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-2xl"
              :style="`background: ${badgeMap[selectedMember.badge].avatarBg}; color: ${badgeMap[selectedMember.badge].color};`">
              {{ selectedMember.emoji || selectedMember.name.split(' ').map(n => n[0]).join('') }}
            </div>
            <div class="min-w-0">
              <h2 class="font-display font-bold text-xl mb-1" style="color: var(--card-text);">{{ selectedMember.name }}</h2>
              <p class="text-sm mb-2" style="color: var(--card-text-muted);">{{ selectedMember.role }} · {{ selectedMember.city }}</p>
              <div class="flex items-center gap-2 flex-wrap">
                <span
                  v-for="b in getBadges(selectedMember)"
                  :key="b"
                  class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                  :style="`background:${badgeMap[b].bg}; color:${badgeMap[b].color}; border:1px solid ${badgeMap[b].border};`"
                >{{ b }}</span>
                <span class="text-xs" style="color: var(--card-text-muted);">Since {{ selectedMember.joinedYear }}</span>
              </div>
            </div>
          </div>

          <!-- Body: scrollable -->
          <div class="overflow-y-auto p-6 space-y-5">
            <!-- Speaker intro from website (if available) -->
            <p v-if="speakerIntro(selectedMember)" class="text-sm leading-relaxed" style="color: var(--card-text);">{{ speakerIntro(selectedMember) }}</p>
            <!-- Fallback to member bio -->
            <p v-else class="text-sm leading-relaxed" style="color: var(--card-text-muted);">{{ selectedMember.bio }}</p>

            <!-- Social links -->
            <div class="flex items-center gap-2 flex-wrap pt-1">
              <a v-if="selectedMember.website" :href="selectedMember.website" target="_blank" rel="noopener noreferrer"
                aria-label="Website"
                class="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
                style="background: rgba(8,145,178,0.08); color: var(--color-text-muted);"
                onmouseover="this.style.background='linear-gradient(135deg,#2563EB,#0891B2)'; this.style.color='white'"
                onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
              </a>
              <a v-if="selectedMember.linkedin" :href="selectedMember.linkedin" target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn"
                class="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
                style="background: rgba(8,145,178,0.08); color: var(--color-text-muted);"
                onmouseover="this.style.background='linear-gradient(135deg,#2563EB,#0891B2)'; this.style.color='white'"
                onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a v-if="selectedMember.github" :href="selectedMember.github" target="_blank" rel="noopener noreferrer"
                aria-label="GitHub"
                class="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
                style="background: rgba(8,145,178,0.08); color: var(--color-text-muted);"
                onmouseover="this.style.background='linear-gradient(135deg,#2563EB,#0891B2)'; this.style.color='white'"
                onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useHead } from '@/composables/useHead'
import { useAssetPath } from '@/composables/useAssetPath'
import PageHero from '@/components/common/PageHero.vue'
import SearchBar from '@/components/common/SearchBar.vue'

useHead({
  title: 'Hall of Fame | CppIndia',
  description: 'Meet the founders, moderators, and speakers who make CppIndia what it is — India\'s C++ community.',
})
import membersData from '@/data/members.json'
import talksData from '@/data/talks.json'
import conferencesData from '@/data/conferences.json'
import speakersData from '@/data/speakers.json'
import { SITE } from '@/constants'

const { assetPath } = useAssetPath()

const badgeMap = {
  founder:   { bg: 'rgba(8,145,178,0.15)',  color: 'var(--color-primary-soft)', border: 'rgba(8,145,178,0.4)',  avatarBg: 'rgba(8,145,178,0.2)'  },
  speaker:   { bg: 'rgba(34,211,238,0.12)',  color: '#22D3EE', border: 'rgba(34,211,238,0.35)', avatarBg: 'rgba(34,211,238,0.15)' },
  moderator: { bg: 'rgba(8,145,178,0.12)', color: 'var(--color-secondary-mid)', border: 'rgba(8,145,178,0.35)',avatarBg: 'rgba(8,145,178,0.15)' },
}

const query = ref('')

// Show only founders, moderators, and speakers — no contributors
const members = computed(() =>
  membersData.filter(m => m.badge !== 'contributor')
)

const displayMembers = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return members.value
  return members.value.filter(m =>
    m.name?.toLowerCase().includes(q) ||
    m.role?.toLowerCase().includes(q) ||
    m.city?.toLowerCase().includes(q) ||
    m.bio?.toLowerCase().includes(q) ||
    m.badge?.toLowerCase().includes(q)
  )
})

// If a founder/moderator has given talks, they're also a speaker — show both badges.
function getBadges(member) {
  const primary = member.badge
  if (primary !== 'speaker' && member.talks > 0) {
    return [primary, 'speaker']
  }
  return [primary]
}

// ─── Speaker → Talks lookup ───────────────────────────────────────────────────

function namesMatch(memberName, talkSpeaker) {
  const norm = s => s.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ').trim()
  const a = norm(memberName)
  const b = norm(talkSpeaker)
  if (a === b) return true
  // Match if all words of the shorter name appear in the longer (handles "Ankur Satle" vs "Ankur M Satle")
  const wordsA = a.split(' ').filter(w => w.length > 1)
  const wordsB = b.split(' ').filter(w => w.length > 1)
  const [shorter, longer] = wordsA.length <= wordsB.length ? [wordsA, wordsB] : [wordsB, wordsA]
  return shorter.every(w => longer.includes(w))
}

// Build all talks from tech talks + conference sessions
const allTalks = computed(() => {
  const list = []

  // Tech talks
  for (const [year, yearTalks] of Object.entries(talksData)) {
    for (const t of yearTalks) {
      list.push({ id: t.id, title: t.title, video: t.video || null, speaker: t.speaker, year, source: 'Tech Talk' })
    }
  }

  // CppIndiaCon sessions
  for (const conf of conferencesData) {
    for (const day of (conf.schedule || [])) {
      for (const session of day.sessions) {
        if (['talk', 'keynote', 'special'].includes(session.type) && session.speaker) {
          list.push({
            id: `${conf.year}-${session.time}`,
            title: session.title,
            video: session.videoUrl || null,
            speaker: session.speaker,
            year: String(conf.year),
            source: `CppIndiaCon ${conf.year}`,
          })
        }
      }
    }
  }

  return list
})

function getTalksForMember(member) {
  return allTalks.value.filter(t => namesMatch(member.name, t.speaker))
}

function recentTalks(member) {
  return getTalksForMember(member).slice(0, 2)
}

// ─── Popup state ──────────────────────────────────────────────────────────────

const popup = ref({ member: null, talks: [] })

function openPopup(member) {
  popup.value = { member, talks: getTalksForMember(member) }
}

function closePopup() {
  popup.value = { member: null, talks: [] }
}

// ─── Bio popup state ──────────────────────────────────────────────────────────

const selectedMember = ref(null)

function openBioPopup(member) {
  selectedMember.value = member
  document.body.style.overflow = 'hidden'
}

function closeBioPopup() {
  selectedMember.value = null
  document.body.style.overflow = ''
}

function speakerIntro(member) {
  const normName = s => s.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, ' ').trim()
  const memberName = normName(member.name)

  // Try to match by name and prefer entries with an intro field
  const matches = speakersData.filter(s => {
    const speakerName = normName(s.name)
    if (speakerName === memberName) return true
    const wordsA = memberName.split(' ').filter(w => w.length > 1)
    const wordsB = speakerName.split(' ').filter(w => w.length > 1)
    const [shorter, longer] = wordsA.length <= wordsB.length ? [wordsA, wordsB] : [wordsB, wordsA]
    return shorter.every(w => longer.includes(w))
  })

  if (!matches.length) return null

  // Prefer entries with intro; among those prefer matching conference year
  const withIntro = matches.filter(s => s.intro)
  if (!withIntro.length) return null

  // Try to match by conference year first
  if (member.joinedYear) {
    const yearMatch = withIntro.find(s => String(s.conference) === String(member.joinedYear))
    if (yearMatch) return yearMatch.intro
  }

  return withIntro[0].intro
}

function onEsc(e) {
  if (e.key === 'Escape') closeBioPopup()
}

onMounted(() => window.addEventListener('keydown', onEsc))
onUnmounted(() => {
  window.removeEventListener('keydown', onEsc)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.popup-enter-active, .popup-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.popup-enter-from, .popup-leave-to { opacity: 0; transform: scale(0.96); }
.bio-popup-enter-active, .bio-popup-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.bio-popup-enter-from, .bio-popup-leave-to { opacity: 0; transform: scale(0.96); }
</style>
