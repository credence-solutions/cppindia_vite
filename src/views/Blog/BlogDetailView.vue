<template>
  <div v-if="post">
    <PageHero
      :overline="post.tags[0]"
      :title="post.title"
      :subtitle="`By ${post.author} · ${formatDate(post.date)} · ${post.readingTime} min read`"
    />

    <section class="section--sm" style="background: var(--emphasis-bg);">
      <div class="container" style="max-width: 760px;">

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-8">
          <span v-for="tag in post.tags" :key="tag"
            class="text-xs font-semibold px-3 py-1 rounded-full"
            style="background:rgba(99,102,241,0.12); color:#818CF8; border:1px solid rgba(99,102,241,0.25);">
            {{ tag }}
          </span>
        </div>

        <!-- Body -->
        <article class="prose-cpp" v-html="renderedBody"></article>

        <!-- Footer -->
        <div class="mt-12 pt-6 flex items-center justify-between flex-wrap gap-4" style="border-top:1px solid rgba(99,102,241,0.18);">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
              style="background:rgba(99,102,241,0.2); color:#818CF8;">
              {{ post.author.split(' ').map(n => n[0]).join('') }}
            </div>
            <div>
              <p class="text-sm font-semibold" style="color:var(--color-text);">{{ post.author }}</p>
              <p class="text-xs" style="color:var(--color-text-muted);">CppIndia Community</p>
            </div>
          </div>
          <RouterLink to="/blog"
            class="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150"
            style="color:#818CF8;">
            ← Back to Blog
          </RouterLink>
        </div>

      </div>
    </section>
  </div>

  <!-- 404 -->
  <div v-else class="section text-center" style="background: var(--emphasis-bg);">
    <div class="container">
      <p class="text-lg font-semibold mb-4" style="color:var(--color-text);">Post not found.</p>
      <RouterLink to="/blog" class="text-sm font-semibold" style="color:#818CF8;">← Back to Blog</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHero from '@/components/common/PageHero.vue'
import blogData from '@/data/blog.json'

const route = useRoute()
const post  = computed(() => blogData.find(p => p.slug === route.params.slug))

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
.prose-cpp h3 { font-size: 1.1rem; color: #6366F1; }
.prose-cpp p  { margin-bottom: 1.25rem; }
.prose-cpp strong { color: var(--color-text); }
.prose-cpp code {
  background: rgba(99,102,241,0.12);
  color: #22D3EE;
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
.prose-cpp pre {
  background: #0D1117;
  border: 1px solid rgba(99,102,241,0.2);
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
  color: #818CF8;
  background: rgba(99,102,241,0.1);
  border-bottom: 1px solid rgba(99,102,241,0.25);
}
.prose-cpp td {
  padding: 0.55rem 1rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}
.prose-cpp hr { border: none; border-top: 1px solid rgba(99,102,241,0.18); margin: 2rem 0; }
.prose-cpp a  { color: #818CF8; text-decoration: underline; }
</style>
