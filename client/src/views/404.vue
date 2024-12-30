<script setup>
    import { useRouter } from 'vue-router'
    const router = useRouter()

    const handleGoBack = () => {
        router.back()
    }
    const handleGoHome = () => {
        router.push('/')
    }
</script>

<template>
    <section>
        <div class="container flex items-center min-h-screen px-6 py-12 mx-auto">
            <div class="flex flex-col items-center max-w-sm mx-auto text-center">
                <img loading="lazy" src="/404.gif" alt="404 Not Found" />
                <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">{{ $t('404.title') }}</h1>
                <p class="mt-4 text-gray-500 dark:text-gray-400">{{ $t('404.description') }}</p>
                <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                    <button @click="handleGoBack" class="flex items-center justify-center w-1/2 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 bg-second border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-opacity-90 dark:text-gray-200 dark:border-gray-700 shadow-sm">
                        <font-awesome-icon class="pt-[2px]" icon="fa-solid fa-arrow-left-long" />
                        <span>{{ $t('404.goBack') }}</span>
                    </button>
                    <button @click="handleGoHome" class="w-1/2 px-5 py-2 text-sm font-semibold tracking-wide text-white transition-colors duration-200 bg-third rounded-lg shrink-0 sm:w-auto shadow-sm shadow-main-shadow hover:shadow-lg hover:bg-opacity-90 hover:shadow-third-shadow">
                        {{ $t('404.takeMeHome') }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>