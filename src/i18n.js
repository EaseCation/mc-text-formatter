import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        placeholder: {
            input: 'Input your text here, the preview will be shown below',
            output: 'Preview here'
        },
        format: {
            bold: 'BOLD ',
            italic: 'ITALIC ',
            underline: 'UNDERLINE ',
            strikethrough: 'STRIKETHROUGH ',
            reset: 'RESET '
        },
        setting: {
            dark: 'Dark Mode',
            brace: 'Brace Mode',
            extra: 'Additional Chars',
            copyn: 'Copy with \\n'
        }
    },
    'zh-cn': {
        placeholder: {
            input: '输入原始文本，将在下方实时预览',
            output: '将在此处预览'
        },
        format: {
            bold: '粗',
            italic: '斜',
            underline: '下划线',
            strikethrough: '删除线',
            reset: '复原'
        },
        setting: {
            dark: '暗色预览',
            brace: '大括号模式',
            extra: '特殊字符',
            copyn: '复制时转换\\n'
        }
    },
    'zh-tw': {
        placeholder: {
            input: '在此輸入原始文本，預覽將在下方顯示',
            output: '在此處預覽'
        },
        format: {
            bold: '粗體',
            italic: '斜體',
            underline: '下劃線',
            strikethrough: '刪除線',
            reset: '重置'
        },
        setting: {
            dark: '暗色預覽',
            brace: '大括號模式',
            extra: '特殊字元',
            copyn: '複製時轉換\\n'
        }
    },
    'zh-hk': {
        placeholder: {
            input: '在此輸入原始文本，預覽將在下方顯示',
            output: '在此處預覽'
        },
        format: {
            bold: '粗體',
            italic: '斜體',
            underline: '下劃線',
            strikethrough: '刪除線',
            reset: '重置'
        },
        setting: {
            dark: '暗色預覽',
            brace: '大括號模式',
            extra: '特殊字元',
            copyn: '複製時轉換\\n'
        }
    },
    'zh-mo': {
        placeholder: {
            input: '在此輸入原始文本，預覽將在下方顯示',
            output: '在此處預覽'
        },
        format: {
            bold: '粗體',
            italic: '斜體',
            underline: '下劃線',
            strikethrough: '刪除線',
            reset: '重置'
        },
        setting: {
            dark: '暗色預覽',
            brace: '大括號模式',
            extra: '特殊字元',
            copyn: '複製時轉換\\n'
        }
    },
    ja: {
        placeholder: {
            "input": "原文をここに入力してください。下にプレビューされます",
            "output": "プレビューはここに表示されます"
        },
        format: {
            bold: "太字",
            italic: "斜体",
            underline: "下線",
            strikethrough: "取り消し線",
            reset: "元に戻す"
        },
        setting: {
            dark: "ダークモード",
            brace: "ブレースモード",
            extra: "特殊文字",
            copyn: "コピー時に\\nを変換する"
        }
    },
    es: {
        placeholder: {
            input: 'Introduce tu texto aquí, la vista previa se mostrará abajo',
            output: 'Vista previa aquí'
        },
        format: {
            bold: 'NEGRITA ',
            italic: 'CURSIVA ',
            underline: 'SUBRAYADO ',
            strikethrough: 'TACHADO ',
            reset: 'REINICIAR '
        },
        setting: {
            dark: 'Modo oscuro',
            brace: 'Modo de llaves',
            extra: 'Caracteres extra',
            copyn: 'Copiar con \\n'
        }
    },
    pt: {
        placeholder: {
            input: 'Insira o seu texto aqui, a pré-visualização será mostrada abaixo',
            output: 'Pré-visualização aqui'
        },
        format: {
            bold: 'NEGRITO ',
            italic: 'ITÁLICO ',
            underline: 'SUBLINHADO ',
            strikethrough: 'RISCADO ',
            reset: 'RESETAR '
        },
        setting: {
            dark: 'Modo Escuro',
            brace: 'Modo Brace',
            extra: 'Caracteres Extra',
            copyn: 'Copiar com \\n'
        }
    }
}

// 获取系统语言
let systemLanguage = navigator.language || navigator.userLanguage
systemLanguage = systemLanguage.toLowerCase()

console.log('systemLanguage', systemLanguage)
// 如果系统语言不在定义的语言包中，则默认使用英语
if (!Object.keys(messages).includes(systemLanguage)) {
    systemLanguage = 'en'
}

const i18n = createI18n({
    locale: systemLanguage,
    messages
})

export default i18n