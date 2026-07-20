/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors — reference CSS variables for runtime theme switching
        primary:          'var(--color-primary)',
        'primary-dark':   'var(--color-primary-dark)',
        'primary-light':  'var(--color-primary-light)',
        secondary:        'var(--color-secondary)',
        'secondary-dark': 'var(--color-secondary-dark)',
        accent:           'var(--color-accent)',
        success:          'var(--color-success)',
        warning:          'var(--color-warning)',
        error:            'var(--color-error)',
        // Surfaces
        canvas:           'var(--color-bg)',
        surface:          'var(--color-surface)',
        'surface-alt':    'var(--color-surface-alt)',
        'surface-raised': 'var(--color-surface-raised)',
        pitch:            'var(--color-dark)',
        // Text
        ink:              'var(--color-text)',
        'ink-2':          'var(--color-text-secondary)',
        'ink-3':          'var(--color-text-muted)',
        // Borders
        wire:             'var(--color-border)',
        'wire-light':     'var(--color-border-light)',
        // Soft tones (badges, labels)
        'primary-soft':   'var(--color-primary-soft)',
        'secondary-mid':  'var(--color-secondary-mid)',
      },
      fontFamily: {
        sans:    ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', '"Cascadia Code"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm:   '4px',
        md:   '8px',
        lg:   '12px',
        xl:   '16px',
        '2xl':'24px',
        '3xl':'32px',
        full: '9999px',
      },
      boxShadow: {
        'glow-primary':   '0 0 24px rgba(79, 142, 247, 0.25)',
        'glow-secondary': '0 0 24px rgba(155, 116, 245, 0.25)',
        'glow-accent':    '0 0 24px rgba(45, 212, 191, 0.25)',
        'brand':          '0 8px 32px rgba(79, 142, 247, 0.3)',
        'card':           '0 4px 24px rgba(0,0,0,0.4)',
        'card-lg':        '0 10px 40px rgba(0,0,0,0.5)',
      },
      zIndex: {
        dropdown: '100',
        sticky:   '200',
        overlay:  '300',
        floating: '350',
        modal:    '400',
      },
      height:    { navbar: '68px' },
      minHeight: { navbar: '68px', screen: '100dvh' },
      maxWidth: {
        container: '1280px',
        wide:      '1440px',
        narrow:    '860px',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        navbar: '68px',
      },
      transitionDuration: {
        fast:   '150ms',
        base:   '250ms',
        slow:   '400ms',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%':       { transform: 'scale(1.15)', opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        'fade-line': {
          'from': { opacity: '0.6', transform: 'translateY(-8px)' },
          'to':   { opacity: '0',   transform: 'translateY(8px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'pulse-dot':  'pulse 2s ease-in-out infinite',
        'float':      'float 3s ease-in-out infinite',
        'fade-line':  'fade-line 2s ease-in-out infinite',
        'shimmer':    'shimmer 1.4s linear infinite',
        'spin-slow':  'spin-slow 8s linear infinite',
      },
      backgroundImage: {
        'gradient-hero':    'linear-gradient(135deg, #060B1A 0%, #0D1A35 50%, #061020 100%)',
        'gradient-primary': 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
        'gradient-cta':     'linear-gradient(135deg, #0D1A35 0%, #0A1228 50%, #0C1630 100%)',
        'grid-pattern':     'linear-gradient(rgba(79,142,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.05) 1px, transparent 1px)',
        'gradient-btn':     'var(--gradient-btn)',
        'gradient-heading': 'var(--gradient-heading)',
      },
    },
  },
  plugins: [],
}
