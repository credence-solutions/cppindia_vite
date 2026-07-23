<template>
  <div>
    <PageHero
      overline="Annual C++ Conference"
      title="CppIndiaCon"
      subtitle="India's premier C++ conference — bringing together global experts for talks, workshops, and community networking."
      :breadcrumb="[{ label: 'CppIndiaCon', path: '/conference' }]"
    />

    <section class="section--sm">
      <div class="container">

        <!-- Year tabs -->
        <div class="flex items-center gap-2 mb-10 pb-4 border-b border-wire-light overflow-x-auto" role="tablist" style="scrollbar-width:none;-ms-overflow-style:none;flex-shrink:0;">
          <button
            v-for="yr in years"
            :key="yr"
            role="tab"
            class="flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-150"
            :class="activeYear === yr
              ? 'bg-secondary text-white border border-secondary'
              : 'text-ink-2 border border-[rgba(8,145,178,0.22)] hover:border-[rgba(8,145,178,0.55)] hover:text-secondary hover:bg-secondary/[0.06]'"
            :aria-selected="activeYear === yr"
            @click="setYear(yr)"
          >
            {{ yr }}
            <span
              v-if="yr === latestYear"
              class="px-1.5 py-px bg-white/20 rounded-full text-[10px] font-bold"
            >Latest</span>
          </button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="skeleton h-[500px] rounded-xl" />

        <!-- Conference content -->
        <template v-else-if="conf">

          <!-- Header -->
          <div class="flex items-start justify-between gap-4 sm:gap-8 flex-wrap mb-5">
            <div>
              <h2 class="font-display text-3xl lg:text-5xl font-extrabold text-ink mb-2">{{ conf.name }}</h2>
              <p class="font-mono text-sm text-ink-3 mb-3">
                <span>{{ conf.dates }}</span>
                <span class="mx-2 opacity-40">·</span>
                <span>{{ conf.format }}</span>
                <span class="mx-2 opacity-40">·</span>
                <span>Edition {{ conf.edition }}</span>
              </p>
              <p class="font-display text-lg font-semibold text-secondary">{{ conf.tagline }}</p>
            </div>
            <div class="flex items-center flex-wrap gap-3 flex-shrink-0">
              <a
                v-if="conf.registrationUrl"
                :href="conf.registrationUrl"
                class="btn btn--primary flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >Register Now</a>
              <a
                :href="conf.videosUrl"
                class="btn btn--outline flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
                Watch Talks
              </a>
            </div>
          </div>

          <!-- Conference banner -->
          <div v-if="conf.banner" class="conf-banner-wrap">
            <img :src="conf.banner" :alt="conf.name + ' banner'" class="conf-banner-img" />
          </div>

          <p class="text-base text-ink-2 leading-relaxed mb-10">{{ conf.description }}</p>

          <!-- Search -->
          <div class="mb-8 p-4 rounded-xl" style="background: var(--card-bg); border: 1px solid var(--card-border);">
            <p class="text-xs font-semibold uppercase tracking-widest mb-3" style="color: var(--color-text-muted);">Search Speakers & Sessions</p>
            <SearchBar v-model="scheduleQuery" placeholder="Search sessions, speakers…" />
            <p v-if="scheduleQuery" class="text-xs mt-2" style="color: var(--color-text-muted);">
              <span v-if="filteredSpeakers.length || filteredSessionCount">
                {{ filteredSpeakers.length }} speaker{{ filteredSpeakers.length !== 1 ? 's' : '' }},
                {{ filteredSessionCount }} session{{ filteredSessionCount !== 1 ? 's' : '' }}
              </span>
              <span v-else>No results for "<span style="color: var(--color-text);">{{ scheduleQuery }}</span>"</span>
            </p>
          </div>

          <!-- Speakers -->
          <div v-if="filteredSpeakers.length" class="mb-12">
            <h3 class="font-display text-xl font-bold text-ink mb-6 pb-3 border-b-2 border-wire-light">Speakers</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              <div
                v-for="s in filteredSpeakers"
                :key="s.name"
                class="flex flex-col bg-surface border border-wire-light rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md cursor-pointer"
                :class="{ 'border-secondary/35': s.role === 'Keynote' }"
                @click="openSpeaker(s)"
              >
                <div class="speaker-photo-wrap">
                  <span class="speaker-photo-wrap__initial">{{ s.name.charAt(0) }}</span>
                  <img v-if="s.image || fullSpeaker(s)?.image" :src="assetPath(s.image || fullSpeaker(s)?.image)" :alt="s.name" class="speaker-photo" />
                </div>
                <div class="p-4 flex-1">
                  <div class="flex items-start justify-between gap-2 flex-wrap mb-1">
                    <p class="font-bold text-sm text-ink leading-snug">{{ s.name }}</p>
                    <span
                      v-if="s.role === 'Keynote'"
                      class="px-[7px] py-px bg-secondary text-white rounded-full text-[9px] font-bold uppercase tracking-[0.04em] flex-shrink-0 mt-0.5 self-start"
                    >Keynote</span>
                  </div>
                  <p v-if="s.topic" class="text-xs text-ink-2 leading-[1.5] italic">"{{ s.topic }}"</p>
                  <div v-if="s.rating" class="flex items-center gap-[3px] mt-2 text-xs text-yellow-400 font-semibold">
                    <span class="text-[12px]">★</span>
                    <span>{{ s.rating.toFixed(2) }} / 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Schedule -->
          <div v-if="conf.schedule?.length" class="mb-12">
            <div class="mb-6 pb-3 border-b-2 border-wire-light">
              <h3 class="font-display text-xl font-bold text-ink">Conference Schedule</h3>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                v-for="day in filteredSchedule"
                :key="day.day"
                class="bg-surface border border-wire-light rounded-2xl overflow-hidden"
              >
                <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[rgba(79,142,247,0.12)] to-[rgba(8,145,178,0.12)] border-b border-wire-light">
                  <span class="font-display font-bold text-base text-ink">Day {{ day.day }}</span>
                  <span class="font-mono text-xs text-ink-3">{{ day.date }}</span>
                </div>

                <div class="p-3">
                  <div
                    v-for="session in day.sessions"
                    :key="session.time + session.title"
                    v-show="!scheduleQuery || sessionMatchesQuery(session)"
                    class="flex items-start gap-4 px-3 py-3 rounded-lg mb-1 transition-colors"
                    :class="{
                      'opacity-55': ['break','intro','outro','activity'].includes(session.type),
                      'bg-surface-alt hover:bg-surface-raised': ['talk','keynote','lightning'].includes(session.type),
                      'border-l-[3px] border-secondary bg-secondary/[0.06]': session.type === 'keynote',
                    }"
                  >
                    <div class="font-mono text-[10px] text-ink-3 whitespace-nowrap min-w-[92px] pt-0.5 flex-shrink-0">
                      {{ session.time }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex flex-wrap items-start gap-x-2 gap-y-1">
                        <p class="text-sm font-semibold text-ink leading-snug flex-1 min-w-0">{{ session.title }}</p>
                        <div class="flex items-center gap-1">
                          <a
                            v-if="session.videoUrl"
                            :href="session.videoUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center gap-1 px-2 py-px rounded text-[10px] font-bold bg-[var(--color-youtube)] text-white hover:bg-[var(--color-youtube-hover)] transition-colors"
                            :aria-label="`Watch: ${session.title}`"
                          >
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            Video
                          </a>
                          <span
                            v-if="session.type === 'keynote'"
                            class="px-[7px] py-px rounded-full text-[9px] font-bold uppercase tracking-[0.05em] bg-secondary text-white"
                          >Keynote</span>
                          <span
                            v-else-if="session.type === 'lightning'"
                            class="px-[7px] py-px rounded-full text-[9px] font-bold uppercase tracking-[0.05em] bg-accent text-black"
                          >Lightning</span>
                        </div>
                      </div>
                      <p v-if="session.speaker" class="text-xs text-primary font-medium mt-1">{{ session.speaker }}</p>
                      <p v-if="session.abstract" class="text-xs text-ink-3 leading-relaxed mt-2">{{ session.abstract }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Session Videos -->
          <div v-if="filteredVideos.length" class="mb-12">
            <h3 class="font-display text-xl font-bold text-ink mb-6 pb-3 border-b-2 border-wire-light">Session Videos</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <a
                v-for="sv in filteredVideos"
                :key="sv.videoUrl"
                :href="sv.videoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex flex-col bg-surface border border-wire-light rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div class="relative aspect-video overflow-hidden bg-black">
                  <img
                    :src="`https://img.youtube.com/vi/${ytId(sv.videoUrl)}/mqdefault.jpg`"
                    :alt="sv.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <div class="w-11 h-11 rounded-full bg-[var(--color-youtube)] flex items-center justify-center shadow-lg">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  </div>
                  <span v-if="sv.type === 'keynote'" class="absolute top-2 left-2 px-2 py-0.5 bg-secondary text-white text-[10px] font-bold rounded uppercase">Keynote</span>
                </div>
                <div class="p-4">
                  <p class="text-sm font-semibold text-ink leading-snug mb-1">{{ sv.title }}</p>
                  <p class="text-xs text-ink-3">{{ sv.speaker }}</p>
                </div>
              </a>
            </div>
          </div>

          <!-- Speaker Modal -->
          <Teleport to="body">
            <Transition name="modal">
              <div
                v-if="selectedSpeaker"
                class="fixed inset-0 z-50 flex items-center justify-center p-4"
                @click.self="closeSpeaker"
              >
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeSpeaker" />

                <!-- Panel -->
                <div class="relative bg-surface rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto z-10"
                  style="border: 1px solid rgba(8,145,178,0.25);">

                  <!-- Close -->
                  <button
                    class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-ink-3 hover:text-ink hover:bg-surface-alt transition-colors z-10"
                    @click="closeSpeaker"
                    aria-label="Close"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>

                  <!-- Header -->
                  <div class="flex items-center gap-5 p-6 pb-4 border-b border-wire-light">
                    <div class="speaker-photo-wrap flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden" style="width:80px;height:80px;">
                      <span class="speaker-photo-wrap__initial text-2xl">{{ selectedSpeaker.name.charAt(0) }}</span>
                      <img
                        v-if="selectedSpeaker.image || fullSpeaker(selectedSpeaker)?.image"
                        :src="assetPath(selectedSpeaker.image || fullSpeaker(selectedSpeaker)?.image)"
                        :alt="selectedSpeaker.name"
                        class="speaker-photo"
                      />
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-2 flex-wrap mb-1">
                        <h2 class="font-display text-xl font-bold text-ink leading-tight">{{ selectedSpeaker.name }}</h2>
                        <span
                          v-if="selectedSpeaker.role === 'Keynote'"
                          class="px-2 py-0.5 bg-secondary text-white rounded-full text-[10px] font-bold uppercase tracking-wide flex-shrink-0"
                        >Keynote</span>
                      </div>
                      <p v-if="selectedSpeaker.topic" class="text-sm text-secondary font-medium italic">"{{ selectedSpeaker.topic }}"</p>
                      <div v-if="selectedSpeaker.rating" class="flex items-center gap-1 mt-1 text-xs text-yellow-400 font-semibold">
                        <span>★</span>
                        <span>{{ selectedSpeaker.rating.toFixed(2) }} / 5</span>
                      </div>
                    </div>
                  </div>

                  <!-- Body -->
                  <div class="p-6 space-y-5">
                    <!-- Intro from website -->
                    <div v-if="fullSpeaker(selectedSpeaker)?.intro">
                      <p class="text-sm text-ink leading-relaxed">{{ fullSpeaker(selectedSpeaker).intro }}</p>
                    </div>
                    <!-- Fallback to bio -->
                    <div v-else-if="fullSpeaker(selectedSpeaker)?.bio">
                      <p class="text-sm text-ink-2 leading-relaxed">{{ fullSpeaker(selectedSpeaker).bio }}</p>
                    </div>

                    <!-- Expertise tags -->
                    <div v-if="fullSpeaker(selectedSpeaker)?.expertise?.length" class="flex flex-wrap gap-2">
                      <span
                        v-for="tag in fullSpeaker(selectedSpeaker).expertise"
                        :key="tag"
                        class="px-2.5 py-1 bg-[rgba(79,142,247,0.10)] text-secondary rounded-full text-xs font-semibold"
                      >{{ tag }}</span>
                    </div>


                    <!-- Social links -->
                    <div v-if="fullSpeaker(selectedSpeaker)" class="flex items-center gap-2 flex-wrap pt-1">
                      <a
                        v-if="fullSpeaker(selectedSpeaker).website"
                        :href="fullSpeaker(selectedSpeaker).website"
                        target="_blank" rel="noopener noreferrer"
                        aria-label="Website"
                        class="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
                        style="background: rgba(8,145,178,0.08); color: var(--color-text-muted);"
                        onmouseover="this.style.background='var(--gradient-btn)'; this.style.color='white'"
                        onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                      </a>
                      <a
                        v-if="fullSpeaker(selectedSpeaker).linkedin"
                        :href="fullSpeaker(selectedSpeaker).linkedin"
                        target="_blank" rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        class="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
                        style="background: rgba(8,145,178,0.08); color: var(--color-text-muted);"
                        onmouseover="this.style.background='var(--gradient-btn)'; this.style.color='white'"
                        onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                      </a>
                      <a
                        v-if="fullSpeaker(selectedSpeaker).twitter"
                        :href="fullSpeaker(selectedSpeaker).twitter"
                        target="_blank" rel="noopener noreferrer"
                        aria-label="Twitter"
                        class="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
                        style="background: rgba(8,145,178,0.08); color: var(--color-text-muted);"
                        onmouseover="this.style.background='var(--gradient-btn)'; this.style.color='white'"
                        onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.5 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                      </a>
                      <a
                        v-if="fullSpeaker(selectedSpeaker).github"
                        :href="fullSpeaker(selectedSpeaker).github"
                        target="_blank" rel="noopener noreferrer"
                        aria-label="GitHub"
                        class="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
                        style="background: rgba(8,145,178,0.08); color: var(--color-text-muted);"
                        onmouseover="this.style.background='var(--gradient-btn)'; this.style.color='white'"
                        onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      </a>
                      <a
                        v-if="fullSpeaker(selectedSpeaker).youtube"
                        :href="fullSpeaker(selectedSpeaker).youtube"
                        target="_blank" rel="noopener noreferrer"
                        aria-label="YouTube"
                        class="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150"
                        style="background: rgba(8,145,178,0.08); color: var(--color-text-muted);"
                        onmouseover="this.style.background='var(--gradient-btn)'; this.style.color='white'"
                        onmouseout="this.style.background='rgba(8,145,178,0.08)'; this.style.color='var(--color-text-muted)'"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </Teleport>

          <!-- Lightning Talks -->
          <div v-if="conf.lightningTalks?.length" class="mb-12">
            <h3 class="font-display text-xl font-bold text-ink mb-6 pb-3 border-b-2 border-wire-light">Lightning Talks</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="lt in conf.lightningTalks"
                :key="lt.speaker"
                class="px-5 py-4 bg-surface border border-wire-light border-l-[3px] border-l-accent rounded-lg"
              >
                <p class="text-sm font-bold text-ink mb-1">{{ lt.speaker }}</p>
                <p class="text-xs text-ink-2 leading-[1.4]">{{ lt.topic }}</p>
              </div>
            </div>
          </div>

          <!-- Sponsors -->
          <div
            v-if="conf.sponsors.gold.length || conf.sponsors.community.length"
            class="mb-12 rounded-2xl py-8 px-4 sm:py-10 sm:px-6"
            style="background: var(--card-bg); border: 1px solid var(--card-border);"
          >
            <!-- Label -->
            <p class="text-center text-xs font-semibold uppercase tracking-[0.12em] mb-8" style="color: var(--card-text-muted);">
              Supported by leading companies &amp; communities
            </p>

            <!-- Gold Sponsors -->
            <template v-if="conf.sponsors.gold.length">
              <div class="mb-6">
                <div class="flex items-center justify-center gap-2 mb-6">
                  <span class="h-px flex-1 max-w-[60px]" style="background: rgba(180,135,0,0.4);" />
                  <span class="text-[10px] font-bold uppercase tracking-[0.15em]" style="color: rgba(140,100,0,0.85);">Gold Sponsors {{ activeYear }}</span>
                  <span class="h-px flex-1 max-w-[60px]" style="background: rgba(180,135,0,0.4);" />
                </div>
                <div class="flex flex-wrap justify-center items-stretch gap-4">
                  <a
                    v-for="s in conf.sponsors.gold"
                    :key="s.name"
                    :href="s.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex flex-col items-center justify-center gap-1 px-6 py-4 rounded-xl transition-all duration-200 min-w-[160px]"
                    style="border: 1px solid rgba(180,135,0,0.45); background: rgba(234,179,8,0.07);"
                    onmouseover="this.style.borderColor='rgba(180,135,0,0.75)'; this.style.background='rgba(234,179,8,0.13)'"
                    onmouseout="this.style.borderColor='rgba(180,135,0,0.45)'; this.style.background='rgba(234,179,8,0.07)'"
                  >
                    <span class="font-display font-bold text-base" style="color: var(--card-text);">{{ s.name }}</span>
                    <span v-if="s.description" class="text-[10px] text-center leading-snug" style="color: var(--card-text-muted);">{{ s.description }}</span>
                  </a>
                </div>
              </div>
            </template>

            <!-- Community Sponsors -->
            <template v-if="conf.sponsors.community.length">
              <div class="mt-7">
                <div class="flex items-center justify-center gap-2 mb-5">
                  <span class="h-px flex-1 max-w-[60px]" style="background: rgba(8,145,178,0.2);" />
                  <span class="text-[10px] font-bold uppercase tracking-[0.15em]" style="color: var(--card-text-muted);">Community Sponsors</span>
                  <span class="h-px flex-1 max-w-[60px]" style="background: rgba(8,145,178,0.2);" />
                </div>
                <div class="flex flex-wrap justify-center items-center gap-3">
                  <a
                    v-for="s in conf.sponsors.community"
                    :key="s.name"
                    :href="s.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                    style="border: 1px solid var(--card-border); color: var(--card-text-muted);"
                    onmouseover="this.style.borderColor='rgba(8,145,178,0.45)'; this.style.color='var(--color-primary-soft)'; this.style.background='rgba(8,145,178,0.07)'"
                    onmouseout="this.style.borderColor='var(--card-border)'; this.style.color='var(--card-text-muted)'; this.style.background='transparent'"
                  >{{ s.name }}</a>
                </div>
              </div>
            </template>

            <!-- Become a sponsor CTA -->
            <p class="text-center text-sm mt-8" style="color: var(--card-text-muted);">
              Want to support India's C++ community?
              <RouterLink
                to="/contact"
                class="underline ml-1 transition-colors duration-150"
                style="color: var(--color-secondary-mid);"
                onmouseover="this.style.color='var(--color-primary-soft)'"
                onmouseout="this.style.color='var(--color-secondary-mid)'"
              >Become a sponsor</RouterLink>
            </p>
          </div>

          <!-- Watch CTA -->
          <div class="flex flex-col items-center gap-4 p-6 sm:p-10 bg-surface-alt border border-wire-light rounded-2xl text-center">
            <p class="text-sm text-ink-3">All sessions recorded and available on YouTube</p>
            <a
              :href="conf.videosUrl"
              class="btn btn--primary flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              Watch {{ conf.name }} Sessions
            </a>
          </div>

        </template>

        <div v-else class="text-center py-16 text-ink-3">
          No conference data found for {{ activeYear }}.
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@/composables/useHead'
import { useAssetPath } from '@/composables/useAssetPath'
import PageHero from '@/components/common/PageHero.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import { fetchConferenceByYear } from '@/services/api/conferences'
import speakersData from '@/data/speakers.json'

const { assetPath } = useAssetPath()

useHead({
  title: "CppIndiaCon | India's Annual C++ Conference",
  description: "CppIndiaCon is India's premier annual C++ conference featuring international speakers, talks, workshops, and networking.",
})

const route           = useRoute()
const router          = useRouter()
const years           = [2024, 2023, 2022, 2021]
const latestYear      = 2024
const activeYear      = ref(Number(route.query.year) || 2024)
const conf            = ref(null)
const loading         = ref(true)
const scheduleQuery   = ref('')
const selectedSpeaker = ref(null)

function speakerSlug(confSpeaker) {
  if (!confSpeaker) return null
  const entry = speakersData.find(s =>
    s.name.toLowerCase() === confSpeaker.name.toLowerCase() &&
    s.conference === activeYear.value
  ) ?? speakersData.find(s => s.name.toLowerCase() === confSpeaker.name.toLowerCase())
  if (!entry) return null
  return entry.id.replace(/-\d{4}$/, '')
}

function fullSpeaker(confSpeaker) {
  if (!confSpeaker) return null
  return speakersData.find(s =>
    s.name.toLowerCase() === confSpeaker.name.toLowerCase() &&
    s.conference === activeYear.value
  ) ?? speakersData.find(s => s.name.toLowerCase() === confSpeaker.name.toLowerCase()) ?? null
}

function openSpeaker(s) {
  selectedSpeaker.value = s
  document.body.style.overflow = 'hidden'
}

function closeSpeaker() {
  selectedSpeaker.value = null
  document.body.style.overflow = ''
}

function onKeydown(e) {
  if (e.key === 'Escape') closeSpeaker()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

function sessionMatchesQuery(session) {
  const q = scheduleQuery.value.trim().toLowerCase()
  if (!q) return true
  return (
    session.title?.toLowerCase().includes(q) ||
    session.speaker?.toLowerCase().includes(q) ||
    session.abstract?.toLowerCase().includes(q)
  )
}

const filteredSchedule = computed(() => {
  if (!conf.value?.schedule) return []
  if (!scheduleQuery.value.trim()) return conf.value.schedule
  return conf.value.schedule.map(day => ({
    ...day,
    sessions: day.sessions.filter(s => sessionMatchesQuery(s)),
  })).filter(day => day.sessions.length > 0)
})

const filteredSessionCount = computed(() =>
  filteredSchedule.value.reduce((n, day) => n + day.sessions.filter(s =>
    ['talk', 'keynote', 'special', 'lightning'].includes(s.type)
  ).length, 0)
)

const filteredSpeakers = computed(() => {
  if (!conf.value?.speakers) return []
  const q = scheduleQuery.value.trim().toLowerCase()
  if (!q) return conf.value.speakers
  return conf.value.speakers.filter(s =>
    s.name?.toLowerCase().includes(q) ||
    s.topic?.toLowerCase().includes(q) ||
    s.role?.toLowerCase().includes(q)
  )
})

const sessionVideos = computed(() => {
  if (!conf.value?.schedule) return []
  return conf.value.schedule
    .flatMap(day => day.sessions)
    .filter(s => s.videoUrl && ytId(s.videoUrl))
})

const filteredVideos = computed(() => {
  const q = scheduleQuery.value.trim().toLowerCase()
  if (!q) return sessionVideos.value
  return sessionVideos.value.filter(s =>
    s.title?.toLowerCase().includes(q) ||
    s.speaker?.toLowerCase().includes(q)
  )
})

function ytId(url) {
  if (!url) return null
  let m = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (m) return m[1]
  m = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (m) return m[1]
  return null
}

async function loadConference(year) {
  loading.value = true
  conf.value = await fetchConferenceByYear(year)
  loading.value = false
}

function setYear(yr) {
  activeYear.value = yr
  scheduleQuery.value = ''
  router.replace({ query: { year: yr } })
}

watch(activeYear, loadConference)
watch(() => route.query.year, (yr) => {
  if (yr) activeYear.value = Number(yr)
})
onMounted(() => loadConference(activeYear.value))
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active .relative.bg-surface,
.modal-leave-active .relative.bg-surface {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative.bg-surface,
.modal-leave-to .relative.bg-surface {
  transform: translateY(16px) scale(0.97);
  opacity: 0;
}
</style>
