<script>
    export default {
        props: {
            rawText: {
                type: String,
                required: true
            }
        },
        setup(props) {
            const onClick = () => {
                // 复制文本到剪贴板
                navigator.clipboard.writeText(props.rawText.replaceAll("\n", "\\n"));
            }

            return {
                onClick
            }
        }
    }
</script>

<template>
    <button class="copy-button" @click="onClick">
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="12" height="12" fill="black" aria-hidden="true">
            <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
    </button>
</template>

<style scoped>

.copy-button {
    padding: 8px 8px 7px 8px;
    background-color: rgba(255, 255, 255, 0.1);
    svg {
        opacity: 0.4;
    }
}

.copy-button:hover {
    background-color: rgba(220, 220, 220, 0.5);
    svg {
        opacity: 0.8;
    }
}

.copy-button:active {
    background-color: rgba(220, 220, 220, 0.8);
}

</style>