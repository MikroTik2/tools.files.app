<template>
     <div
          class="bg-foreground/5 rounded-3xl border p-10 flex items-center justify-center"
          @dragover.prevent="handleDragOver"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleDrop"
     >
          <div role="presentation" tabindex="0">
               <input
                    ref="fileInput"
                    accept="video/*"
                    @change="handleFileChange"
                    tabindex="-1"
                    type="file"
                    style="display: none"
               />
               <div class="flex flex-col items-center justify-center gap-5">
                    <ArrowUpFromLine
                         class="w-10 h-10 transition ease-in-out duration-300"
                         :class="{ 'translate-y-3 scale-90': isDragging }"
                    />

                    <div class="flex text-center flex-col items-center justify-center gap-2">
                         <div>{{ props.title }}</div>
                         <div class="text-sm text-muted-foreground max-w-[300px] text-center">
                              {{ props.description }}
                         </div>
                    </div>

                    <Button type="button" @click="fileInput?.click()">Select File</Button>
               </div>
          </div>
     </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArrowUpFromLine } from 'lucide-vue-next';
import { ffmpegService } from '@/services/ffmpeg.service';

interface IPropsCardGragdrop {
     title: string;
     description: string;
     command: string;
}

import Button from '@/components/ui/button.vue';

const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref<boolean>(false);

const props = defineProps<IPropsCardGragdrop>();
const emit = defineEmits(['file-selected', 'file-preview']);

const handleFileChange = (event: Event) => {
     const input = event.target as HTMLInputElement;
     const file = input.files?.[0];

     if (file) {
          processFile(file);
     }
};

const handleDrop = (event: DragEvent) => {
     const file = event.dataTransfer?.files?.[0];
     isDragging.value = false;

     if (file) {
          processFile(file);
     }
};

const handleDragOver = (event: DragEvent) => {
     event.dataTransfer!.dropEffect = 'copy';
     isDragging.value = true;
};

const handleDragLeave = () => {
     isDragging.value = false;
};

const processFile = (file: File) => {
     switch (props.command) {
          case 'getFileDetails':
               ffmpegService.getFileDetails(file);
               break;

          case 'optimizeFileSize':
               ffmpegService.optimizeFileSize(file);
               emit('file-preview', URL.createObjectURL(new Blob([file], { type: 'video/mp4' })));
               break;

          case 'convertToGif':
               ffmpegService.convertToGif(file);
               emit('file-preview', URL.createObjectURL(new Blob([file], { type: 'video/mp4' })));
               break;

          default:
               throw 'Unknown command';
     }

     emit('file-selected', false);
};
</script>
