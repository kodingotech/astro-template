# React to Astro Migration Prompt

## Objective
Convert a complete React.js website to Astro with zero hydration, minimal JavaScript, and optimal performance while maintaining all functionality and design.

## Project Context
- **Source:** React.js application with React Router, Framer Motion, and modern styling
- **Target:** Pure Astro static site with vanilla JavaScript for interactivity
- **Goal:** Achieve better performance, SEO, and maintainability without losing features

## Migration Requirements

### 1. Setup & Dependencies

**Replace React dependencies with Astro equivalents:**
- `react-router-dom` → Astro file-based routing
- `framer-motion` → CSS animations + `data-motion` attributes
- `lucide-react` → `@lucide/astro`
- React hooks (`useState`, `useEffect`) → Vanilla JS in `<script>` tags

**Install required Astro packages:**
```bash
npm install astro @astrojs/tailwind @tailwindcss/vite lucide-astro
```

### 2. Core Conversion Rules

#### A. Component Migration
**React Component → Astro Component:**
```jsx
// React
import { motion } from "framer-motion";
export default function MyComponent() {
  return <motion.div>...</motion.div>
}

// Astro
---
// Frontmatter for server-side logic
const data = await fetchData();
---
<div data-motion="fade">...</div>
```

#### B. Animation Conversion
**Framer Motion → CSS + data-motion:**
```jsx
// React
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>

// Astro
<div data-motion="slide-up">
```

**Create `src/scripts/reveal.ts` for scroll animations:**
```typescript
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  });

  document.querySelectorAll('[data-motion]').forEach(el => {
    observer.observe(el);
  });
});
```

#### C. Navigation & Links
**React Router → Astro Links:**
```jsx
// React
import { Link } from "react-router-dom";
<Link to="/about">About</Link>

// Astro
<a href="/about">About</a>
```

#### D. State Management
**React State → Vanilla JS:**
```jsx
// React
const [isOpen, setIsOpen] = useState(false);

// Astro
<script>
  let isOpen = false;
  const toggle = () => {
    isOpen = !isOpen;
    updateUI();
  };
</script>
```

#### E. Icons
**lucide-react → @lucide/astro:**
```jsx
// React
import { Menu, X } from "lucide-react";

// Astro
import { Menu, X } from "@lucide/astro";
```

### 3. Layout Migration

**Create `src/layouts/Layout.astro`:**
```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  {description && <meta name="description" content={description}>}
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
</head>
<body>
  <slot />
</body>
</html>
```

**Migrate Navbar with scroll detection:**
```astro
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50">
  <!-- Navigation content -->
</nav>

<script>
  const navbar = document.getElementById('navbar');
  let isScrolled = false;

  function updateNavbar() {
    const scrolled = window.scrollY > 50;
    if (scrolled === isScrolled) return;
    isScrolled = scrolled;

    if (isScrolled) {
      navbar.className = 'fixed top-0 left-0 right-0 z-50 bg-background/80 shadow-sm';
    } else {
      navbar.className = 'fixed top-0 left-0 right-0 z-50 bg-transparent';
    }
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
</script>
```

### 4. Interactive Features

**For filtering, search, tabs, etc - use vanilla JS:**
```astro
<script>
  // Example: Category filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      
      items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
</script>
```

### 5. Styling Migration

**Keep Tailwind CSS configuration:**
- Copy `tailwind.config.js` or `tailwind.config.ts`
- Copy custom styles from `globals.css` or similar
- Ensure gradient utilities and custom classes are preserved

**For Tailwind v4:**
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### 6. Page Migration Checklist

For each React page component:

- [ ] Create `.astro` file in `src/pages/`
- [ ] Convert JSX to Astro syntax
- [ ] Replace all `motion.*` with `data-motion` attributes
- [ ] Convert `<Link>` to `<a href>`
- [ ] Move React hooks logic to `<script>` tags with vanilla JS
- [ ] Replace `lucide-react` imports with `lucide-astro`
- [ ] Test all interactive features
- [ ] Verify scroll animations
- [ ] Check responsive design
- [ ] Validate SEO meta tags

