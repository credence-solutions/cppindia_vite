<template>
  <PageHero
    overline="By the Numbers"
    title="Community Impact"
    subtitle="Five years of building India's C++ community — the milestones that matter."
  />

  <section class="section" style="background: #07091C;">
    <div class="container">

      <!-- Stats grid -->
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-16">
        <div v-for="stat in stats" :key="stat.label"
          class="rounded-2xl p-6 text-center flex flex-col gap-2 transition-all duration-200"
          style="background: rgba(15,17,45,0.85); border: 1px solid rgba(99,102,241,0.18);"
          onmouseover="this.style.borderColor='rgba(99,102,241,0.4)'; this.style.transform='translateY(-3px)'"
          onmouseout="this.style.borderColor='rgba(99,102,241,0.18)'; this.style.transform='translateY(0)'"
        >
          <div class="text-3xl mb-1" style="color:#818CF8;">{{ stat.icon }}</div>
          <div class="font-display font-bold text-3xl" :style="`color:${stat.color};`">
            <span ref="counterEl">{{ counters[stat.label] }}{{ stat.suffix }}</span>
          </div>
          <div class="text-xs font-semibold uppercase tracking-wide" style="color:rgba(148,163,184,0.55);">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="mb-16">
        <div class="text-center mb-8">
          <p class="text-xs font-bold uppercase tracking-[0.14em] mb-1" style="color:#A78BFA;">Our Journey</p>
          <h2 class="font-display font-bold text-xl" style="background:linear-gradient(100deg,#818CF8,#22D3EE); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">Five Years of CppIndia</h2>
        </div>

        <div class="relative">
          <div class="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px hidden md:block" style="background:rgba(99,102,241,0.3);"></div>
          <div class="flex flex-col gap-6">
            <div v-for="(milestone, idx) in milestones" :key="milestone.year + milestone.title"
              class="relative flex gap-4"
              :class="idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
            >
              <!-- Year badge (center) -->
              <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 -translate-y-0 items-center justify-center w-10 h-10 rounded-full font-bold text-xs z-10"
                :style="`background:${milestone.color}22; color:${milestone.color}; border:2px solid ${milestone.color};`">
                {{ milestone.year }}
              </div>
              <!-- Spacer -->
              <div class="hidden md:block flex-1"></div>
              <!-- Card -->
              <div class="flex-1 rounded-2xl p-5 md:max-w-xs"
                style="background:rgba(15,17,45,0.85); border:1px solid rgba(99,102,241,0.18);">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full md:hidden"
                    :style="`background:${milestone.color}22; color:${milestone.color};`">{{ milestone.year }}</span>
                  <span class="text-lg">{{ milestone.icon }}</span>
                </div>
                <h3 class="font-semibold text-sm mb-1" style="color:#E2E8F5;">{{ milestone.title }}</h3>
                <p class="text-xs" style="color:rgba(148,163,184,0.65);">{{ milestone.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cities -->
      <div class="mb-16">
        <div class="text-center mb-8">
          <h2 class="font-display font-bold text-xl" style="color:#E2E8F5;">Members Across India</h2>
          <p class="text-sm mt-1" style="color:rgba(148,163,184,0.6);">Our community spans every major tech hub in the country.</p>
        </div>
        <div class="flex flex-wrap gap-3 justify-center">
          <div v-for="city in cities" :key="city.name"
            class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style="background:rgba(15,17,45,0.8); border:1px solid rgba(99,102,241,0.2);">
            <span class="w-2 h-2 rounded-full flex-shrink-0" style="background:#818CF8;"></span>
            <span style="color:#E2E8F5;">{{ city.name }}</span>
            <span class="text-xs" style="color:rgba(148,163,184,0.5);">{{ city.members }}+</span>
          </div>
        </div>
      </div>

      <!-- YouTube stats -->
      <div class="rounded-2xl p-8 text-center" style="background:linear-gradient(135deg,rgba(255,0,0,0.08),rgba(99,102,241,0.08)); border:1px solid rgba(255,0,0,0.2);">
        <h3 class="font-display font-bold text-lg mb-1" style="color:#E2E8F5;">On YouTube</h3>
        <p class="text-sm mb-6" style="color:rgba(148,163,184,0.6);">All talks recorded and published free forever.</p>
        <div class="flex flex-wrap gap-8 justify-center">
          <div v-for="yt in youtubeStats" :key="yt.label" class="text-center">
            <div class="font-display font-bold text-2xl mb-0.5" style="color:#FF4444;">{{ yt.value }}</div>
            <div class="text-xs" style="color:rgba(148,163,184,0.55);">{{ yt.label }}</div>
          </div>
        </div>
        <a href="https://www.youtube.com/channel/UCwB-WjSJI2D97YZcACFxJDw" target="_blank" rel="noopener noreferrer"
          class="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
          style="background:#FF0000;">Subscribe on YouTube</a>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PageHero from '@/components/common/PageHero.vue'

const stats = [
  { label: 'Community Members', value: 1000, suffix: '+', icon: '👥', color: '#818CF8' },
  { label: 'Tech Talks',        value: 50,   suffix: '+', icon: '🎤', color: '#22D3EE' },
  { label: 'Conferences',       value: 4,    suffix: '',  icon: '🏆', color: '#34D399' },
  { label: 'Years Active',      value: 5,    suffix: '+', icon: '📅', color: '#A78BFA' },
]

const counters = ref(Object.fromEntries(stats.map(s => [s.label, 0])))

onMounted(() => {
  stats.forEach(stat => {
    const duration = 1500
    const steps = 40
    const increment = stat.value / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, stat.value)
      counters.value[stat.label] = Math.floor(current)
      if (current >= stat.value) clearInterval(timer)
    }, duration / steps)
  })
})

