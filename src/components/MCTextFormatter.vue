<template>
    <div class="wrapper">
        <div class="input">
            <div class="textarea-container">
                <textarea class="textarea" v-model="rawText" @input="formatText" :placeholder="$t('placeholder.input')" ref="textarea"></textarea>
                <copy-button :raw-text="rawText" :copy-with-n="copyWithN" class="copy-button"></copy-button>
            </div>
            <div class="format-buttons">
                <format-button
                    v-for="(color, format) in colorsFormats"
                    v-bind:format="format"
                    v-bind:color="color"
                    v-bind:key="color"
                    @format="insertFormat"
                >
                    {{ format }}
                </format-button>
                <format-button v-if="!braceMode" v-bind:format="'§l'" v-bind:bold="true" @format="insertFormat">
                    {{ $t('format.bold') }}§l
                </format-button>
                <format-button v-if="!braceMode" v-bind:format="'§o'" v-bind:italic="true" @format="insertFormat">
                    {{ $t('format.italic') }}§o
                </format-button>
                <format-button v-if="!braceMode" v-bind:format="'§n'" v-bind:underline="true" @format="insertFormat">
                    {{ $t('format.underline') }}§n
                </format-button>
                <format-button v-if="!braceMode" v-bind:format="'§m'" v-bind:strikethrough="true" @format="insertFormat">
                    {{ $t('format.strikethrough') }}§m
                </format-button>
                <format-button v-if="!braceMode" v-bind:format="'§r'" @format="insertFormat">
                    {{ $t('format.reset') }}§r
                </format-button>
                <format-button v-if="braceMode" v-bind:format="'{bold}'" v-bind:bold="true" @format="insertFormat">
                    {{ $t('format.bold') }}{bold}
                </format-button>
                <format-button v-if="braceMode" v-bind:format="'{italic}'" v-bind:italic="true" @format="insertFormat">
                    {{ $t('format.italic') }}{italic}
                </format-button>
                <format-button v-if="braceMode" v-bind:format="'{reset}'" @format="insertFormat">
                    {{ $t('format.reset') }}{reset}
                </format-button>
                <div class="format-buttons-extra" v-if="extraMode">
                    <format-button v-for="char in extraChars" v-bind:key="char" v-bind:format="char" @format="insertFormat">
                        {{ char }}
                    </format-button>
                </div>
            </div>
        </div>
        <div :class="['output', { 'dark-mode': isDarkMode }, { 'placeholder': !formattedText }]" v-html="formattedText ? formattedText : $t('placeholder.output')"></div>
    </div>
    <!-- footer -->
    <div class="wrapper-bottom">
        <div class="settings">
            <label class="small-gray-text label-checkbox">
                <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode">
                <span class="label-checkbox-text">{{ $t('setting.dark') }}</span>
            </label>
            <label class="small-gray-text label-checkbox">
                <input type="checkbox" v-model="braceMode">
                <span class="label-checkbox-text">{{ $t('setting.brace') }}</span>
            </label>
            <label class="small-gray-text label-checkbox">
                <input type="checkbox" v-model="extraMode">
                <span class="label-checkbox-text">{{ $t('setting.extra') }}</span>
            </label>
            <label class="small-gray-text label-checkbox">
                <input type="checkbox" v-model="copyWithN">
                <span class="label-checkbox-text">{{ $t('setting.copyn') }}</span>
            </label>
        </div>
        <div class="github-link">
            <a href="https://github.com/EaseCation/mc-text-formatter" target="_blank">
                <svg width="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                </svg>
                EaseCation/mc-text-formatter
            </a>
        </div>
        <div class="bei-an">
            <a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2022033471号-1</a>
        </div>
    </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import FormatButton from './FormatButton.vue';
import CopyButton from "./CopyButton.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

onMounted(() => {
    document.title = t('title');
});

const braceMode = ref(false);
const extraMode = ref(false);
const copyWithN = ref(true);

const colorsFormats = computed(() => {
    if (braceMode.value) {
        return {
            "{black}": "#000000",
            "{dark-blue}": "#0000AA",
            "{dark-green}": "#00AA00",
            "{dark-aqua}": "#00AAAA",
            "{dark-red}": "#AA0000",
            "{dark-purple}": "#AA00AA",
            "{gold}": "#FFAA00",
            "{gray}": "#AAAAAA",
            "{dark-gray}": "#555555",
            "{blue}": "#5555FF",
            "{green}": "#55FF55",
            "{aqua}": "#55FFFF",
            "{red}": "#FF5555",
            "{light-purple}": "#FF55FF",
            "{yellow}": "#FFFF55",
            "{white}": "#FFFFFF"
        };
    } else {
        return {
            "§0": "#000000",
            "§1": "#0000AA",
            "§2": "#00AA00",
            "§3": "#00AAAA",
            "§4": "#AA0000",
            "§5": "#AA00AA",
            "§6": "#FFAA00",
            "§7": "#AAAAAA",
            "§8": "#555555",
            "§9": "#5555FF",
            "§a": "#55FF55",
            "§b": "#55FFFF",
            "§c": "#FF5555",
            "§d": "#FF55FF",
            "§e": "#FFFF55",
            "§f": "#FFFFFF",
            "§g": "#DDD605",
            "§h": "#E3D4D1",
            "§i": "#CECACA",
            "§j": "#443A3B",
            "§m": "#971607",
            "§n": "#B4684D",
            "§p": "#DEB12D",
            "§q": "#11A036",
            "§s": "#2CBAA8",
            "§t": "#21497B",
            "§u": "#9A5CC6"
        };
    }
})

