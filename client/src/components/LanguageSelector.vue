<script setup>
    import { useI18n } from 'vue-i18n';
    import { onMounted } from 'vue';

    const { locale, t } = useI18n();
    const currentLocale = locale;

    const switchLanguage = (lang) => {
        locale.value = lang;
        localStorage.setItem('selectedLanguage', lang);
    };

    onMounted(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            locale.value = savedLanguage;
        }
    });
</script>


<template>
    <div class="flex items-center justify-center">
        <button
            @click="switchLanguage('tr')"
            :class="{ 'hidden': currentLocale !== 'en' }"
            class="w-12 text-lg font-semibold text-white cursor-pointer rounded-xl border-2 border-white flex justify-center items-center text-center"
        >TR</button>
        <button
            @click="switchLanguage('en')"
            :class="{ 'hidden': currentLocale !== 'tr' }"
            class="w-12 text-lg font-semibold text-white cursor-pointer rounded-xl border-2 border-white flex justify-center items-center text-center"
        >EN</button>
    </div>
</template>