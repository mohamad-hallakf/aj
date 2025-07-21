# Vue 3 Translation Setup Documentation

## Overview
This project has been configured with Vue I18n for internationalization support with Arabic (ar) and English (en) locales.

## Installation
Vue I18n version 9 has been installed and configured for Vue 3 compatibility.

## File Structure
```
src/
├── i18n/
│   ├── index.js                 # I18n configuration
│   └── locales/
│       ├── en.json             # English translations
│       └── ar.json             # Arabic translations
├── components/
│   └── LanguageSwitcher.vue    # Language switcher component
└── assets/css/
    └── rtl.css                 # RTL styles for Arabic
```

## Configuration Files

### 1. I18n Configuration (`src/i18n/index.js`)
- Sets up Vue I18n with English as default locale
- Imports translation files for both languages
- Configures fallback locale

### 2. Translation Files
- **English**: `src/i18n/locales/en.json`
- **Arabic**: `src/i18n/locales/ar.json`

Both files contain translations organized by sections:
- `nav`: Navigation items
- `home`: Home page content
- `products`: Products page content
- `cart`: Shopping cart content
- `checkout`: Checkout form content
- `footer`: Footer content
- `quickActions`: Quick action buttons
- `common`: Common elements (social media names, etc.)

### 3. Language Switcher Component
- Located at `src/components/LanguageSwitcher.vue`
- Provides dropdown to switch between English and Arabic
- Automatically handles RTL/LTR direction changes
- Saves language preference in localStorage

## Updated Components

The following components have been updated to use translations:

1. **Header.vue** - Navigation menu and language switcher
2. **Home.vue** - All text content on home page
3. **Products.vue** - Search, filters, and pagination
4. **Footer.vue** - All footer links and headings
5. **Cart.vue** - Cart interface text
6. **CheckoutForm.vue** - Form labels and buttons
7. **QuickAction.vue** - Quick action button text

## RTL Support

### CSS Styles
- RTL-specific styles in `src/assets/css/rtl.css`
- Automatic direction switching based on selected language
- Proper alignment for Arabic text

### Features
- Text alignment (right for Arabic, left for English)
- Navigation menu direction adjustment
- Button and form element positioning
- Proper flex-direction handling for RTL layout

## Usage

### In Templates
Use the `$t()` function to access translations:
```vue
<template>
  <h1>{{ $t('home.title') }}</h1>
  <p>{{ $t('home.description') }}</p>
</template>
```

### In Script Setup
Import and use the `useI18n` composable:
```vue
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Use t() function for translations
const title = t('home.title')
</script>
```

## Language Switching
The language switcher automatically:
1. Changes the current locale
2. Updates document direction (RTL/LTR)
3. Sets document language attribute
4. Saves preference to localStorage
5. Loads saved preference on page refresh

## Adding New Translations

### 1. Add to Translation Files
Add new keys to both `en.json` and `ar.json`:

```json
// en.json
{
  "newSection": {
    "newKey": "English text"
  }
}

// ar.json
{
  "newSection": {
    "newKey": "النص العربي"
  }
}
```

### 2. Use in Components
```vue
<template>
  <div>{{ $t('newSection.newKey') }}</div>
</template>
```

## Browser Support
- Modern browsers with ES6+ support
- Automatic fallback to English for missing translations
- Graceful handling of missing translation keys

## Performance
- Translations are loaded at build time
- No runtime translation loading
- Minimal bundle size impact
- Efficient locale switching

## Maintenance
- Keep translation files synchronized
- Test both languages thoroughly
- Ensure RTL layout works correctly
- Validate all text fits in UI elements for both languages