const colors = ref({
    "§0": "#000000",
    "§1": "#0000AA",
    "§2": "#00AA00",
    "§3": "#00AAAA",
    "§4": "#AA0000",
    "§5": "#AA00AA",
    "§6": "#FFAA00",
    "§7": "#AAAAAA",
    "§8": "#555555",
    "§9": "#5555FF",
    "§a": "#55FF55",
    "§b": "#55FFFF",
    "§c": "#FF5555",
    "§d": "#FF55FF",
    "§e": "#FFFF55",
    "§f": "#FFFFFF",
    "§g": "#DDD605",
    "§h": "#E3D4D1",
    "§i": "#CECACA",
    "§j": "#443A3B",
    "§m": "#971607",
    "§n": "#B4684D",
    "§p": "#DEB12D",
    "§q": "#11A036",
    "§s": "#2CBAA8",
    "§t": "#21497B",
    "§u": "#9A5CC6"
});

const colorsBrace = ref({
    "{black}": "§0",
    "{dark-blue}": "§1",
    "{dark-green}": "§2",
    "{dark-aqua}": "§3",
    "{dark-red}": "§4",
    "{dark-purple}": "§5",
    "{gold}": "§6",
    "{gray}": "§7",
    "{dark-gray}": "§8",
    "{blue}": "§9",
    "{green}": "§a",
    "{aqua}": "§b",
    "{red}": "§c",
    "{light-purple}": "§d",
    "{pink}": "§d",
    "{yellow}": "§e",
    "{white}": "§f",
    "{reset}": "§r",
    "{bold}": "§l",
    "{italic}": "§o",
    "{enter}": "\n"
});

const extraChars = ref([
    "༺",
    "༻",
    "❀",
    "༽",
    "༼",
    "༒",
    "■",
    "ꕥ",
    "»",
    "«",
    "୧",
    "૭",
    "✧",
    "◎",
    "★",
    "✡",
    "✩",
    "❅",
    "࿈",
    "ʚ"
])

const rawText = ref(localStorage.getItem('userRawText') || '');
const formattedText = ref('');
const isDarkMode = ref(JSON.parse(localStorage.getItem('isDarkMode')) || true);
const textarea = ref(null);

onMounted(() => {
    if (rawText.value) {
        formatText();
    }
});

watch(rawText, (newText) => {
    localStorage.setItem('userRawText', newText);
});

watch(isDarkMode, (newMode) => {
    localStorage.setItem('isDarkMode', JSON.stringify(newMode));
});

const insertFormat = (format) => {
    const start = textarea.value.selectionStart;
    // const end = textarea.value.selectionEnd;

    rawText.value = rawText.value.substring(0, start) + format + rawText.value.substring(start);

    formatText();
    textarea.value.focus();
    // 延迟设置才能成功
    setTimeout(() => {
        textarea.value.setSelectionRange(start + format.length, start + format.length);
    }, 0);
};

const toggleDarkMode = () => {
    // this.isDarkMode = !this.isDarkMode;
};

const colorCodeSymbol = '§';

const formatText = () => {
    let formatted = rawText.value;
    for (let braceCode in colorsBrace.value) {
        const replacement = colorsBrace.value[braceCode];
        const regex = new RegExp(braceCode.replace(/([^\w\s])/g, '\\$1'), "g");
        formatted = formatted.replace(regex, replacement);
    }

    let state = {
        color: "",
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
    };
    let newState = { ...state };
    let output = "";
    let contentBuffer = "";

    // 应用样式到缓冲内容，并重置缓冲
    const applyStylesAndResetBuffer = () => {
        if (contentBuffer) {
            let spanStart = `<span style="color: ${state.color};`;
            if (state.bold) spanStart += " font-weight: bold;";
            if (state.italic) spanStart += " font-style: italic;";
            if (state.underline) spanStart += " text-decoration: underline;";
            if (state.strikethrough) spanStart += " text-decoration: line-through;";
            spanStart += `">`;
            output += spanStart + contentBuffer + "</span>";
            contentBuffer = ""; // 重置内容缓冲
        }
    };

    for (let i = 0; i < formatted.length; i++) {
        if (formatted[i] === '§') {
            i++; // 跳过 '§'
            switch (formatted[i]) {
                case 'r':
                    newState = { color: "", bold: false, italic: false, underline: false, strikethrough: false };
                    break;
                case 'l':
                    newState.bold = true;
                    break;
                case 'o':
                    newState.italic = true;
                    break;
                case 'n':
                    newState.underline = true;
                    break;
                case 'm':
                    newState.strikethrough = true;
                    break;
                default:
                    newState.color = colors.value[`${colorCodeSymbol}${formatted[i]}`] || newState.color;
                    break;
            }
        } else if (formatted[i] === '\n') {
            applyStylesAndResetBuffer(); // 应用样式并清空缓冲
            output += "<br>";
        } else {
            contentBuffer += formatted[i]; // 加入当前字符到缓冲
        }

        // 检查状态是否改变
        if (JSON.stringify(state) !== JSON.stringify(newState)) {
            applyStylesAndResetBuffer(); // 应用当前样式并重置缓冲
            state = { ...newState }; // 更新当前状态为新状态
        }
    }

    applyStylesAndResetBuffer(); // 确保最后的缓冲内容被应用

    formattedText.value = output;
};

