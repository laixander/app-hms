<script setup lang="ts">
import type { DocFile } from '~/types/admin'

const { data: fileTree } = await useFetch<DocFile[]>('/api/documents', { default: () => [] })

const expandedFolders = ref<Set<string>>(new Set())
const selectedFile = ref<DocFile | null>(null)

function toggleFolder(id: string) {
    if (expandedFolders.value.has(id)) {
        expandedFolders.value.delete(id)
    } else {
        expandedFolders.value.add(id)
    }
}

function selectFile(file: DocFile) {
    if (file.type === 'file') {
        selectedFile.value = file
    }
}

const statusConfig: Record<string, { color: string; label: string }> = {
    approved: { color: 'success', label: 'Approved' },
    draft: { color: 'warning', label: 'Draft' },
    pending: { color: 'info', label: 'Pending Review' },
    archived: { color: 'neutral', label: 'Archived' }
}

const fileIcons: Record<string, string> = {
    pdf: 'i-lucide-file-text',
    docx: 'i-lucide-file-type',
    xlsx: 'i-lucide-file-spreadsheet',
    default: 'i-lucide-file'
}

const fileIconColors: Record<string, string> = {
    pdf: 'text-red-400',
    docx: 'text-blue-400',
    xlsx: 'text-emerald-400',
    default: 'text-slate-400'
}

const toast = useToast()

function handleAction(action: string) {
    toast.add({
        title: `${action} — ${selectedFile.value?.name}`,
        description: `Action "${action}" triggered successfully`,
        color: 'success',
        duration: 3000
    })
}
</script>

<template>
    <div class="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-140px)]">
        <!-- File Browser Panel -->
        <div
            class="w-full lg:w-80 shrink-0 bg-slate-900 border border-white/5 rounded-2xl p-5 overflow-y-auto custom-scrollbar">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-white flex items-center gap-2">
                    <UIcon name="i-lucide-folder-tree" class="w-4 h-4 text-blue-400" />
                    Documents
                </h3>
                <span class="text-xs text-slate-500">{{fileTree.reduce((acc, f) => acc + (f.children?.length || 0), 0)
                }} files</span>
            </div>

            <div class="space-y-1">
                <template v-for="folder in fileTree" :key="folder.id">
                    <!-- Folder -->
                    <button
                        class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 transition-colors"
                        @click="toggleFolder(folder.id)">
                        <UIcon
                            :name="expandedFolders.has(folder.id) ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"
                            class="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <UIcon :name="expandedFolders.has(folder.id) ? 'i-lucide-folder-open' : 'i-lucide-folder'"
                            class="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{{ folder.name }}</span>
                        <span class="ml-auto text-xs text-slate-600">{{ folder.children?.length }}</span>
                    </button>

                    <!-- Files -->
                    <Transition name="expand">
                        <div v-if="expandedFolders.has(folder.id)" class="ml-6 space-y-0.5">
                            <button v-for="file in folder.children" :key="file.id"
                                :class="['doc-tree-item w-full text-left text-sm', { selected: selectedFile?.id === file.id }]"
                                @click="selectFile(file)">
                                <UIcon :name="fileIcons[file.extension || 'default'] || fileIcons.default"
                                    :class="['w-4 h-4 shrink-0', fileIconColors[file.extension || 'default'] || fileIconColors.default]" />
                                <span class="flex-1 truncate text-slate-300">{{ file.name }}</span>
                                <UBadge v-if="file.status" :color="statusConfig[file.status]?.color as any"
                                    variant="subtle" size="xs">
                                    {{ statusConfig[file.status]?.label }}
                                </UBadge>
                            </button>
                        </div>
                    </Transition>
                </template>
            </div>
        </div>

        <!-- Detail Panel -->
        <div class="flex-1 bg-slate-900 border border-white/5 rounded-2xl p-6">
            <template v-if="selectedFile">
                <div class="flex items-start justify-between mb-6">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                            <UIcon :name="fileIcons[selectedFile.extension || 'default'] || fileIcons.default"
                                :class="['w-7 h-7', fileIconColors[selectedFile.extension || 'default'] || fileIconColors.default]" />
                        </div>
                        <div>
                            <h2 class="text-lg font-semibold text-white">{{ selectedFile.name }}</h2>
                            <div class="flex items-center gap-2 mt-1">
                                <UBadge v-if="selectedFile.status"
                                    :color="statusConfig[selectedFile.status]?.color as any" variant="subtle" size="sm">
                                    {{ statusConfig[selectedFile.status]?.label }}
                                </UBadge>
                                <span class="text-xs text-slate-500">{{ selectedFile.extension?.toUpperCase() }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Metadata -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="p-4 rounded-xl bg-white/3 border border-white/5">
                        <p class="text-xs text-slate-500 mb-1">File Size</p>
                        <p class="text-sm font-semibold text-white">{{ selectedFile.size }}</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white/3 border border-white/5">
                        <p class="text-xs text-slate-500 mb-1">Author</p>
                        <p class="text-sm font-semibold text-white">{{ selectedFile.author }}</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white/3 border border-white/5">
                        <p class="text-xs text-slate-500 mb-1">Last Modified</p>
                        <p class="text-sm font-semibold text-white">{{ selectedFile.modified }}</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white/3 border border-white/5">
                        <p class="text-xs text-slate-500 mb-1">Format</p>
                        <p class="text-sm font-semibold text-white">{{ selectedFile.extension?.toUpperCase() }} Document
                        </p>
                    </div>
                </div>

                <!-- Preview -->
                <div class="p-8 rounded-xl bg-white/2 border border-white/5 mb-6 text-center">
                    <UIcon name="i-lucide-eye" class="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <p class="text-sm text-slate-500">Document preview</p>
                    <p class="text-xs text-slate-600 mt-1">Preview is available for supported formats</p>
                </div>

                <!-- Actions -->
                <div class="flex flex-wrap gap-3">
                    <button
                        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition-colors"
                        @click="handleAction('Download')">
                        <UIcon name="i-lucide-download" class="w-4 h-4" />
                        Download
                    </button>
                    <button
                        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 transition-colors"
                        @click="handleAction('Archive')">
                        <UIcon name="i-lucide-archive" class="w-4 h-4" />
                        Archive
                    </button>
                    <button v-if="selectedFile.status === 'pending' || selectedFile.status === 'draft'"
                        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
                        @click="handleAction('Approve')">
                        <UIcon name="i-lucide-check-circle" class="w-4 h-4" />
                        Approve
                    </button>
                </div>
            </template>

            <template v-else>
                <div class="flex flex-col items-center justify-center h-full min-h-[400px] text-slate-600">
                    <UIcon name="i-lucide-file-search" class="w-16 h-16 mb-4" />
                    <p class="text-lg font-medium">Select a document</p>
                    <p class="text-sm text-slate-700 mt-1">Choose a file from the tree to view its details</p>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: all 0.2s ease;
    overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
    opacity: 0;
    max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
    opacity: 1;
    max-height: 500px;
}
</style>
