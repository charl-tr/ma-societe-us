// DNA Extraction Script v2
// One-shot: returns complete visual identity of any website
// Execute via Chrome javascript_tool on target site

(function extractDNA() {

  // ═══════════════════════════════════════════
  // 1. FONTS — exact files + usage
  // ═══════════════════════════════════════════
  const fonts = [];
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule instanceof CSSFontFaceRule) {
          const src = rule.style.src || '';
          const urlMatch = src.match(/url\("([^"]+)"\)/);
          fonts.push({
            family: rule.style.fontFamily?.replace(/"/g, ''),
            url: urlMatch ? new URL(urlMatch[1], sheet.href || location.href).href : null,
            weight: rule.style.fontWeight || 'normal',
            style: rule.style.fontStyle || 'normal',
          });
        }
      }
    } catch(e) {} // cross-origin
  }

  // ═══════════════════════════════════════════
  // 2. CSS VARIABLES — the design tokens
  // ═══════════════════════════════════════════
  const cssVars = {};
  const rootStyles = getComputedStyle(document.documentElement);
  // Try to get custom properties from stylesheets
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText === ':root' || rule.selectorText === ':root, :host') {
          for (const prop of rule.style) {
            if (prop.startsWith('--')) {
              cssVars[prop] = rule.style.getPropertyValue(prop).trim();
            }
          }
        }
      }
    } catch(e) {}
  }

  // ═══════════════════════════════════════════
  // 3. MEDIA — videos, hero images
  // ═══════════════════════════════════════════
  const media = [];
  document.querySelectorAll('video source, video[src], img').forEach(el => {
    const src = el.src || el.getAttribute('src');
    if (src && el.closest('section, [class*="hero"], main')) {
      media.push({ tag: el.tagName, src: src.substring(0, 300), parent: el.parentElement?.tagName });
    }
  });

  // ═══════════════════════════════════════════
  // 4. ALL STYLESHEETS URLs
  // ═══════════════════════════════════════════
  const stylesheetUrls = [...document.styleSheets].map(s => s.href).filter(Boolean);

  // ═══════════════════════════════════════════
  // 5. ELEMENT STYLES — every key element
  // ═══════════════════════════════════════════
  const PROPS = [
    'fontFamily','fontSize','fontWeight','letterSpacing','lineHeight','textTransform',
    'color','backgroundColor','background',
    'boxShadow','backdropFilter','border','borderRadius','opacity',
    'padding','gap','maxWidth'
  ];

  function extract(el) {
    if (!el) return null;
    const s = getComputedStyle(el);
    const r = {};
    PROPS.forEach(p => {
      const v = s[p];
      if (v && v !== 'none' && v !== 'normal' && v !== '0px'
        && v !== 'rgba(0, 0, 0, 0)' && v !== '0px 0px'
        && !v.includes('auto padding-box border-box')) {
        // Clean up background shorthand — just keep the useful part
        if (p === 'background' && v.includes('none repeat scroll')) {
          const color = s.backgroundColor;
          if (color !== 'rgba(0, 0, 0, 0)') r.backgroundColor = color;
          return;
        }
        r[p] = v;
      }
    });
    r._text = el.textContent?.substring(0, 60)?.trim() || '';
    r._tag = el.tagName.toLowerCase();
    return r;
  }

  const elements = {};

  // Body
  elements.body = extract(document.body);

  // Nav + all nav items
  const nav = document.querySelector('nav, header');
  if (nav) {
    elements.nav = extract(nav);
    elements.navItems = [];
    nav.querySelectorAll('a, button').forEach(item => {
      if (item.offsetHeight > 0 && item.textContent.trim().length > 0 && item.textContent.trim().length < 30) {
        const data = extract(item);
        data._hasDropdown = item.querySelector('svg') !== null;
        data._isButton = item.tagName === 'BUTTON';
        elements.navItems.push(data);
      }
    });
  }

  // All headings (h1-h3)
  elements.headings = [];
  document.querySelectorAll('h1, h2, h3').forEach((h, i) => {
    if (i < 10) elements.headings.push(extract(h));
  });

  // All paragraphs in main content
  elements.paragraphs = [];
  document.querySelectorAll('section p, main p, article p').forEach((p, i) => {
    if (i < 6) elements.paragraphs.push(extract(p));
  });

  // All buttons/CTAs
  elements.ctas = [];
  document.querySelectorAll('a, button').forEach(el => {
    const s = getComputedStyle(el);
    if (el.offsetHeight > 30 && el.offsetWidth > 80
      && (s.borderRadius !== '0px' || s.backgroundColor !== 'rgba(0, 0, 0, 0)')
      && el.textContent.trim().length < 40 && el.textContent.trim().length > 2) {
      elements.ctas.push(extract(el));
    }
  });
  elements.ctas = elements.ctas.slice(0, 6);

  // Cards / panels (elements with border-radius + shadow or blur)
  elements.cards = [];
  document.querySelectorAll('div, section, article').forEach(el => {
    const s = getComputedStyle(el);
    if (s.borderRadius !== '0px'
      && (s.boxShadow !== 'none' || s.backdropFilter !== 'none')
      && el.offsetHeight > 60 && el.offsetHeight < 800
      && el.offsetWidth > 100) {
      elements.cards.push(extract(el));
    }
  });
  elements.cards = elements.cards.slice(0, 4);

  // ═══════════════════════════════════════════
  // 6. OVERLAYS & GRADIENTS on hero
  // ═══════════════════════════════════════════
  const overlays = [];
  const heroSection = document.querySelector('section') || document.querySelector('main > div');
  if (heroSection) {
    // Walk all descendants looking for overlay divs
    heroSection.querySelectorAll('div').forEach(div => {
      const bg = getComputedStyle(div).background;
      if (bg && bg.includes('gradient')) {
        overlays.push({ gradient: bg.substring(0, 250) });
      }
    });
  }

  // ═══════════════════════════════════════════
  // 7. PAGE SECTIONS STRUCTURE
  // ═══════════════════════════════════════════
  const sections = [];
  document.querySelectorAll('section').forEach((sec, i) => {
    if (i < 8) {
      sections.push({
        index: i,
        height: sec.offsetHeight,
        bg: getComputedStyle(sec).backgroundColor,
        textPreview: sec.textContent?.substring(0, 100)?.trim(),
      });
    }
  });

  // ═══════════════════════════════════════════
  // ASSEMBLE
  // ═══════════════════════════════════════════
  return JSON.stringify({
    meta: {
      url: location.href,
      title: document.title,
      viewport: { w: innerWidth, h: innerHeight },
    },
    fonts: fonts.filter(f => f.url), // only fonts with actual file URLs
    cssVariables: cssVars,
    stylesheetUrls,
    media: media.slice(0, 5),
    overlays,
    sections,
    elements,
  }, null, 2);

})();
