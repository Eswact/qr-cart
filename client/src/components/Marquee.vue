<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
    duration: {
        type: Number,
        default: 60,
    },
    repeat: {
        type: Number,
        default: 2,
    },
});

const marqueeStyle = ref({});
marqueeStyle.value = { animationDuration: `${props.duration}s` };

const { locale, messages } = useI18n();
const items = computed(() => messages.value[locale.value].marquee);
</script>

<template>
    <div class="w-full overflow-hidden relative dark:bg-second dark:text-fourth bg-fourth text-second shadow-lg">
        <div
            class="flex items-center whitespace-nowrap animate-marquee"
            :style="marqueeStyle"
        >
            <div v-for="(_, i) in props.repeat" :key="i" class="flex items-center text-xl font-semibold">
                <span v-for="(item, index) in items" :key="index">
                    <span class="mx-4">{{ item }}</span>
                    <span class="mx-4"><font-awesome-icon icon="fa-solid fa-circle-dot" /></span>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @keyframes marquee {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-100%);
        }
    }

    .animate-marquee {
        animation: marquee linear infinite;
    }
</style>
