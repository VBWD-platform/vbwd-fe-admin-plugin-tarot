<template>
  <div
    v-if="tarotLimits"
    class="section user-tarot-section"
  >
    <h3>🔮 {{ $t('tarot.title', 'Tarot Sessions') }}</h3>
    <div class="info-grid">
      <div class="info-item">
        <label>{{ $t('tarot.dailySessions', 'Daily Sessions') }}</label>
        <span>
          <strong>{{ tarotLimits.daily_used }}</strong>
          /
          {{ tarotLimits.daily_total }}
        </span>
      </div>
    </div>
    <div class="tarot-actions">
      <button
        data-testid="reset-tarot-sessions-button"
        class="action-btn secondary"
        :disabled="tarotResetting || mainLoading"
        @click="handleResetTarotSessions"
      >
        <span v-if="!tarotResetting">
          {{ $t('tarot.resetSessions', 'Reset Sessions') }}
        </span>
        <span v-else>
          {{ $t('tarot.resettingSession', 'Resetting...') }}
        </span>
      </button>
    </div>
    <p
      v-if="tarotResetSuccess"
      class="success-message"
      data-testid="tarot-success-message"
    >
      ✅ {{ $t('tarot.resetSuccess', 'Tarot sessions reset successfully') }}
    </p>
    <p
      v-if="tarotResetError"
      class="error-message"
      data-testid="tarot-error-message"
    >
      ❌ {{ tarotResetError }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useUsersStore } from '@/stores/users';
import { api } from '@/api';
import type { UserDetail } from '@/stores/users';

interface Props {
  user: UserDetail | null;
  loading: boolean;
  userId: string;
}

interface TarotLimits {
  daily_total: number;
  daily_remaining: number;
  daily_used: number;
}

const props = defineProps<Props>();
const usersStore = useUsersStore();

const tarotLimits = ref<TarotLimits | null>(null);
const tarotResetting = ref(false);
const tarotResetSuccess = ref(false);
const tarotResetError = ref<string | null>(null);

const mainLoading = computed(() => props.loading);

/**
 * Fetch tarot session limits and usage for this user from the tarot plugin (admin endpoint)
 */
async function fetchTarotLimits(): Promise<void> {
  try {
    const response = await api.get(`/tarot/admin/users/${props.userId}/sessions`) as {
      success: boolean;
      daily_limit: number;
      daily_remaining: number;
      daily_used: number;
      can_create: boolean;
    };

    if (response.success) {
      tarotLimits.value = {
        daily_total: response.daily_limit,
        daily_remaining: response.daily_remaining,
        daily_used: response.daily_used,
      };
    }
  } catch (error) {
    // Silently fail - user might not have tarot plugin or be an admin user
    console.warn('Failed to fetch tarot limits:', error);
    tarotLimits.value = null;
  }
}

/**
 * Handle reset tarot sessions button click
 */
async function handleResetTarotSessions(): Promise<void> {
  tarotResetting.value = true;
  tarotResetSuccess.value = false;
  tarotResetError.value = null;

  try {
    await usersStore.resetTarotSessions(props.userId);
    tarotResetSuccess.value = true;

    // Refresh the tarot limits
    await fetchTarotLimits();

    // Clear success message after 5 seconds
    setTimeout(() => {
      tarotResetSuccess.value = false;
    }, 5000);
  } catch (err) {
    tarotResetError.value = (err as Error).message || 'Failed to reset Tarot sessions';
    // Clear error message after 5 seconds
    setTimeout(() => {
      tarotResetError.value = null;
    }, 5000);
  } finally {
    tarotResetting.value = false;
  }
}

// Fetch tarot limits when component mounts
onMounted(() => {
  fetchTarotLimits();
});
</script>

<style scoped>
.user-tarot-section {
  background: linear-gradient(135deg, #f0e6ff 0%, #f8f9fa 100%);
  border-left: 4px solid #8b5cf6;
  border-radius: 8px;
  padding: 20px;
}

.user-tarot-section h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-item label {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-item span {
  font-size: 0.95rem;
  color: #2c3e50;
  font-weight: 500;
}

.info-item strong {
  color: #8b5cf6;
  font-size: 1.2rem;
}

.tarot-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 10px 20px;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.action-btn.secondary {
  background: #e9d5ff;
  color: #6d28d9;
  border-color: #c4b5fd;
}

.action-btn.secondary:hover:not(:disabled) {
  background: #d8b4fe;
  border-color: #a78bfa;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15);
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  margin-top: 15px;
  padding: 12px 15px;
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #dcfce7;
  border-left: 4px solid #22c55e;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
}

.error-message {
  margin-top: 15px;
  padding: 12px 15px;
  background: #fef2f2;
  color: #7f1d1d;
  border: 1px solid #fee2e2;
  border-left: 4px solid #ef4444;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
}
</style>
