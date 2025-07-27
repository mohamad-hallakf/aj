<template>
  <div class="language-switcher"  @click="toggleDropdown">
      <i class="bx bx-world change-lang"  ></i>
    <ul v-if="isDropdownOpen" class="language-dropdown">
      <li @click="changeLanguage('en')">English</li>
      <li @click="changeLanguage('ar')">العربية</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })
const currentLocale = ref(locale.value)
const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const changeLanguage = (lang) => {
  currentLocale.value = lang
  locale.value = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = lang
  localStorage.setItem('preferred-language', lang)
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

.nav__link{
  font-size: 1.25rem;
}
.nav__link i{
  padding-top: 4px;
}
</style>