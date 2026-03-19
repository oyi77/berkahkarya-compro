# Decisions — compro-improvement

## [2026-03-02] Session Start

### Architecture Decision: MPA over SPA
- **Decision**: Migrate from SPA (hash routing) to Multi-Page Architecture
- **Rationale**: SPA kills SEO; MPA is better for Google indexing and lead gen
- **Impact**: Delete js/app.js, js/transitions.js; create 6 standalone HTML pages

### Form Handling: Netlify Forms
- **Decision**: Use Netlify Forms (data-netlify="true" attribute)
- **Rationale**: Free, zero config, integrates with Netlify hosting
- **Impact**: Add data-netlify="true" to contact form, all inputs need name attributes

### Language: Bilingual via JSON toggle
- **Decision**: JSON translations + JS toggle (NOT separate HTML files per language)
- **Rationale**: Avoids double maintenance, simpler architecture
- **Files**: js/i18n.json (translations), js/i18n.js (toggle logic)

### WhatsApp Position: Bottom-Left
- **Decision**: WhatsApp floating button at bottom-LEFT
- **Rationale**: Tawk.to live chat is already at bottom-right — avoid conflict
- **Number**: 6285732740006

### Service Naming (standardized)
- Service 1: TikTok Content Agency
- Service 2: E-commerce Optimization
- Service 3: FlashRobs Trading Bot
