<template>
  <div class="language-switcher">
    <select v-model="currentLocale" @change="changeLanguage" class="form-select form-select-sm">
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })
const currentLocale = ref(locale.value)

const changeLanguage = () => {
  locale.value = currentLocale.value
  document.documentElement.dir = currentLocale.value === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = currentLocale.value
  localStorage.setItem('preferred-language', currentLocale.value)
}

onMounted(() => {
  const savedLanguage = localStorage.getItem('preferred-language')
  if (savedLanguage && ['en', 'ar'].includes(savedLanguage)) {
    currentLocale.value = savedLanguage
    locale.value = savedLanguage
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = savedLanguage
  }
})
</script>

<style scoped>
.language-switcher {
  display: inline-block;
}

.form-select {
  min-width: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
}
</style>