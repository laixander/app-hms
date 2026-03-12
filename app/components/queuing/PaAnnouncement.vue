<script setup lang="ts">
const { isVisible, dismiss } = usePaAnnouncement()
const { state } = useQueueState()

const current = computed(() => state.value.currentServing)
</script>

<template>
  <Transition
    enter-active-class="transition-transform ease-out duration-300"
    enter-from-class="-translate-y-full"
    enter-to-class="translate-y-0"
    leave-active-class="transition-transform ease-in duration-200"
    leave-from-class="translate-y-0"
    leave-to-class="-translate-y-full"
  >
    <UAlert v-if="isVisible" variant="subtle" color="primary"
      :ui="{ root: 'relative z-0 rounded-none ring-0 border-b border-primary/20' }" :close="{ color: 'primary' }" @update:open="dismiss">
      <template #description>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-volume-2" class="size-5" />
          <span class="text-sm font-semibold">PA System:</span>
          <span v-if="current" class="text-sm">
            Now calling ticket number <span class="font-bold font-mono">{{ current.number }}</span>. Please proceed to the <span class="font-semibold">{{ current.department }}</span> counter.
          </span>
          <span v-else class="text-sm">
            Please wait for your ticket number to be called.
          </span>
        </div>
      </template>
    </UAlert>
  </Transition>
</template>
