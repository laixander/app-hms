<template>
    <UCard :ui="{ header: 'flex items-center gap-4' }">
        <template #header>
            <UIcon name="i-lucide-list" class="size-4 text-primary" />
            <div class="uppercase text-xs text-muted font-bold tracking-widest">
                Waiting Queue
            </div>
        </template>
        <div class="flex flex-col gap-2">
            <slot />
        </div>
    </UCard>
</template>