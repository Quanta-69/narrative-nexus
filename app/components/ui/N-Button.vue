<script setup lang="ts">
import { icons, type IconName } from '~/assets/icons/icons'

const props = defineProps({
    // Content
    text: {
        type: String,
        default: 'Click me'
    },
    icon: {
        type: String as () => IconName | null,
        default: null
    },
    iconPosition: {
        type: String as () => 'left' | 'right',
        default: 'right'
    },
    // Style control
    variant: {
        type: String as () => 'primary' | 'secondary' | 'ghost',
        default: 'primary'
    },
    size: {
        type: String as () => 'sm' | 'md' | 'lg',
        default: 'md'
    },
    customClass: {
        type: String,
        default: ''
    },

    // Behavior
    disabled: {
        type: Boolean,
        default: false
    }
})

const buttonClasses = computed(() => [
    `btn-${props.variant}`,
    `btn-${props.size}`,
    props.customClass,
    { 'opacity-50 cursor-not-allowed': props.disabled }
])
const isHovered = ref(false)
const currentIcon = computed(() => {
    if (!props.icon || !icons[props.icon]) return null
    return icons[props.icon]
})
</script>

<template>
    <button @mouseenter="isHovered = true" @mouseleave="isHovered = false" :class="buttonClasses" :disabled="disabled"
        class="base-btn-styles transition-all">
        <span v-if="currentIcon && iconPosition === 'left'" class="icon-left icon"
            v-html="isHovered ? currentIcon.hover : currentIcon.default" />
        {{ text }}
        <span v-if="currentIcon && iconPosition === 'right'" class="icon-right icon"
            v-html="isHovered ? currentIcon.hover : currentIcon.default" />
    </button>
</template>

<style scoped>
@reference "tailwindcss";

button {
    cursor: pointer;
    gap: 7px;
    transition: all .2s !important;
    @apply flex items-center justify-center
}

.base-btn-styles {
    @apply rounded-xl hover:cursor-pointer shadow-md;
}

/* Variants */
.btn-primary {
    background:var(--30);
    @apply text-[var(--white)] border border-[var(--dark)];
}

.btn-primary:hover {
    background: var(--10);
}

.btn-secondary {
    background: var(--60);
    @apply text-[var(--white)];
}

.btn-secondary:hover {
    @apply bg-[var(--dark)];
}

.btn-ghost {
    background: var(--alpha-background);
    @apply border border-[var(--gray)] hover:bg-[var(--light)] hover:text-[var(--dark)];
}

/* Sizes */
.btn-sm {
    @apply px-4 py-2 text-sm;
}

.btn-md {
    @apply px-6 py-2 text-base;
}

.btn-lg {
    @apply px-8 py-3 text-lg;
}
.icon-left, .icon-right{
    color: white;
}
.icon-left {
    @apply w-4 h-4;
}

.icon-right {
    @apply w-5 h-5;
}
</style>
