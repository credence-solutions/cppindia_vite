<template>
  <div>
  <PageHero
    overline="Get Started"
    title="C++ Learning Roadmap"
    subtitle="A curated path from absolute beginner to modern C++ expert. Free resources, clear milestones, community support."
  />

  <section class="section" style="background: var(--emphasis-bg);">
    <div class="container" style="max-width: 900px;">

      <!-- Level selector -->
      <div class="flex flex-wrap gap-2 justify-center mb-12">
        <button v-for="level in levels" :key="level.id"
          @click="activeLevel = level.id"
          class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
          :style="activeLevel === level.id
            ? `background:${level.bg}; color:${level.color}; border:1px solid ${level.border};`
            : 'background:transparent; color:var(--color-text-secondary); border:1px solid var(--color-border);'"
        >{{ level.label }}</button>
      </div>

      <!-- Track -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-6 top-0 bottom-0 w-px hidden sm:block" style="background: linear-gradient(to bottom, rgba(99,102,241,0.5), rgba(99,102,241,0.05));"></div>

        <div class="flex flex-col gap-6">
          <div
            v-for="(step, idx) in activeSteps"
            :key="step.title"
            class="relative flex gap-5 sm:gap-8"
          >
            <!-- Step number -->
            <div class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm z-10"
              :style="`background: ${activeColor.bg}; color: ${activeColor.color}; border: 2px solid ${activeColor.border};`">
              {{ idx + 1 }}
            </div>

            <!-- Card -->
            <div class="flex-1 rounded-2xl p-5 transition-all duration-200 mb-2"
              style="background: var(--card-bg); border: 1px solid var(--card-border);"
              onmouseover="this.style.borderColor='rgba(99,102,241,0.38)'; this.style.transform='translateX(4px)'"
              onmouseout="this.style.borderColor='rgba(99,102,241,0.18)'; this.style.transform='translateX(0)'"
            >
              <div class="flex items-start justify-between gap-3 mb-2 flex-wrap">
                <h3 class="font-display font-bold text-base" style="color:var(--color-text);">{{ step.title }}</h3>
                <span class="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                  :style="`background:${activeColor.bg}; color:${activeColor.color}; border:1px solid ${activeColor.border};`">
                  {{ step.timeframe }}
                </span>
              </div>
              <p class="text-sm mb-3" style="color:var(--color-text-secondary);">{{ step.description }}</p>
              <div class="flex flex-wrap gap-2">
                <a v-for="res in step.resources" :key="res.name"
                  :href="res.url" target="_blank" rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md transition-all duration-150"
                  style="background:rgba(99,102,241,0.1); color:#818CF8; border:1px solid rgba(99,102,241,0.2);"
                  onmouseover="this.style.background='rgba(99,102,241,0.2)'"
                  onmouseout="this.style.background='rgba(99,102,241,0.1)'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  {{ res.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Community CTA -->
      <div class="mt-14 text-center rounded-2xl p-8" style="background: var(--card-bg); border: 1px solid var(--card-border);">
        <p class="font-semibold mb-1" style="color:var(--color-text);">Stuck anywhere on the roadmap?</p>
        <p class="text-sm mb-5" style="color:var(--color-text-secondary);">Ask in our Discord — the community is here to help, from absolute beginners to experts.</p>
        <a href="https://discord.gg/Wz42tX5" target="_blank" rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
          style="background:#5865F2;">Get Help on Discord</a>
      </div>

    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHero from '@/components/common/PageHero.vue'

const levels = [
  { id: 'beginner',     label: '🌱 Beginner',     bg: 'rgba(52,211,153,0.15)', color: '#34D399', border: 'rgba(52,211,153,0.4)' },
  { id: 'intermediate', label: '⚡ Intermediate',  bg: 'rgba(34,211,238,0.12)', color: '#22D3EE', border: 'rgba(34,211,238,0.4)' },
  { id: 'advanced',     label: '🚀 Advanced',      bg: 'rgba(99,102,241,0.2)',  color: '#818CF8', border: 'rgba(99,102,241,0.45)' },
]

