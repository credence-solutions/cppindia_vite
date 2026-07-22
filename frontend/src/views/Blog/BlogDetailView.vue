<template>
  <div>
  <div v-if="post">
    <PageHero
      :overline="post.tags[0]"
      :title="post.title"
      :subtitle="`By ${post.author} · ${formatDate(post.date)} · ${post.readingTime} min read`"
      :breadcrumb="[{ label: 'Blog', path: '/blog' }, { label: post.title }]"
    />

    <section class="section--sm" style="background: var(--emphasis-bg);">
      <div class="container" style="max-width: 760px;">

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-8">
          <span v-for="tag in post.tags" :key="tag"
            class="text-xs font-semibold px-3 py-1 rounded-full"
            style="background:rgba(8,145,178,0.12); color:var(--color-primary-soft); border:1px solid rgba(8,145,178,0.25);">
            {{ tag }}
          </span>
        </div>

        <!-- Body -->
        <article class="prose-cpp" v-html="renderedBody"></article>

        <!-- Footer: author card -->
        <div class="mt-12 pt-6" style="border-top:1px solid rgba(8,145,178,0.18);">
          <div class="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style="background:rgba(8,145,178,0.2); color:var(--color-primary-soft);">
                {{ post.author.split(' ').map(n => n[0]).join('') }}
              </div>
              <div>
                <p class="text-sm font-semibold mb-0.5" style="color:var(--color-text);">{{ post.author }}</p>
                <p class="text-xs leading-relaxed" style="color:var(--color-text-muted);">{{ authorBio || 'CppIndia Community contributor.' }}</p>
              </div>
            </div>
            <RouterLink to="/blog"
              class="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150 flex-shrink-0"
              style="color:var(--color-primary-soft);">
              ← Back to Blog
            </RouterLink>
          </div>

          <!-- Related posts -->
          <div v-if="relatedPosts.length">
            <p class="text-xs font-bold uppercase tracking-[0.1em] mb-4" style="color:var(--color-text-muted);">Related Articles</p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <RouterLink
                v-for="rp in relatedPosts"
                :key="rp.slug"
                :to="`/blog/${rp.slug}`"
                class="flex flex-col gap-2 p-4 rounded-xl transition-all duration-150"
                style="background:var(--card-bg); border:1px solid var(--card-border);"
                onmouseover="this.style.borderColor='rgba(8,145,178,0.4)'; this.style.transform='translateY(-2px)'"
                onmouseout="this.style.borderColor='var(--card-border)'; this.style.transform='translateY(0)'"
              >
                <div class="flex flex-wrap gap-1">
                  <span v-for="tag in rp.tags.slice(0,2)" :key="tag"
                    class="text-[10px] font-semibold px-2 py-[1px] rounded-full"
                    style="background:rgba(8,145,178,0.1); color:var(--color-primary-soft); border:1px solid rgba(8,145,178,0.2);">{{ tag }}</span>
                </div>
                <p class="text-sm font-semibold leading-snug" style="color:var(--color-text);">{{ rp.title }}</p>
                <p class="text-xs" style="color:var(--color-text-muted);">{{ rp.author }} · {{ rp.readingTime }} min</p>
              </RouterLink>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>

  <!-- 404 -->
  <div v-else class="section text-center" style="background: var(--emphasis-bg);">
    <div class="container">
      <p class="text-lg font-semibold mb-4" style="color:var(--color-text);">Post not found.</p>
      <RouterLink to="/blog" class="text-sm font-semibold" style="color:var(--color-primary-soft);">← Back to Blog</RouterLink>
    </div>
  </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@/components/common/PageHero.vue'
import blogData from '@/data/blog.json'
import membersData from '@/data/members.json'

const route = useRoute()
const post  = computed(() => blogData.find(p => p.slug === route.params.slug))

const authorBio = computed(() => {
  if (!post.value) return null
  const name = post.value.author.toLowerCase()
  const member = membersData.find(m => m.name.toLowerCase() === name)
  return member?.bio ?? null
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  const tags = new Set(post.value.tags)
  return blogData
    .filter(p => p.slug !== post.value.slug)
    .map(p => ({ ...p, overlap: p.tags.filter(t => tags.has(t)).length }))
    .filter(p => p.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3)
})

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Lightweight markdown → HTML renderer (no external dependency)
function renderMarkdown(md) {
  return md
    // Headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Inline code
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    // Code blocks
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Tables (simple)
    .replace(/^\|(.+)\|$/gm, (_, row) => {
      const cells = row.split('|').map(c => c.trim())
      return '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>'
    })
    .replace(/(<tr>.*<\/tr>\n?)+/gs, m => {
      const rows = m.trim().split('\n').filter(r => !r.match(/^<tr><td>[-: ]+<\/td>/))
      if (!rows.length) return m
      const [head, ...body] = rows
      const th = head.replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>')
      return `<table><thead>${th}</thead><tbody>${body.join('')}</tbody></table>`
    })
    // Horizontal rule
    .replace(/^---$/gm, '<hr>')
    // Unordered list items
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    // Numbered list items
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Paragraphs (lines not already wrapped)
    .split('\n\n')
    .map(block => {
      block = block.trim()
      if (!block) return ''
      if (/^<[h1-6|ul|ol|li|pre|table|hr|blockquote]/.test(block)) return block
      return `<p>${block.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')
}

const renderedBody = computed(() => post.value ? renderMarkdown(post.value.body) : '')
</script>

<style>
.prose-cpp { color: var(--color-text-secondary); line-height: 1.8; }
.prose-cpp h1, .prose-cpp h2, .prose-cpp h3 {
  color: var(--color-text);
  font-family: var(--font-secondary);
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
.prose-cpp h2 { font-size: 1.35rem; padding-bottom: 0.4rem; border-bottom: 1px solid var(--color-border); }
.prose-cpp h3 { font-size: 1.1rem; color: #2563EB; }
.prose-cpp p  { margin-bottom: 1.25rem; }
.prose-cpp strong { color: var(--color-text); }
.prose-cpp code {
  background: rgba(8,145,178,0.12);
  color: var(--color-secondary-mid);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
.prose-cpp pre {
  background: #0D1117;
  border: 1px solid rgba(8,145,178,0.2);
  border-radius: 12px;
  padding: 1.25rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}
.prose-cpp pre code {
  background: transparent;
  color: #E2E8F5;
  padding: 0;
  font-size: 0.85rem;
  line-height: 1.7;
}
.prose-cpp ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
.prose-cpp li { margin-bottom: 0.4rem; }
.prose-cpp table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.9rem;
}
.prose-cpp th {
  text-align: left;
  padding: 0.6rem 1rem;
  font-weight: 600;
  color: var(--color-primary-soft);
  background: rgba(8,145,178,0.1);
  border-bottom: 1px solid rgba(8,145,178,0.25);
}
.prose-cpp td {
  padding: 0.55rem 1rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}
.prose-cpp hr { border: none; border-top: 1px solid rgba(8,145,178,0.18); margin: 2rem 0; }
.prose-cpp a  { color: var(--color-primary-soft); text-decoration: underline; }
</style>
