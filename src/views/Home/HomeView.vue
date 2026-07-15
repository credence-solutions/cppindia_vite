<template>
  <div class="home">
    <HeroBanner />
    <CommunityAbout />
    <RecentTalks />
    <ConferenceHighlight />
    <SponsorsSection />
    <JoinCta />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { useHead } from '@/composables/useHead'

useHead({
  title: "CppIndia — India's very own C++ Community",
  description:
    "CppIndia is India's C++ user group — a welcoming space for C++ developers to connect, learn, and grow through regular tech talks, the annual CppIndiaCon conference, and shared resources.",
})

import HeroBanner from '@/components/sections/home/HeroBanner.vue'

const CommunityAbout      = defineAsyncComponent(() => import('@/components/sections/home/CommunityAbout.vue'))
const RecentTalks         = defineAsyncComponent(() => import('@/components/sections/home/RecentTalks.vue'))
const ConferenceHighlight = defineAsyncComponent(() => import('@/components/sections/home/ConferenceHighlight.vue'))
const SponsorsSection     = defineAsyncComponent(() => import('@/components/sections/home/SponsorsSection.vue'))
const JoinCta             = defineAsyncComponent(() => import('@/components/sections/home/JoinCta.vue'))
</script>
