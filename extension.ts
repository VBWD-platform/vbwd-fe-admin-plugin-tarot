/**
 * Tarot Admin Extension
 *
 * Registers the Tarot admin UI extensions (components, etc.)
 * These are UI elements specific to the admin app.
 */

import type { Component } from 'vue';
import UserTarotSection from './components/UserTarotSection.vue';

export interface AdminExtension {
  userDetailsSections?: Component[];
}

export const tarotAdminExtension: AdminExtension = {
  userDetailsSections: [UserTarotSection],
};

export default tarotAdminExtension;