const activeLevel = ref('beginner')
const activeColor = computed(() => levels.find(l => l.id === activeLevel.value))

const roadmap = {
  beginner: [
    {
      title: 'Set Up Your Toolchain',
      timeframe: 'Week 1',
      description: 'Install a modern C++ compiler (GCC/Clang) and IDE. Get a Hello World compiling. Learn what compilation means.',
      resources: [
        { name: 'Compiler Explorer (Godbolt)', url: 'https://godbolt.org' },
        { name: 'CLion IDE', url: 'https://www.jetbrains.com/clion/' },
        { name: 'VS Code + clangd', url: 'https://clangd.llvm.org/installation' },
      ],
    },
    {
      title: 'C++ Fundamentals',
      timeframe: 'Months 1–2',
      description: 'Variables, types, control flow, functions, arrays, and strings. Avoid learning C-style pointers first — start with modern idioms.',
      resources: [
        { name: 'A Tour of C++ (Stroustrup)', url: 'https://www.stroustrup.com/tour3.html' },
        { name: 'learncpp.com', url: 'https://www.learncpp.com' },
        { name: 'CppIndia YouTube', url: 'https://www.youtube.com/channel/UCwB-WjSJI2D97YZcACFxJDw' },
      ],
    },
    {
      title: 'Classes & Object-Oriented Design',
      timeframe: 'Months 2–3',
      description: 'Constructors, destructors, inheritance, polymorphism, and the Rule of Three/Five/Zero.',
      resources: [
        { name: 'CppCoreGuidelines', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines' },
        { name: 'learncpp.com OOP', url: 'https://www.learncpp.com/cpp-tutorial/welcome-to-object-oriented-programming/' },
      ],
    },
    {
      title: 'Memory Management & RAII',
      timeframe: 'Month 3',
      description: 'Stack vs heap, raw pointers, smart pointers (unique_ptr, shared_ptr). Learn RAII as the foundation of safe C++.',
      resources: [
        { name: 'Herb Sutter: Back to Basics — RAII', url: 'https://www.youtube.com/watch?v=Uxl6UHxGlJQ' },
        { name: 'cppreference: Smart pointers', url: 'https://en.cppreference.com/w/cpp/memory' },
      ],
    },
    {
      title: 'STL Containers & Algorithms',
      timeframe: 'Months 3–4',
      description: 'vector, map, set, string. Iterators. Standard algorithms: sort, find, transform, accumulate.',
      resources: [
        { name: 'cppreference: Containers', url: 'https://en.cppreference.com/w/cpp/container' },
        { name: 'Jonathan Boccara: 105 algorithms', url: 'https://www.youtube.com/watch?v=2olsGf6JIkU' },
      ],
    },
  ],
  intermediate: [
    {
      title: 'Templates & Generic Programming',
      timeframe: 'Month 1',
      description: 'Function templates, class templates, template specialization. Understand why templates exist and when to use them.',
      resources: [
        { name: 'CppCon: Back to Basics — Templates', url: 'https://www.youtube.com/watch?v=LMP_sxOaz6g' },
        { name: 'cppreference: Templates', url: 'https://en.cppreference.com/w/cpp/language/templates' },
      ],
    },
    {
      title: 'Modern C++17 Features',
      timeframe: 'Month 1–2',
      description: 'Structured bindings, if constexpr, std::optional, std::variant, std::filesystem, fold expressions.',
      resources: [
        { name: 'Bartłomiej Filipek: C++17', url: 'https://www.cppstories.com/p/cppbook/' },
        { name: 'CppIndia Playground', url: '/playground' },
      ],
    },
    {
      title: 'C++20 Core Features',
      timeframe: 'Month 2–3',
      description: 'Concepts, Ranges, Coroutines, Modules (basic), designated initializers, three-way comparison.',
      resources: [
        { name: 'A Tour of C++ (3rd ed)', url: 'https://www.stroustrup.com/tour3.html' },
        { name: 'Rainer Grimm: C++20', url: 'https://www.modernescpp.com/index.php/category/c-20' },
        { name: 'CppIndia Talks: C++20', url: '/tech-talks' },
      ],
    },
    {
      title: 'Concurrency & Threading',
      timeframe: 'Month 3–4',
      description: 'std::thread, mutex, condition_variable, atomic. Understand data races, deadlocks, and the memory model.',
      resources: [
        { name: 'C++ Concurrency in Action (Williams)', url: 'https://www.manning.com/books/c-plus-plus-concurrency-in-action' },
        { name: 'CppCon: Concurrency talks', url: 'https://www.youtube.com/user/CppCon' },
      ],
    },
    {
      title: 'Build Systems & Tooling',
      timeframe: 'Ongoing',
      description: 'Modern CMake (target-based), vcpkg or Conan for packages, clang-tidy for static analysis, sanitizers.',
      resources: [
        { name: 'Modern CMake', url: 'https://cliutils.gitlab.io/modern-cmake/' },
        { name: 'vcpkg', url: 'https://vcpkg.io' },
        { name: 'clang-tidy', url: 'https://clang.llvm.org/extra/clang-tidy/' },
      ],
    },
  ],
  advanced: [
    {
      title: 'Template Metaprogramming & Concepts',
      timeframe: 'Month 1–2',
      description: 'SFINAE, tag dispatch, type traits, variadic templates, CRTP. Then replace most of this with C++20 Concepts.',
      resources: [
        { name: 'C++ Templates: The Complete Guide', url: 'https://www.amazon.com/C-Templates-Complete-Guide-2nd/dp/0321714121' },
        { name: 'Arthur O\'Dwyer: Concepts', url: 'https://www.youtube.com/watch?v=UpeV2uJ7oyM' },
      ],
    },
    {
      title: 'Performance Engineering',
      timeframe: 'Month 2–3',
      description: 'CPU cache hierarchy, branch prediction, SIMD, memory layout optimizations, profiling with perf/VTune.',
      resources: [
        { name: 'Chandler Carruth: Performance Matters', url: 'https://www.youtube.com/watch?v=fHNmRkzxHWs' },
        { name: 'Agner Fog: Optimization', url: 'https://www.agner.org/optimize/' },
        { name: 'CppIndia: SIMD Talk', url: '/tech-talks' },
      ],
    },
    {
      title: 'C++23 & C++26 Preview',
      timeframe: 'Ongoing',
      description: 'std::expected, deducing this, std::mdspan, C++26 static reflection, contracts, and safety profiles.',
      resources: [
        { name: 'CppReference: C++23', url: 'https://en.cppreference.com/w/cpp/23' },
        { name: 'WG21 Papers', url: 'https://www.open-std.org/jtc1/sc22/wg21/docs/papers/' },
        { name: 'CppIndia Blog', url: '/blog' },
      ],
    },
    {
      title: 'Contribute to Open Source',
      timeframe: 'Ongoing',
      description: 'Contribute to LLVM/Clang, Boost, range-v3, or C++ standardization. File bugs, write proposals, speak at conferences.',
      resources: [
        { name: 'LLVM Contributing', url: 'https://llvm.org/docs/Contributing.html' },
        { name: 'Boost Libraries', url: 'https://www.boost.org' },
        { name: 'Submit CppIndia Talk', url: '/call-for-speakers' },
      ],
    },
    {
      title: 'Teach & Share',
      timeframe: 'Ongoing',
      description: 'Write articles, speak at meetups, mentor juniors. Teaching deepens understanding and grows the community.',
      resources: [
        { name: 'CppIndia Call for Speakers', url: '/call-for-speakers' },
        { name: 'CppIndia Blog', url: '/blog' },
        { name: 'CFP Tracker', url: '/cfp' },
      ],
    },
  ],
}

const activeSteps = computed(() => roadmap[activeLevel.value] || [])
</script>