</script>

<style>

body {
    margin: 0;
    background-color: #f9f9f9;
    font-family: -apple-system, BlinkMacSystemFont, /* MacOS & iOS 系统字体 */ "Segoe UI", /* Windows 系统字体 */ "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, /* 中文字体 */ sans-serif; /* 通用备选字体 */
}

/* 默认样式 */
.wrapper {
    display: flex;
    flex-direction: row;
    gap: 24px;
    padding: 16px 32px 32px 32px;
    height: 95vh;
}

.input {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 1;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    transition: background-color 0.3s ease;
}

.textarea-container {
    position: relative;
    flex: 100;
}

.textarea {
    width: 100%;
    /*height: 150px;*/
    height: 100%;
    padding: 16px 20px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    resize: none;
    overflow: scroll;
    box-sizing: border-box;
    font-family: inherit;
}

.copy-button {
    position: absolute;
    right: 12px;
    top: 12px;
    margin: 0;
    width: 32px;
    height: 32px;
}

.format-buttons {
    flex: 0;
    display: flex;
    gap: 8px;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
}

.format-buttons-extra {
    display: flex;
    gap: 8px;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
}

.output {
    flex: 1;
    box-shadow: 0 4px 32px rgba(0, 0, 0, 0.05);
    padding: 32px;
    border-radius: 16px;
    background-color: white;
    font-size: 16px;
    line-height: 1.5;
    word-break: break-all;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    word-wrap: break-word;
    hyphens: auto;
    transition: background-color 0.3s ease;
    overflow: scroll;
    /* 如果客户端装了这个字体则会正确显示 */
    font-family: Minecraft AE, -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
}

.output.dark-mode {
    background-color: rgba(0, 0, 0, 0.82);
    color: #fff;
}

.placeholder {
    color: rgba(0, 0, 0, 0.2) !important;
}

.output.dark-mode.placeholder {
    color: rgba(255, 255, 255, 0.2) !important;
}

button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    background-color: #007BFF;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

.small-gray-text {
    font-size: 0.8rem; /* 调整大小，可以根据需要设置其他值 */
    color: #888; /* 设置为浅灰色，可以根据需要调整颜色 */
}

.label-checkbox {
    display: flex;
    align-items: center;
}

.label-checkbox-text {
    margin-left: 2px;
}

.wrapper-bottom {
    display: flex;
    justify-content: center;
    padding: 0;
    margin-bottom: 24px;
    flex-direction: column;
    align-items: center;
}

.wrapper-bottom .settings {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    gap: 16px;
}

.github-link {
    margin-top: 20px;
    text-align: center;
}

a {
    color: rgba(0, 0, 0, 0.45);
    text-decoration: none;
    font-size: 12px;
    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
}

.github-link a svg {
    fill: rgba(0, 0, 0, 0.45);
    margin-right: 4px;
}

a:hover {
    color: rgba(0, 0, 0, .85)
}

.github-link a:hover svg {
    fill: rgba(0, 0, 0, 0.85);
}

.bei-an {
    margin-top: 16px;
}

/* 手机适配 */
@media (max-width: 1200px) {
    .wrapper {
        flex-direction: column;
        height: auto;
        padding: 24px;
    }

    .input {
        gap: 16px;
    }

    .textarea-container {
        position: relative;
        flex: 100;
    }

    .textarea {
        height: 150px;
        resize: vertical;
        padding: 12px 16px;
    }

    .output {
        padding: 24px;
    }
}

@media (max-width: 800px) {
    .wrapper {
        padding: 12px;
        gap: 16px;
    }
    .format-buttons {
        gap: 6px;
    }
    .format-buttons-extra {
        gap: 6px;
    }
}

/* 暗黑模式 */
@media (prefers-color-scheme: dark) {
    body {
        color: #fff;
        background-color: #000;
    }

    .input {
        background-color: #141414;
    }

    .textarea {
        background-color: transparent;
        color: #fff;
        border-color: rgb(66, 66, 66);
    }

    .output.dark-mode {
        background-color: #141414;
    }

    a {
        color: rgba(255, 255, 255, 0.45);
    }

    .github-link a svg {
        fill: rgba(255, 255, 255, 0.45);
    }

    a:hover {
        color: rgba(255, 255, 255, .85)
    }

    .github-link a:hover svg {
        fill: rgba(255, 255, 255, 0.85);
    }
}

</style>
