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
        <img
            loading="lazy"
            @click="switchLanguage('tr')"
            :class="{ 'hidden': currentLocale !== 'en' }"
            class="w-[36px] md:w-[40px] cursor-pointer rounded-sm border-[1px] border-main dark:border-white"
            src="/tr-flag.png"
            alt="TR"
        />
        <img
            loading="lazy"
            @click="switchLanguage('en')"
            :class="{ 'hidden': currentLocale !== 'tr' }"
            class="w-[36px] md:w-[40px] cursor-pointer rounded-sm border-[1px] border-main dark:border-white"
            src="/uk-flag.png"
            alt="EN"
        />
    </div>
</template>