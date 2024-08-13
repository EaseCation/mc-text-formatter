<template>
    <button class="format-button" @click="onClick" :style="{ backgroundColor: color, color: textColor }">
        <slot></slot>
    </button>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        format: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: "#F3F3F3"
        },
        italic: {
            type: Boolean,
            default: false
        },
        bold: {
            type: Boolean,
            default: false
        },
        underline: {
            type: Boolean,
            default: false
        },
    },
    setup(props, { emit }) {
        const textColor = computed(() => {
            const rgb = props.color.slice(1).match(/.{1,2}/g).map(hex => parseInt(hex, 16));
            const brightness = (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) / 255;
            return brightness > 0.5 ? '#000' : '#fff';
        });

        const onClick = () => {
            emit('format', props.format);
        }

        return {
            textColor,
            onClick
        }
    }
}
</script>

<style>
.format-button {
    padding: 6px 8px;
    color: white;
    border-radius: 8px;
    font-size: 16px;
    line-height: 20px;
    box-shadow: inset 0 0 0 2px rgba(128, 128, 128, 0.1);
    transition: all 0.2s;  
    min-width: 50px;
}

.format-button:hover {
    filter: brightness(1.1);
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.2);
}

.format-button:active {
    filter: brightness(0.95);
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.2);
}

@media (max-width: 800px) {
    .format-button {
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 14px;
        min-width: 40px;
    }
}
</style>
