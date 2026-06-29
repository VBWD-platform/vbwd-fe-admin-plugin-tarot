/**
 * Tarot Admin Plugin
 *
 * Admin-side plugin that provides Tarot admin extensions.
 * Completely independent from the user-side Tarot plugin.
 */

import type { IPlugin, IPlatformSDK } from 'vbwd-view-component';
import { extensionRegistry } from '../../vue/src/plugins/extensionRegistry';
import tarotAdminExtension from './extension';
import en from './locales/en.json';
import de from './locales/de.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import ja from './locales/ja.json';
import ru from './locales/ru.json';
import th from './locales/th.json';
import zh from './locales/zh.json';

export const tarotAdminPlugin: IPlugin = {
  name: 'tarot-admin',
  version: '26.6',
  description: 'Admin extension for Tarot',

  install(sdk: IPlatformSDK) {
    // Translations
    sdk.addTranslations('en', { tarot: (en as Record<string, unknown>)['tarot'] });
    sdk.addTranslations('de', { tarot: (de as Record<string, unknown>)['tarot'] });
    sdk.addTranslations('es', { tarot: (es as Record<string, unknown>)['tarot'] });
    sdk.addTranslations('fr', { tarot: (fr as Record<string, unknown>)['tarot'] });
    sdk.addTranslations('ja', { tarot: (ja as Record<string, unknown>)['tarot'] });
    sdk.addTranslations('ru', { tarot: (ru as Record<string, unknown>)['tarot'] });
    sdk.addTranslations('th', { tarot: (th as Record<string, unknown>)['tarot'] });
    sdk.addTranslations('zh', { tarot: (zh as Record<string, unknown>)['tarot'] });

    // Register Tarot admin extensions
    extensionRegistry.register('tarot', tarotAdminExtension);
  },

  activate() {
    extensionRegistry.register('tarot', tarotAdminExtension);
  },

  deactivate() {
    extensionRegistry.unregister('tarot');
  },
};

export default tarotAdminPlugin;
