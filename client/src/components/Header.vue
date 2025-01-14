<script setup>
    import DarkModeToggle from './DarkModeToggle.vue';
    import LanguageSelector from './LanguageSelector.vue';
</script>

<template>
    <header class="h-full flex items-center justify-between text-white">
        <div class="h-full flex items-center gap-4">
            <img src="/no-image.png" class="h-full" alt="Logo">
            <router-link to="/"><h1 class="text-4xl sm:text-2xl font-bold">{{ $t('appName') }}</h1></router-link>
        </div>
        <div class="h-full flex items-center gap-8">
            <LanguageSelector />
            <DarkModeToggle />
        </div>
    </header>
</template>

<style scoped>
</style>