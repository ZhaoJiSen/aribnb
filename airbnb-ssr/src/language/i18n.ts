// 创建语言包实例
import { createI18n } from 'vue-i18n';

// 引入自定义语言包
import zh from './zh.ts';
import en from './en.ts';

const i18n = createI18n({
  locale: 'zh', // 默认语言
  legacy: false,
  messages: {
    // 自定义语言包
    zh,
    en,
  },
});

export default i18n;
