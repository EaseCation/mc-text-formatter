import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        title: "Minecraft Text Formatter",
        placeholder: {
            input: 'Input your text here, the preview will be shown',
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
        },
        html: {
            source: 'HTML Source',
            copyHtml: 'Copy HTML',
            copySuccess: 'HTML copied to clipboard!',
            copyFailed: 'Copy failed, please copy manually'
        }
    },
    'zh-cn': {
        title: "Minecraft 文本格式化工具",
        placeholder: {
            input: '输入原始文本，将实时预览',
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
        },
        html: {
            source: 'HTML 源码',
            copyHtml: '复制 HTML',
            copySuccess: 'HTML 已复制到剪贴板！',
            copyFailed: '复制失败，请手动复制'
        }
    },
    'zh-tw': {
        title: "Minecraft 文本格式化工具",
        placeholder: {
            input: '在此輸入原始文本，預覽將顯示',
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
        },
        html: {
            source: 'HTML 源碼',
            copyHtml: '複製 HTML',
            copySuccess: 'HTML 已複製到剪貼簿！',
            copyFailed: '複製失敗，請手動複製'
        }
    },
    'zh-hk': {
        title: "Minecraft 文本格式化工具",
        placeholder: {
            input: '在此輸入原始文本，預覽將顯示',
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
        },
        html: {
            source: 'HTML 源碼',
            copyHtml: '複製 HTML',
            copySuccess: 'HTML 已複製到剪貼簿！',
            copyFailed: '複製失敗，請手動複製'
        }
    },
    'zh-mo': {
        title: "Minecraft 文本格式化工具",
        placeholder: {
            input: '在此輸入原始文本，預覽將顯示',
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
        },
        html: {
            source: 'HTML 源碼',
            copyHtml: '複製 HTML',
            copySuccess: 'HTML 已複製到剪貼簿！',
            copyFailed: '複製失敗，請手動複製'
        }
    },
    ja: {
        title: "マインクラフト テキストフォーマットツール",
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
        },
        html: {
            source: 'HTML ソース',
            copyHtml: 'HTML をコピー',
            copySuccess: 'HTML をクリップボードにコピーしました！',
            copyFailed: 'コピーに失敗しました。手動でコピーしてください'
        }
    },
    es: {
        title: "Herramienta de Formato de Texto para Minecraft",
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
        },
        html: {
            source: 'Fuente HTML',
            copyHtml: 'Copiar HTML',
            copySuccess: '¡HTML copiado al portapapeles!',
            copyFailed: 'Error al copiar, por favor copie manualmente'
        }
    },
    pt: {
        title: "Ferramenta de Formatação de Texto para Minecraft",
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
        },
        html: {
            source: 'Fonte HTML',
            copyHtml: 'Copiar HTML',
            copySuccess: 'HTML copiado para a área de transferência!',
            copyFailed: 'Falha ao copiar, por favor copie manualmente'
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
    legacy: false,
    locale: systemLanguage,
    messages
})

export default i18n