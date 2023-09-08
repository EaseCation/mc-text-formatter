<template>
    <div class="wrapper">
        <textarea v-model="rawText" @input="formatText" ref="textarea"></textarea>
        <div>
            <FormatButton
                    v-for="(color, format) in colors"
                    v-bind:format="format"
                    v-bind:color="color"
                    v-bind:key="color"
                    @format="insertFormat"
                >
                {{ format }}
            </FormatButton>
            <FormatButton v-bind:format="'§l'" v-bind:color="'#F3F3F3'" v-bind:bold="true" @format="insertFormat">粗§l</FormatButton>
            <FormatButton v-bind:format="'§o'" v-bind:color="'#F3F3F3'" v-bind:italic="true" @format="insertFormat">斜§o</FormatButton>
            <FormatButton v-bind:format="'§r'" v-bind:color="'#F3F3F3'" @format="insertFormat">复原§r</FormatButton>
        </div>
        <div :class="['output', { 'dark-mode': isDarkMode }]" v-html="formattedText"></div>
    </div>
    <div class="wrapper-bottom">
        <label class="small-gray-text">
            <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode">
            暗色背景
        </label>
    </div>
</template>

<script>
import FormatButton from './FormatButton.vue';

export default {
    data() {
        return {
            colors: {
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
            },
            colorsBrace: {
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
            },
            rawText: '',
            formattedText: '',
            isDarkMode: true
        };
    },
    mounted() {
        // 当页面加载时，尝试从localStorage中获取数据
        this.rawText = localStorage.getItem('userRawText') || '';
        this.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;
        if (this.rawText) {
            this.formatText();
        }
    },
    watch: {
        rawText(newText) {
            localStorage.setItem('userRawText', newText);
        },
        isDarkMode(newMode) {
            localStorage.setItem('isDarkMode', JSON.stringify(newMode));
        }
    },
    methods: {
        insertFormat(format) {
            // 获取当前光标位置
            const start = this.$refs.textarea.selectionStart;
            const end = this.$refs.textarea.selectionEnd;

            // 插入格式代码
            this.rawText = this.rawText.substring(0, start) + format + this.rawText.substring(end);

            // 重新设置光标位置
            this.$nextTick(() => {
                this.$refs.textarea.focus();
                this.$refs.textarea.setSelectionRange(start + format.length, start + format.length);
            });
            this.formatText();
        },
        toggleDarkMode() {
            // this.isDarkMode = !this.isDarkMode;
        },
        formatText() {
            let formatted = this.rawText;
            // 首先转换 colorsBrace 中的字符
            for (let braceCode in this.colorsBrace) {
                const replacement = this.colorsBrace[braceCode];
                const regex = new RegExp(braceCode.replace(/([^\w\s])/g, '\\$1'), "g");
                formatted = formatted.replace(regex, replacement);
            }

            // 加粗处理
            const boldRegex = /§l(.*?)(?=(§[0-9a-u]|§r|\n|$))/g;
            formatted = formatted.replace(boldRegex, `<strong>$1</strong>`);

            // 斜体处理
            const italicRegex = /§o(.*?)(?=(§[0-9a-u]|§r|\n|$))/g;
            formatted = formatted.replace(italicRegex, `<em>$1</em>`);

            // 遍历颜色代码
            for (let code in this.colors) {
                const regex = new RegExp(`${code}(.*?)(?=(§[0-9a-u]|\n|$))`, "g");
                formatted = formatted.replace(regex, (match, content) => {
                    return `<span style="color: ${this.colors[code]}">${content}</span>`;
                });
            }

            // 复原未格式化的部分
            const resetRegex = /§r/g;
            formatted = formatted.replace(resetRegex, '');

            // 处理换行
            const newlineRegex = /\n/g;
            formatted = formatted.replace(newlineRegex, '<br>');
            this.formattedText = formatted;
        }

    },
    components: { FormatButton }
};
</script>

<style>

body {
  font-family: 
    -apple-system, BlinkMacSystemFont, /* MacOS & iOS 系统字体 */
    "Segoe UI", /* Windows 系统字体 */
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, /* 中文字体 */
    sans-serif; /* 通用备选字体 */
}

/* 默认样式 */
.wrapper {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}

.wrapper-bottom {
    display: flex;
    justify-content: center;
    padding: 0;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
  box-sizing: border-box;
}

.output {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #eaeaea;
  background-color: white;
}

.output span {
  font-weight: normal;
  font-style: normal;
}

.output.dark-mode {
  background-color: #333;
  color: #fff;
  border-color: #666;
}

button {
  margin-top: 10px;
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
    color: #888;      /* 设置为浅灰色，可以根据需要调整颜色 */
}

/* 暗黑模式 */
@media (prefers-color-scheme: dark) {
  body {
    color: #fff;
    background-color: #222;
  }
  
  .wrapper {
    background-color: #444;
  }

  textarea {
    background-color: #555;
    color: #fff;
    border-color: #666;
  }
}

/* 手机适配 */
@media (max-width: 768px) {
  .wrapper {
    margin: 4px;
  }
}

</style>
