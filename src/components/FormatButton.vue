<template>
    <button class="format-button" @click="onClick" :style="{ backgroundColor: color, color: textColor }">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        format: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        // 斜体（默认为false）
        italic: {
            type: Boolean,
            default: false
        },
        // 粗体
        bold: {
            type: Boolean,
            default: false
        },
        // 下划线
        underline: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        textColor() {
            const rgb = this.color.slice(1).match(/.{1,2}/g).map(hex => parseInt(hex, 16));
            // 使用权重系数计算亮度
            const brightness = (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) / 255;
            return brightness > 0.5 ? '#000' : '#fff';
        }
    },
    methods: {
        onClick() {
            this.$emit('format', this.format);
        }
    }
}
</script>

<style>

.format-button {
    padding: 4px 8px;
    color: white;
    margin: 6px 6px 0 0;
    font-size: 14px;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1); /* 这里是添加的内描边样式 */
    transition: filter 0.2s;  /* 平滑过渡效果 */
    min-width: 40px;
}

.format-button:hover {
    filter: brightness(1.1);  /* 亮度增加10% */
}

</style>