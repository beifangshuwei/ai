import { createI18n } from 'vue-i18n';
import { getBrowserLang } from '@/utils';

import zh from './modules/zh';
import en from './modules/en';

// console.log(getBrowserLang());
const i18n = createI18n({
  // Use Composition API, Set to false
  allowComposition: true, //全局生效$t
  globalInjection:true,
  legacy: true,
  locale: getBrowserLang(),
  messages: {
    zh,
    en
  }
});

export default i18n;