### 7. File Structure

**Standard Astro structure:**
```
src/
├── components/
│   ├── Navbar.astro
│   ├── Footer.astro
│   └── ui/
│       ├── SectionHeader.astro
│       └── FloatingShapes.astro
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── contact.astro
│   └── 404.astro
├── scripts/
│   └── reveal.ts
├── styles/
│   ├── global.css
│   └── animations.css
└── assets/
    └── images/
```

### 8. Testing & Verification

**Run these checks:**
```bash
# Development
npm run dev

# Build test
npm run build

# Preview production build
npm run preview
```

**Verify:**
- [ ] All pages load correctly
- [ ] Navigation works (internal & external links)
- [ ] Scroll animations trigger properly
- [ ] Interactive features (filters, tabs, modals) work
- [ ] Mobile menu toggles correctly
- [ ] Navbar scroll behavior correct
- [ ] Forms work (if any)
- [ ] No console errors
- [ ] Build completes with 0 errors
- [ ] Bundle size is minimal (< 10KB JS ideal)

### 9. Performance Targets

**Achieve these metrics:**
- ✅ Zero React hydration
- ✅ < 10KB total JavaScript
- ✅ 100% static HTML (except interactive features)
- ✅ Fast build times (< 5s for small sites)
- ✅ Lighthouse score 95+

### 10. Common Patterns

#### Modal/Dialog
```astro
<div id="modal" class="fixed inset-0 hidden">
  <!-- Modal content -->
</div>

<script>
  const modal = document.getElementById('modal');
  const openBtn = document.getElementById('open-modal');
  const closeBtn = document.getElementById('close-modal');

  openBtn?.addEventListener('click', () => {
    modal?.classList.remove('hidden');
  });

  closeBtn?.addEventListener('click', () => {
    modal?.classList.add('hidden');
  });
</script>
```

#### Form Handling
```astro
<form id="contact-form">
  <input name="email" type="email" required />
  <button type="submit">Submit</button>
</form>

<script>
  const form = document.getElementById('contact-form');
  
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Handle submission (e.g., API call)
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    });
    
    // Handle response
  });
</script>
```

#### Accordion/Collapse
```astro
<div class="accordion-item">
  <button class="accordion-trigger">Question</button>
  <div class="accordion-content hidden">Answer</div>
</div>

<script>
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      content?.classList.toggle('hidden');
    });
  });
</script>
```

## Example Migration

**React Component:**
```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Welcome</h1>
      <button 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Get Started <ArrowRight />
      </button>
    </motion.section>
  );
}
```

**Astro Component:**
```astro
---
import { ArrowRight } from '@lucide/astro';
---

<section data-motion="fade">
  <h1>Welcome</h1>
  <button id="cta-btn" class="group">
    Get Started 
    <ArrowRight class="group-hover:translate-x-1 transition-transform" />
  </button>
</section>

<script>
  const btn = document.getElementById('cta-btn');
  btn?.addEventListener('mouseenter', () => {
    // Custom hover logic if needed
  });
</script>
```

## Notes

- **Keep it Simple:** Don't over-engineer. Astro shines with static content.
- **JavaScript Sparingly:** Only add client-side JS where absolutely necessary.
- **Performance First:** Always choose CSS over JS when possible.
- **Test Thoroughly:** Verify every interactive feature works in production build.
- **SEO Friendly:** Leverage Astro's static generation for better SEO.

## Success Criteria

Migration is complete when:
1. ✅ All pages rendered correctly
2. ✅ All interactivity works (filters, modals, forms, etc)
3. ✅ Animations smooth and performant
4. ✅ Build succeeds with 0 errors
5. ✅ Bundle size dramatically reduced from React version
6. ✅ No console errors in production
7. ✅ Mobile responsive and tested
8. ✅ SEO meta tags present on all pages

---

**Start with**: Layout components (Navbar, Footer) → Static pages → Interactive features → Testing & optimization
