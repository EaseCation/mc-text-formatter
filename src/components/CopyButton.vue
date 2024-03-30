<script>
import {ref, watchEffect} from "vue";

    export default {
        props: {
            rawText: {
                type: String,
                required: true
            },
            copyWithN: {
                type: Boolean,
                default: true
            }
        },
        setup(props) {
            const copySuccess = ref(false);
            const onClick = () => {
                let text = props.rawText;
                if (props.copyWithN) {
                    text = props.rawText.replaceAll("\n", "\\n");
                }
                navigator.clipboard.writeText(text)
                    .then(() => {
                        copySuccess.value = true;
                    })
                    .catch(() => {
                        copySuccess.value = false;
                    });
            }

            watchEffect(() => {
                if (copySuccess.value) {
                    setTimeout(() => {
                        copySuccess.value = false;
                    }, 2000);
                }
            });

            return {
                onClick,
                copySuccess
            }
        }
    }
</script>

<template>
    <button class="copy-button" @click="onClick">
        <svg class="copy-icon" v-show="!copySuccess" viewBox="64 64 896 896" focusable="false" data-icon="copy" width="12" height="12" fill="black" aria-hidden="true">
            <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
        <svg class="copy-suc" v-show="copySuccess" viewBox="64 64 896 896" focusable="false" data-icon="check" width="12" height="12" fill="green" aria-hidden="true">
            <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
        </svg>
    </button>
</template>

<style scoped>

.copy-icon {
    fill: #222222;
}

.copy-suc {
    fill: forestgreen;
}

.copy-button {
    padding: 8px 8px 7px 8px;
    background-color: rgba(255, 255, 255, 0.2);
    .copy-icon {
        opacity: 0.4;
    }
}

.copy-button:hover {
    background-color: rgba(220, 220, 220, 0.5);
    .copy-icon {
        opacity: 0.8;
    }
}

.copy-button:active {
    background-color: rgba(220, 220, 220, 0.8);
}

/* 暗黑模式 */
@media (prefers-color-scheme: dark) {

    .copy-icon {
        fill: #ffffff;
    }

    .copy-suc {
        fill: greenyellow;
    }

    .copy-button {
        padding: 8px 8px 7px 8px;
        background-color: rgba(85, 85, 85, 0.2);
        .copy-icon {
            opacity: 0.4;
        }
    }

    .copy-button:hover {
        background-color: rgba(150, 150, 150, 0.5);
        .copy-icon {
            opacity: 0.8;
        }
    }

    .copy-button:active {
        background-color: rgba(150, 150, 150, 0.8);
    }
}

</style>