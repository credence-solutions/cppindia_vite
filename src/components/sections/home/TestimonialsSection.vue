<template>
  <section class="section" style="background: var(--emphasis-bg);">
    <div class="container">
      <div class="text-center mb-10">
        <p class="text-xs font-bold uppercase tracking-[0.14em] mb-2" style="color: var(--color-secondary-mid);">Community Voices</p>
        <h2 class="font-display font-bold text-gradient-heading" style="font-size: clamp(1.5rem, 3vw, 2.25rem);">
          What Members Say
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <blockquote
          v-for="t in testimonials"
          :key="t.id"
          class="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200"
          style="background: var(--card-bg); border: 1px solid var(--card-border);"
          onmouseover="this.style.borderColor='rgba(8,145,178,0.4)'; this.style.transform='translateY(-3px)'"
          onmouseout="this.style.borderColor='var(--card-border)'; this.style.transform='translateY(0)'"
        >
          <!-- Quote mark -->
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color:rgba(8,145,178,0.35);">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor"/>
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor"/>
          </svg>

          <p class="text-sm leading-relaxed flex-1 italic" style="color: var(--color-text-secondary);">{{ t.quote }}</p>

          <div class="flex items-center gap-3 mt-auto pt-2" style="border-top: 1px solid var(--color-border);">
            <!-- Avatar initials -->
            <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs"
              style="background:rgba(8,145,178,0.15); color:#2563EB;">
              {{ t.name.split(' ').map(n => n[0]).join('') }}
            </div>
            <div>
              <p class="text-sm font-semibold" style="color: var(--color-text);">{{ t.name }}</p>
              <p class="text-xs" style="color:var(--color-text-muted);">{{ t.role }}</p>
            </div>
            <!-- Source badge -->
            <span class="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full" :style="sourceStyle(t.source)">
              {{ t.source }}
            </span>
          </div>
        </blockquote>
      </div>

      <div class="text-center mt-10">
        <RouterLink to="/join"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
          style="border: 1px solid rgba(8,145,178,0.3); color: var(--color-primary-soft);"
          onmouseover="this.style.background='rgba(8,145,178,0.08)'; this.style.borderColor='rgba(8,145,178,0.55)'"
          onmouseout="this.style.background='transparent'; this.style.borderColor='rgba(8,145,178,0.3)'"
        >Join the Community</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import testimonialsData from '@/data/testimonials.json'

const testimonials = testimonialsData.slice(0, 6)

function sourceStyle(source) {
  const map = {
    discord:  'background:rgba(88,101,242,0.15); color:var(--color-primary-soft); border:1px solid rgba(88,101,242,0.3);',
    linkedin: 'background:rgba(10,102,194,0.12); color:#60A5FA; border:1px solid rgba(10,102,194,0.3);',
    twitter:  'background:rgba(29,161,242,0.1);  color:#38BDF8; border:1px solid rgba(29,161,242,0.25);',
    youtube:  'background:rgba(255,0,0,0.1);      color:#F87171; border:1px solid rgba(255,0,0,0.25);',
  }
  return map[source] || 'background:rgba(8,145,178,0.12); color:var(--color-primary-soft);'
}
</script>