const milestones = [
  { year: 2020, icon: '🚀', title: 'CppIndia Founded', description: 'Ankur Satle and Karan Banthia launch CppIndia as India\'s first dedicated C++ user group.', color: '#818CF8' },
  { year: 2021, icon: '🎤', title: 'First CppIndiaCon', description: 'Inaugural online conference with 6 speakers and over 300 live attendees across India.', color: '#22D3EE' },
  { year: 2022, icon: '📺', title: 'YouTube Channel Launch', description: 'All past talks published. Channel hits 500 subscribers in the first month.', color: '#34D399' },
  { year: 2022, icon: '🌍', title: 'International Speakers', description: 'First international speakers at CppIndiaCon 2022 — connecting India to the global C++ community.', color: '#A78BFA' },
  { year: 2023, icon: '💬', title: 'Discord Community', description: 'Discord server launched. 500 members join in the first two months, creating an active daily discussion space.', color: '#818CF8' },
  { year: 2024, icon: '🏆', title: 'CppIndiaCon 2024', description: '8 international speakers, 1,000+ registered attendees, and talks from Sebastian Theophil and other global experts.', color: '#22D3EE' },
  { year: 2025, icon: '📈', title: '1,000+ Members', description: 'Community crosses 1,000 members on Discord. LinkedIn page reaches 4,000+ followers.', color: '#34D399' },
]

const cities = [
  { name: 'Bengaluru', members: 300 },
  { name: 'Pune',      members: 200 },
  { name: 'Mumbai',    members: 150 },
  { name: 'Hyderabad', members: 120 },
  { name: 'Chennai',   members: 100 },
  { name: 'Delhi NCR', members: 80  },
  { name: 'Kolkata',   members: 40  },
  { name: 'Ahmedabad', members: 30  },
]

const youtubeStats = [
  { label: 'Subscribers', value: '1K+' },
  { label: 'Videos',      value: '50+' },
  { label: 'Total Views', value: '25K+' },
]
</script>
