<template>
    <div class="wrapper">
        <textarea v-model="rawText" @input="formatText"></textarea>
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
            rawText: '',
            formattedText: '',
            isDarkMode: true
        };
    },
    mounted() {
        // 当页面加载时，尝试从localStorage中获取数据
        this.rawText = localStorage.getItem('userRawText') || '';
        this.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;

        if(this.rawText) {
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
        toggleDarkMode() {
            // this.isDarkMode = !this.isDarkMode;
        },
        formatText() {
            let formatted = this.rawText;
            
            // 遍历颜色代码
            for (let code in this.colors) {
                const regex = new RegExp(`${code}(.*?)(?=(§[0-9a-u]|\n|$))`, "g");
                formatted = formatted.replace(regex, (match, content) => {
                return `<span style="color: ${this.colors[code]}">${content}</span>`;
                });
            }
            
            // 加粗处理
            const boldRegex = /§l(.*?)(?=(§[0-9a-u]|§r|\n|$))/g;
            formatted = formatted.replace(boldRegex, (match, content) => {
                return `<strong>${content}</strong>`;
            });

            // 斜体处理
            const italicRegex = /§o(.*?)(?=(§[0-9a-u]|§r|\n|$))/g;
            formatted = formatted.replace(italicRegex, (match, content) => {
                return `<em>${content}</em>`;
            });

            // 复原未格式化的部分
            const resetRegex = /§r/g;
            formatted = formatted.replace(resetRegex, '');

            // 处理换行
            const newlineRegex = /\n/g;
            formatted = formatted.replace(newlineRegex, '<br>');

            this.formattedText = formatted;
        }
    }
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
    margin: 20px;
  }
}

</style>
