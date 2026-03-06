<script setup lang="ts">
const props = defineProps<{
  show: boolean
  isPrinting: boolean
  ticket: { number: string; department: string; timestamp: number } | null
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useLanguage()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
        @click.self="!isPrinting && emit('close')">
        <div class="w-full max-w-sm">
          <!-- Printing State -->
          <div v-if="isPrinting" class="text-center">
            <div class="mb-6">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-4">
                <UIcon name="i-lucide-printer" class="w-8 h-8 text-blue-400 animate-pulse" />
              </div>
              <p class="text-lg font-semibold text-white">{{ t('ticket.printing') }}</p>
            </div>
            <div class="h-1 bg-white/10 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-shimmer"
                style="width: 100%;" />
            </div>
          </div>

          <!-- Printed Ticket -->
          <div v-else-if="ticket" class="animate-print-slide">
            <div class="ticket-paper p-8 text-center">
              <div class="mb-4">
                <p class="text-xs text-gray-500 font-semibold uppercase tracking-widest">{{ t('hospital.name') }}</p>
              </div>
              <div class="border-t border-dashed border-gray-300 my-4" />
              <p class="text-xs text-gray-400 mb-1">{{ t('queue.your.number') }}</p>
              <p class="text-5xl font-black text-slate-800 my-3">{{ ticket.number }}</p>
              <div class="border-t border-dashed border-gray-300 my-4" />
              <div class="space-y-2 text-sm text-gray-600">
                <div class="flex justify-between">
                  <span>{{ t('queue.department') }}</span>
                  <span class="font-semibold text-gray-800">{{ ticket.department }}</span>
                </div>
                <div class="flex justify-between">
                  <span>{{ t('queue.date') }}</span>
                  <span class="font-semibold text-gray-800">{{ new Date(ticket.timestamp).toLocaleString()
                    }}</span>
                </div>
              </div>
              <div class="border-t border-dashed border-gray-300 my-4" />
              <p class="text-xs text-gray-400 italic">{{ t('ticket.please.wait') }}</p>
            </div>

            <button
              class="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all active:scale-95"
              @click="emit('close')">
              {{ t('ticket.close') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
